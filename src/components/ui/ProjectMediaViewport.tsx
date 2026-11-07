import React, { useEffect, useRef, useState } from 'react';
import type { ProjectItem } from '../../data/portfolioData';

interface ProjectMediaViewportProps {
  project: ProjectItem;
  isActive: boolean;
  badgeLabel: string;
}

export const ProjectMediaViewport: React.FC<ProjectMediaViewportProps> = ({
  project,
  isActive,
  badgeLabel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || videoReady) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (now: number) => {
      const t = (now - startTime) * 0.001;
      const w = canvas.clientWidth || 420;
      const h = canvas.clientHeight || 200;

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#05070e');
      bg.addColorStop(0.55, '#090d1a');
      bg.addColorStop(1, '#04060b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = (t * 14) % step; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (project.shaderTheme === 'pos-prism') {
        for (let i = 0; i < 4; i++) {
          const cx = w * (0.22 + i * 0.19) + Math.sin(t * 1.4 + i) * 18;
          const cy = h * 0.52 + Math.cos(t * 1.1 + i * 1.7) * 22;
          const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 85);
          grad.addColorStop(0, i % 2 === 0 ? 'rgba(56,189,248,0.42)' : 'rgba(168,85,247,0.34)');
          grad.addColorStop(1, 'rgba(56,189,248,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.beginPath();
        for (let x = 20; x <= w - 20; x += 6) {
          const nx = x / w;
          const y =
            h * 0.62 -
            Math.sin(nx * 6 + t * 2.2) * 24 -
            Math.cos(nx * 13 - t * 1.5) * 10 -
            nx * 28;
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.88)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
      } else if (project.shaderTheme === 'bio-pulse') {
        const cx = w * 0.5;
        const cy = h * 0.5;
        for (let r = 0; r < 3; r++) {
          const rad = 26 + ((t * 32 + r * 34) % 95);
          const alpha = Math.max(0, 1 - rad / 120) * 0.5;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
        ctx.beginPath();
        for (let x = 16; x < w - 16; x += 3) {
          const phase = ((x + t * 90) % 140) / 140;
          let spike = 0;
          if (phase > 0.45 && phase < 0.5) spike = -38 * Math.sin(((phase - 0.45) / 0.05) * Math.PI);
          else if (phase >= 0.5 && phase < 0.54) spike = 18 * Math.sin(((phase - 0.5) / 0.04) * Math.PI);
          const y = cy + spike + Math.sin(x * 0.03 + t) * 4;
          if (x === 16) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(110, 231, 183, 0.9)';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (project.shaderTheme === 'queue-matrix') {
        const lanes = 3;
        for (let l = 0; l < lanes; l++) {
          const y = h * (0.28 + l * 0.22);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.16)';
          ctx.beginPath();
          ctx.moveTo(24, y);
          ctx.lineTo(w - 24, y);
          ctx.stroke();

          for (let p = 0; p < 3; p++) {
            const px = 24 + ((t * (75 + l * 18) + p * 120) % (w - 48));
            const g = ctx.createRadialGradient(px, y, 1, px, y, 22);
            g.addColorStop(0, 'rgba(251, 191, 36, 0.95)');
            g.addColorStop(0.4, 'rgba(245, 158, 11, 0.35)');
            g.addColorStop(1, 'rgba(245, 158, 11, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(px, y, 22, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        const bars = 16;
        const bw = (w - 64) / bars;
        for (let b = 0; b < bars; b++) {
          const amp = 0.28 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2.1 + b * 0.55));
          const bh = amp * (h * 0.62);
          const x = 32 + b * bw;
          const y = h - 22 - bh;
          const g = ctx.createLinearGradient(x, y, x, h - 22);
          g.addColorStop(0, 'rgba(196, 181, 253, 0.85)');
          g.addColorStop(1, 'rgba(129, 140, 248, 0.12)');
          ctx.fillStyle = g;
          ctx.fillRect(x + 3, y, Math.max(4, bw - 6), bh);
        }
      }

      if (isActive) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [project.shaderTheme, isActive, videoReady]);

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#05070e]">
      {project.videoUrl && !videoFailed && (
        <video
          src={project.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {!videoReady && <canvas ref={canvasRef} className="h-full w-full block" />}

      <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between">
        <span className="font-mono-tech inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] tracking-widest text-slate-200 backdrop-blur-md">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: project.accentHex }}
          />
          {badgeLabel}
        </span>
        <span className="font-mono-tech rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] text-slate-300 backdrop-blur-md">
          {project.index} // LIVE
        </span>
      </div>
    </div>
  );
};
