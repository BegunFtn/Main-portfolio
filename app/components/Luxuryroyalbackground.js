"use client";
import { useEffect, useRef } from "react";

export default function LuxuryRoyalBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w,
      h,
      particles,
      frame = 0;

    function makeParticles() {
      return Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(Math.random() * 0.25 + 0.05),
        opacity: Math.random() * 0.9 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        type:
          Math.random() < 0.3 ? "gold" : Math.random() < 0.5 ? "rose" : "white",
      }));
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = makeParticles();
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      frame++;

      // Rich dark base — deep velvet black
      ctx.fillStyle = "#06030f";
      ctx.fillRect(0, 0, w, h);

      // Slow shifting deep purple/burgundy glow — like candlelight on velvet
      const t = frame * 0.0008;
      const gx = w * 0.5 + Math.sin(t) * w * 0.15;
      const gy = h * 0.45 + Math.cos(t * 0.7) * h * 0.1;

      const centerGlow = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.6);
      centerGlow.addColorStop(0, "rgba(80, 20, 60, 0.35)");
      centerGlow.addColorStop(0.4, "rgba(50, 10, 40, 0.2)");
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, w, h);

      // Secondary warm amber glow — bottom right
      const ag = ctx.createRadialGradient(
        w * 0.8,
        h * 0.75,
        0,
        w * 0.8,
        h * 0.75,
        w * 0.4,
      );
      ag.addColorStop(0, "rgba(120, 60, 0, 0.18)");
      ag.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ag;
      ctx.fillRect(0, 0, w, h);

      // Silk wave lines — subtle flowing horizontal shimmer
      for (let i = 0; i < 5; i++) {
        const y =
          h * (0.15 + i * 0.18) + Math.sin(frame * 0.003 + i * 1.2) * 18;
        const grad = ctx.createLinearGradient(0, y, w, y);
        grad.addColorStop(0, "rgba(180, 130, 30, 0)");
        grad.addColorStop(0.25, "rgba(200, 160, 40, 0.04)");
        grad.addColorStop(0.5, "rgba(255, 210, 80, 0.07)");
        grad.addColorStop(0.75, "rgba(200, 160, 40, 0.04)");
        grad.addColorStop(1, "rgba(180, 130, 30, 0)");
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= w; x += 4) {
          const wy = y + Math.sin(x * 0.008 + frame * 0.012 + i) * 6;
          ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Particles
      for (const p of particles) {
        const tw = Math.sin(frame * p.twinkleSpeed + p.twinkle);
        const alpha = p.opacity * (0.4 + 0.6 * Math.max(0, tw));

        let c0, c1;
        if (p.type === "gold") {
          c0 = `rgba(255, 215, 0, ${alpha})`;
          c1 = `rgba(255, 160, 0, 0)`;
        } else if (p.type === "rose") {
          c0 = `rgba(255, 180, 180, ${alpha * 0.7})`;
          c1 = `rgba(200, 80, 100, 0)`;
        } else {
          c0 = `rgba(255, 255, 255, ${alpha})`;
          c1 = `rgba(200, 180, 255, 0)`;
        }

        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        gr.addColorStop(0, c0);
        gr.addColorStop(1, c1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
      }

      // Rare gold diagonal streak
      if (frame % 220 === 0) {
        const sx = Math.random() * w * 0.6 + w * 0.1;
        const sy = Math.random() * h * 0.4;
        const len = 100 + Math.random() * 80;
        const streak = ctx.createLinearGradient(
          sx,
          sy,
          sx + len,
          sy + len * 0.3,
        );
        streak.addColorStop(0, "rgba(255,215,0,0)");
        streak.addColorStop(0.4, "rgba(255,215,0,0.5)");
        streak.addColorStop(1, "rgba(255,215,0,0)");
        ctx.strokeStyle = streak;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + len, sy + len * 0.3);
        ctx.stroke();
      }

      // Edge vignette — dark border like a framed painting
      const vign = ctx.createRadialGradient(
        w / 2,
        h / 2,
        h * 0.25,
        w / 2,
        h / 2,
        h * 0.85,
      );
      vign.addColorStop(0, "rgba(0,0,0,0)");
      vign.addColorStop(1, "rgba(0,0,0,0.75)");
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, w, h);

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
