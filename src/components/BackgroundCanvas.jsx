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

    // Particle pool
    const particleCount = Math.min(Math.floor(width / 18), 65);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(242, 203, 190, ' : 'rgba(229, 163, 178, ',
      alpha: Math.random() * 0.7 + 0.2,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseDir: 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep radial glow in center
      const gradient = ctx.createRadialGradient(
        width / 2, height / 3, 50,
        width / 2, height / 3, Math.max(width, height) * 0.7
      );
      gradient.addColorStop(0, 'rgba(40, 12, 22, 0.4)');
      gradient.addColorStop(0.5, 'rgba(18, 7, 12, 0.2)');
      gradient.addColorStop(1, 'rgba(11, 7, 9, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render stardust particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Pulse opacity
        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha >= 0.85) p.pulseDir = -1;
        if (p.alpha <= 0.15) p.pulseDir = 1;

        // Wrap around screens
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = 'rgba(242, 203, 190, 0.8)';
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
