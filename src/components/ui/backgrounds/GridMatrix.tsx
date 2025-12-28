"use client";

import { useEffect, useRef } from "react";

export default function GridMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let mouse = { x: -1000, y: -1000 }; // Start off-screen

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Grid settings - larger grid = fewer nodes
    const gridSize = 80;
    const nodeRadius = 2;
    let time = 0;

    // Store nodes for pulsing effect
    let nodes: { x: number; y: number; pulse: number; pulseSpeed: number }[] = [];

    const initNodes = () => {
      nodes = [];
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          nodes.push({
            x,
            y,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.015 + Math.random() * 0.015,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      // Draw grid lines - batch into single path
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Draw nodes - simplified without gradients
      const mouseInfluenceRadius = 200;
      const mouseInfluenceRadiusSq = mouseInfluenceRadius * mouseInfluenceRadius;

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distSq = dx * dx + dy * dy;
        const mouseInfluence = distSq < mouseInfluenceRadiusSq
          ? Math.max(0, 1 - Math.sqrt(distSq) / mouseInfluenceRadius)
          : 0;

        // Pulse animation
        node.pulse += node.pulseSpeed;
        const pulseSize = Math.sin(node.pulse) * 0.5 + 0.5;
        const size = nodeRadius + pulseSize * 1.5 + mouseInfluence * 3;
        const alpha = 0.4 + pulseSize * 0.2 + mouseInfluence * 0.4;

        // Simple glow (no gradient)
        if (mouseInfluence > 0.1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.3})`;
          ctx.fill();
        }

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fill();

        // Draw connecting line to mouse if close
        if (mouseInfluence > 0.3) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${mouseInfluence * 0.4})`;
          ctx.lineWidth = 1.5;
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
