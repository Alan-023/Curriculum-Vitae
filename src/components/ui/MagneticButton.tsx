import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '../../lib/cn';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  variant?: 'primary' | 'glass' | 'ghost';
  className?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  download,
  target,
  rel,
  onClick,
  variant = 'primary',
  className,
  ariaLabel,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(wrap, 'x', { duration: 0.55, ease: 'elastic.out(1, 0.42)' });
    const yTo = gsap.quickTo(wrap, 'y', { duration: 0.55, ease: 'elastic.out(1, 0.42)' });
    const innerXTo = gsap.quickTo(inner, 'x', { duration: 0.45, ease: 'power3.out' });
    const innerYTo = gsap.quickTo(inner, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      xTo(dx * 0.28);
      yTo(dy * 0.28);
      innerXTo(dx * 0.12);
      innerYTo(dy * 0.12);

      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      wrap.style.setProperty('--mx', `${mx.toFixed(1)}%`);
      wrap.style.setProperty('--my', `${my.toFixed(1)}%`);
      wrap.style.setProperty('--prism-opacity', '1');
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      innerXTo(0);
      innerYTo(0);
      wrap.style.setProperty('--prism-opacity', '0');
    };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const baseStyles = cn(
    'group relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-200 active:scale-[0.97] cursor-pointer select-none overflow-hidden',
    variant === 'primary' &&
      'liquid-glass-surface bg-white/[0.11] text-white shadow-[0_0_32px_rgba(56,189,248,0.22)] hover:bg-white/[0.16]',
    variant === 'glass' && 'liquid-glass-surface text-slate-100 hover:text-white',
    variant === 'ghost' &&
      'border border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white',
    className
  );

  const content = (
    <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2.5">
      {children}
    </span>
  );

  return (
    <div ref={wrapRef} data-magnetic className="inline-block">
      {href ? (
        <a
          href={href}
          download={download}
          target={target}
          rel={rel}
          onClick={onClick}
          aria-label={ariaLabel}
          className={baseStyles}
        >
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick} aria-label={ariaLabel} className={baseStyles}>
          {content}
        </button>
      )}
    </div>
  );
};
