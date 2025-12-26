"use client";

import { useEffect, useRef } from "react";

export default function GridMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // Grid settings
    const gridSize = 50;
    const nodeRadius = 2;
    const pulseSpeed = 0.02;
    let time = 0;

    // Store nodes for pulsing effect
    const nodes: { x: number; y: number; pulse: number; pulseSpeed: number }[] = [];

    const initNodes = () => {
      nodes.length = 0;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          nodes.push({
            x,
            y,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.02,
          });
        }
      }
    };

    initNodes();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += pulseSpeed;

      // Draw grid lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and animate nodes
      nodes.forEach((node) => {
        const distToMouse = Math.sqrt(
          Math.pow(mouse.x - node.x, 2) + Math.pow(mouse.y - node.y, 2)
        );
        const mouseInfluence = Math.max(0, 1 - distToMouse / 200);

        // Pulse animation
        node.pulse += node.pulseSpeed;
        const pulseSize = Math.sin(node.pulse) * 0.5 + 0.5;
        const size = nodeRadius + pulseSize * 2 + mouseInfluence * 4;

        // Base glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          size * 3
        );

        const baseAlpha = 0.3 + pulseSize * 0.3 + mouseInfluence * 0.4;
        gradient.addColorStop(0, `rgba(59, 130, 246, ${baseAlpha})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${baseAlpha * 0.5})`);
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.6 + mouseInfluence * 0.4})`;
        ctx.fill();
      });

      // Draw connecting lines near mouse
      nodes.forEach((node) => {
        const distToMouse = Math.sqrt(
          Math.pow(mouse.x - node.x, 2) + Math.pow(mouse.y - node.y, 2)
        );

        if (distToMouse < 150) {
          const alpha = (1 - distToMouse / 150) * 0.5;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
