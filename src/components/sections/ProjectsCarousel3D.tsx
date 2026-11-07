import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Code2, Sparkles } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { ProjectMediaViewport } from '../ui/ProjectMediaViewport';
import { motionState } from '../../store/motionState';
import type { PortfolioContent } from '../../data/portfolioData';

interface ProjectsCarousel3DProps {
  content: PortfolioContent['projects'];
}

export const ProjectsCarousel3D: React.FC<ProjectsCarousel3DProps> = ({ content }) => {
  const total = content.items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef<number>(0);

  const selectIndex = (next: number) => {
    const wrapped = ((next % total) + total) % total;
    setActiveIndex(wrapped);
    motionState.activeCarouselIndex = wrapped;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') selectIndex(activeIndex + 1);
      if (e.key === 'ArrowLeft') selectIndex(activeIndex - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, total]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (dragStartX.current === null) return;
    if (dragDelta.current < -45) {
      selectIndex(activeIndex + 1);
    } else if (dragDelta.current > 45) {
      selectIndex(activeIndex - 1);
    }
    dragStartX.current = null;
    dragDelta.current = 0;
  };

  // Compute circular signed offset (-2..+2) for smooth 3D cylindrical coverflow
  const getSignedOffset = (idx: number) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
    >
      {/* Header + Carousel Controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-2.5">
          <p className="font-mono-tech text-xs tracking-[0.2em] text-cyan-300 uppercase">
            {content.eyebrow}
          </p>
          <h2 className="leading-tight tracking-tight">
            <span className="font-display text-3xl sm:text-5xl font-extrabold text-white">
              {content.title}{' '}
            </span>
            <span className="font-serif-editorial prismatic-text text-4xl sm:text-5xl italic font-normal">
              {content.titleEditorial}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300/90 max-w-2xl">
            {content.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-end">
          <button
            type="button"
            onClick={() => selectIndex(activeIndex - 1)}
            aria-label="Previous Project"
            className="liquid-glass-pill flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:border-cyan-300/60 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-mono-tech text-xs text-slate-300 px-2">
            0{activeIndex + 1} / 0{total}
          </span>
          <button
            type="button"
            onClick={() => selectIndex(activeIndex + 1)}
            aria-label="Next Project"
            className="liquid-glass-pill flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:border-cyan-300/60 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 3D Cylindrical Perspective Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative mt-10 min-h-[590px] sm:min-h-[560px] w-full select-none touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ perspective: '1500px' }}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {content.items.map((project, idx) => {
            const offset = getSignedOffset(idx);
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const visible = absOffset <= 1;

            const translateX = offset * 56; // %
            const translateZ = -absOffset * 190; // px
            const rotateY = offset * -24; // deg
            const scale = isCenter ? 1 : 0.86;
            const opacity = !visible ? 0 : isCenter ? 1 : 0.48;

            return (
              <div
                key={project.id}
                onClick={() => !isCenter && selectIndex(idx)}
                style={{
                  transform: `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: 30 - absOffset * 10,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
                className="w-full max-w-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [ grid-area:1/1 ] absolute top-0"
              >
                <LiquidGlassCard
                  tiltStrength={isCenter ? 4 : 0}
                  interactive={isCenter}
                  className="p-5 sm:p-7"
                >
                  {/* Concentric Cinema Frame */}
                  <ProjectMediaViewport
                    project={project}
                    isActive={isCenter}
                    badgeLabel={content.mediaBadge}
                  />

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                    <span
                      className="font-mono-tech text-[11px] font-semibold tracking-wider uppercase"
                      style={{ color: project.accentHex }}
                    >
                      {project.category}
                    </span>
                    <span className="font-mono-tech text-xs text-slate-400">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="font-display mt-1.5 text-2xl sm:text-3xl font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-medium text-cyan-100/90">
                    {project.impactHeadline}
                  </p>

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-300/90">
                    {project.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: project.accentHex }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-tech rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </LiquidGlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot Indicators + Drag Telemetry */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {content.items.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Select ${p.title}`}
              onClick={() => selectIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'w-9 bg-cyan-300' : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <p className="font-mono-tech text-[10px] tracking-[0.22em] text-slate-400">
          {content.dragHint}
        </p>
      </div>

      {/* Additional Engineering & Computer Science Lab Vault */}
      <div className="mt-20">
        <div className="flex items-center gap-2.5 mb-6">
          <Code2 className="h-4 w-4 text-cyan-300" />
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            {content.labVaultTitle}
          </h3>
          <Sparkles className="h-3.5 w-3.5 text-amber-300/80" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.labVaultItems.map((lab) => (
            <LiquidGlassCard key={lab.name} tiltStrength={5} className="p-5 flex flex-col justify-between">
              <div>
                <p className="font-mono-tech text-[10px] tracking-wider text-cyan-300 uppercase">
                  {lab.stack}
                </p>
                <h4 className="font-display mt-2 text-base font-bold text-white">
                  {lab.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300/85">
                  {lab.desc}
                </p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
