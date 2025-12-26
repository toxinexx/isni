"use client";

import { useEffect, useRef, useState } from "react";
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

  // Generate circuit nodes
  useEffect(() => {
    const generateNodes = () => {
      const newNodes: Node[] = [];
      const gridSize = 120;
      const cols = Math.ceil(window.innerWidth / gridSize) + 1;
      const rows = Math.ceil(window.innerHeight / gridSize) + 1;

      let id = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Add some randomness to position
          const x = col * gridSize + (Math.random() - 0.5) * 40;
          const y = row * gridSize + (Math.random() - 0.5) * 40;
          newNodes.push({ id: id++, x, y, connections: [] });
        }
      }

      // Create connections (circuit paths)
      newNodes.forEach((node, i) => {
        const possibleConnections = newNodes.filter(
          (n) =>
            n.id !== node.id &&
            Math.abs(n.x - node.x) < gridSize * 1.5 &&
            Math.abs(n.y - node.y) < gridSize * 1.5
        );

        // Connect to 1-3 nearby nodes
        const numConnections = Math.floor(Math.random() * 3) + 1;
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

  // Animate pulses
  useEffect(() => {
    if (nodes.length === 0) return;

    const spawnPulse = () => {
      const nodeWithConnections = nodes.filter((n) => n.connections.length > 0);
      if (nodeWithConnections.length === 0) return;

      const fromNode = nodeWithConnections[Math.floor(Math.random() * nodeWithConnections.length)];
      const toNodeId = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];

      setPulses((prev) => [
        ...prev,
        {
          id: pulseIdRef.current++,
          fromNode: fromNode.id,
          toNode: toNodeId,
          progress: 0,
          speed: 0.01 + Math.random() * 0.02,
        },
      ]);
    };

    // Spawn pulses periodically
    const spawnInterval = setInterval(spawnPulse, 500);

    // Animation loop
    const animate = () => {
      setPulses((prev) =>
        prev
          .map((pulse) => ({ ...pulse, progress: pulse.progress + pulse.speed }))
          .filter((pulse) => pulse.progress < 1)
      );
    };

    const animationInterval = setInterval(animate, 16);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(animationInterval);
    };
  }, [nodes]);

  const getNodeById = (id: number) => nodes.find((n) => n.id === id);

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

        {/* Animated pulses */}
        {pulses.map((pulse) => {
          const fromNode = getNodeById(pulse.fromNode);
          const toNode = getNodeById(pulse.toNode);
          if (!fromNode || !toNode) return null;

          const x = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;

          return (
            <g key={pulse.id}>
              {/* Pulse glow */}
              <circle
                cx={x}
                cy={y}
                r="12"
                fill="rgba(139, 92, 246, 0.3)"
                style={{ filter: "blur(4px)" }}
              />
              {/* Pulse core */}
              <circle cx={x} cy={y} r="4" fill="rgba(139, 92, 246, 0.8)" />
            </g>
          );
        })}
      </svg>

      {/* Animated highlight nodes */}
      {nodes.slice(0, 10).map((node, i) => (
        <motion.div
          key={`highlight-${node.id}`}
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          style={{ left: node.x - 4, top: node.y - 4 }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
