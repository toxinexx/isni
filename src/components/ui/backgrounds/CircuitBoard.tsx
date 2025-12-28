"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
}

interface Pulse {
  id: number;
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export default function CircuitBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pulseIdRef = useRef(0);
  const animationRef = useRef<number>();

  // Create node lookup map for O(1) access
  const nodeMap = useMemo(() => {
    const map = new Map<number, Node>();
    nodes.forEach(node => map.set(node.id, node));
    return map;
  }, [nodes]);

  const getNodeById = useCallback((id: number) => nodeMap.get(id), [nodeMap]);

  // Generate circuit nodes
  useEffect(() => {
    const generateNodes = () => {
      const newNodes: Node[] = [];
      const gridSize = 150; // Larger grid = fewer nodes
      const cols = Math.ceil(window.innerWidth / gridSize) + 1;
      const rows = Math.ceil(window.innerHeight / gridSize) + 1;

      let id = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize + (Math.random() - 0.5) * 40;
          const y = row * gridSize + (Math.random() - 0.5) * 40;
          newNodes.push({ id: id++, x, y, connections: [] });
        }
      }

      // Create connections (circuit paths) - limit connections
      newNodes.forEach((node) => {
        const possibleConnections = newNodes.filter(
          (n) =>
            n.id !== node.id &&
            Math.abs(n.x - node.x) < gridSize * 1.5 &&
            Math.abs(n.y - node.y) < gridSize * 1.5
        );

        // Connect to 1-2 nearby nodes (reduced from 1-3)
        const numConnections = Math.floor(Math.random() * 2) + 1;
        const shuffled = possibleConnections.sort(() => Math.random() - 0.5);

        for (let j = 0; j < Math.min(numConnections, shuffled.length); j++) {
          if (!node.connections.includes(shuffled[j].id)) {
            node.connections.push(shuffled[j].id);
          }
        }
      });

      setNodes(newNodes);
    };

    generateNodes();
    window.addEventListener("resize", generateNodes);
    return () => window.removeEventListener("resize", generateNodes);
  }, []);

  // Animate pulses using requestAnimationFrame
  useEffect(() => {
    if (nodes.length === 0) return;

    let lastSpawnTime = 0;
    const spawnInterval = 800; // Spawn less frequently

    const animate = (timestamp: number) => {
      // Spawn new pulses
      if (timestamp - lastSpawnTime > spawnInterval) {
        lastSpawnTime = timestamp;
        const nodeWithConnections = nodes.filter((n) => n.connections.length > 0);
        if (nodeWithConnections.length > 0) {
          const fromNode = nodeWithConnections[Math.floor(Math.random() * nodeWithConnections.length)];
          const toNodeId = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];

          setPulses((prev) => {
            // Limit max pulses
            if (prev.length >= 8) return prev;
            return [...prev, {
              id: pulseIdRef.current++,
              fromNode: fromNode.id,
              toNode: toNodeId,
              progress: 0,
              speed: 0.015 + Math.random() * 0.015,
            }];
          });
        }
      }

      // Update pulses
      setPulses((prev) =>
        prev
          .map((pulse) => ({ ...pulse, progress: pulse.progress + pulse.speed }))
          .filter((pulse) => pulse.progress < 1)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full">
        {/* Circuit paths */}
        {nodes.map((node) =>
          node.connections.map((connId) => {
            const connNode = getNodeById(connId);
            if (!connNode || connId < node.id) return null; // Avoid duplicate lines

            return (
              <line
                key={`${node.id}-${connId}`}
                x1={node.x}
                y1={node.y}
                x2={connNode.x}
                y2={connNode.y}
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="1"
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Outer glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="rgba(59, 130, 246, 0.1)"
            />
            {/* Inner node */}
            <circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="rgba(59, 130, 246, 0.4)"
            />
          </g>
        ))}

        {/* Animated pulses - simplified without blur */}
        {pulses.map((pulse) => {
          const fromNode = getNodeById(pulse.fromNode);
          const toNode = getNodeById(pulse.toNode);
          if (!fromNode || !toNode) return null;

          const x = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;

          return (
            <g key={pulse.id}>
              {/* Pulse glow - no blur filter */}
              <circle
                cx={x}
                cy={y}
                r="10"
                fill="rgba(139, 92, 246, 0.2)"
              />
              {/* Pulse core */}
              <circle cx={x} cy={y} r="4" fill="rgba(139, 92, 246, 0.8)" />
            </g>
          );
        })}
      </svg>

      {/* Static highlight nodes - no animation */}
      {nodes.slice(0, 5).map((node) => (
        <div
          key={`highlight-${node.id}`}
          className="absolute w-2 h-2 rounded-full bg-cyan-400 opacity-50"
          style={{ left: node.x - 4, top: node.y - 4 }}
        />
      ))}
    </div>
  );
}
