import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/cn';

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tiltStrength?: number; // degrees, 0 disables 3D tilt
  proximityRadius?: number; // px outside bounds where prism rim begins reacting
  glowAccent?: string;
  interactive?: boolean;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className,
  tiltStrength = 5.5,
  proximityRadius = 110,
  interactive = true,
  style,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !interactive) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let targetOpacity = 0;
    let currentOpacity = 0;
    let targetRx = 0;
    let targetRy = 0;
    let currentRx = 0;
    let currentRy = 0;
    let rafId = 0;
    let isAnimating = false;

    const tick = () => {
      const lerp = 0.14;
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;
      currentOpacity += (targetOpacity - currentOpacity) * 0.12;
      currentRx += (targetRx - currentRx) * 0.12;
      currentRy += (targetRy - currentRy) * 0.12;

      const angleRad = Math.atan2(currentY - 0.5, currentX - 0.5);
      const angleDeg = (angleRad * 180) / Math.PI + 90;

      el.style.setProperty('--mx', `${(currentX * 100).toFixed(2)}%`);
      el.style.setProperty('--my', `${(currentY * 100).toFixed(2)}%`);
      el.style.setProperty('--prism-angle', `${angleDeg.toFixed(1)}deg`);
      el.style.setProperty('--prism-opacity', currentOpacity.toFixed(3));

      if (!prefersReduced && tiltStrength > 0) {
        el.style.transform = `perspective(1100px) rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg) translateZ(0)`;
      }

      const settled =
        Math.abs(targetOpacity - currentOpacity) < 0.004 &&
        Math.abs(targetRx - currentRx) < 0.02 &&
        Math.abs(targetRy - currentRy) < 0.02 &&
        targetOpacity === 0;

      if (!settled) {
        rafId = requestAnimationFrame(tick);
      } else {
        if (!prefersReduced && tiltStrength > 0) {
          el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        }
        isAnimating = false;
      }
    };

    const startLoop = () => {
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distanceOutside = Math.hypot(dx, dy);

      if (distanceOutside > proximityRadius) {
        if (targetOpacity !== 0) {
          targetOpacity = 0;
          targetRx = 0;
          targetRy = 0;
          startLoop();
        }
        return;
      }

      const nx = Math.min(Math.max((e.clientX - rect.left) / rect.width, -0.15), 1.15);
      const ny = Math.min(Math.max((e.clientY - rect.top) / rect.height, -0.15), 1.15);
      targetX = nx;
      targetY = ny;

      if (distanceOutside === 0) {
        targetOpacity = 1;
        if (!prefersReduced && tiltStrength > 0) {
          targetRx = (0.5 - ny) * tiltStrength * 2;
          targetRy = (nx - 0.5) * tiltStrength * 2;
        }
      } else {
        // Proximity glow before cursor even crosses border!
        targetOpacity = Math.max(0, 1 - distanceOutside / proximityRadius) * 0.55;
        targetRx = 0;
        targetRy = 0;
      }

      startLoop();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [interactive, proximityRadius, tiltStrength]);

  return (
    <div
      ref={cardRef}
      style={style}
      className={cn('liquid-glass-surface rounded-[26px]', className)}
      {...rest}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
