import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Slow Stardust Particles
    const particleCount = Math.min(Math.floor(width / 22), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      color: Math.random() > 0.5 ? 'rgba(242, 203, 190, ' : 'rgba(229, 163, 178, ',
      alpha: Math.random() * 0.5 + 0.15,
      speedY: Math.random() * 0.25 + 0.08,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.1,
      pulseSpeed: Math.random() * 0.01 + 0.005,
      pulseDir: 1,
    }));

    // 2. Occasional Cherry Blossom / Petals (🌸)
    const petalCount = 8;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 5,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    // 3. 5-Minute Ambient Gradient Time Tracker
    let startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient color phase shifting slowly over 5 minutes (300,000 ms)
      const elapsed = (Date.now() - startTime) % 300000;
      const progress = elapsed / 300000; // 0 to 1
      const hueShift = Math.sin(progress * Math.PI * 2) * 15; // Shift hue slightly

      // Deep Radial Ambient Glow
      const centerX = width / 2;
      const centerY = height / 3;
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 40,
        centerX, centerY, Math.max(width, height) * 0.85
      );
      
      const innerColor = `hsla(${340 + hueShift}, 45%, 12%, 0.45)`;
      const outerColor = `hsla(${345 + hueShift}, 30%, 4%, 1)`;

      gradient.addColorStop(0, innerColor);
      gradient.addColorStop(0.6, 'rgba(15, 8, 11, 0.85)');
      gradient.addColorStop(1, outerColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render Stardust Particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha >= 0.7) p.pulseDir = -1;
        if (p.alpha <= 0.1) p.pulseDir = 1;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = 'rgba(242, 203, 190, 0.6)';
        ctx.fill();
        ctx.restore();
      });

      // Render Occasional Falling Petals 🌸
      petals.forEach((pt) => {
        pt.y += pt.speedY;
        pt.x += Math.sin(pt.y * 0.01) * 0.4;
        pt.rotation += pt.rotationSpeed;

        if (pt.y > height + 20) {
          pt.y = -20;
          pt.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rotation);
        ctx.globalAlpha = pt.opacity;

        // Draw smooth petal path
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-pt.size, -pt.size * 1.2, -pt.size * 1.2, pt.size * 0.5, 0, pt.size * 1.5);
        ctx.bezierCurveTo(pt.size * 1.2, pt.size * 0.5, pt.size, -pt.size * 1.2, 0, 0);
        
        const petalGrad = ctx.createLinearGradient(0, -pt.size, 0, pt.size);
        petalGrad.addColorStop(0, '#f7d6c8');
        petalGrad.addColorStop(1, '#e5a3b2');
        ctx.fillStyle = petalGrad;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
