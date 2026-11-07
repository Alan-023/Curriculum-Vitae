import React, { useEffect, useRef } from 'react';
import { motionState } from '../../store/motionState';

/**
 * Velocity-stretching Liquid Glass droplet cursor with chromatic rim.
 * Automatically disabled on touch / coarse-pointer devices.
 */
export const CustomLiquidCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const lens = lensRef.current;
    if (!dot || !lens) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lensX = mouseX;
    let lensY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;
    let scaleTarget = 1;
    let currentScale = 1;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      motionState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      motionState.pointerY = -(e.clientY / window.innerHeight) * 2 + 1;

      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest('a, button, [data-magnetic], [data-interactive]');
      scaleTarget = isInteractive ? 1.85 : 1;
    };

    const render = () => {
      const vx = mouseX - prevX;
      const vy = mouseY - prevY;
      prevX = mouseX;
      prevY = mouseY;

      const speed = Math.min(Math.hypot(vx, vy), 48);
      motionState.pointerSpeed = speed / 48;

      lensX += (mouseX - lensX) * 0.18;
      lensY += (mouseY - lensY) * 0.18;
      currentScale += (scaleTarget - currentScale) * 0.16;

      const dx = mouseX - lensX;
      const dy = mouseY - lensY;
      const dist = Math.min(Math.hypot(dx, dy), 60);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const stretch = 1 + (dist / 60) * 0.34;
      const squash = 1 / Math.sqrt(stretch);

      dot.style.transform = `translate3d(${mouseX - 3.5}px, ${mouseY - 3.5}px, 0)`;
      lens.style.transform = `translate3d(${lensX - 20}px, ${lensY - 20}px, 0) rotate(${angle.toFixed(
        1
      )}deg) scale(${(stretch * currentScale).toFixed(3)}, ${(squash * currentScale).toFixed(3)})`;

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_12px_rgba(56,189,248,0.95)]"
      />
      <div
        ref={lensRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-white/30 bg-white/[0.04] backdrop-blur-[3px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.55),0_0_24px_rgba(56,189,248,0.18)]"
        style={{
          backgroundImage:
            'conic-gradient(from 45deg, rgba(56,189,248,0.22), rgba(168,85,247,0.22), rgba(251,146,60,0.2), rgba(52,211,153,0.22), rgba(56,189,248,0.22))',
        }}
      />
    </div>
  );
};
