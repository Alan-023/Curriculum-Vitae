import React, { useEffect, useState } from 'react';

export const OpticalPreloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 900; // crisp 0.9s calibration curtain

    const step = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(step);
      } else {
        setTimeout(() => setDismissed(true), 220);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030407] transition-opacity duration-500 ${
        progress === 100 ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border border-cyan-300/45 bg-gradient-to-br from-white/20 via-white/[0.04] to-cyan-400/20 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.55),0_0_40px_rgba(56,189,248,0.3)]">
          <span className="font-display text-base font-extrabold text-white">A</span>
        </div>
        <div className="w-48 h-[2px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-mono-tech tabular-nums text-[11px] tracking-[0.24em] text-slate-400">
          OPTICAL ENGINE // {progress.toString().padStart(3, '0')}%
        </p>
      </div>
    </div>
  );
};
