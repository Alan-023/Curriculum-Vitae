import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, MapPin } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import type { PortfolioContent } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceTimelineProps {
  content: PortfolioContent['experience'];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 65%',
              scrub: 0.6,
            },
          }
        );
      }

      gsap.fromTo(
        '[data-exp-card]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="max-w-3xl space-y-2">
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
      </div>

      <div className="relative mt-12 pl-6 sm:pl-10">
        {/* Background Rail */}
        <div className="absolute top-2 bottom-2 left-1.5 sm:left-3 w-[2px] bg-white/10 rounded-full" />
        {/* Scroll-Scrubbed Chromatic Laser Filament */}
        <div
          ref={beamRef}
          className=" origin-top absolute top-2 bottom-2 left-1.5 sm:left-3 w-[2px] rounded-full bg-gradient-to-b from-cyan-300 via-indigo-400 to-emerald-300 shadow-[0_0_16px_rgba(56,189,248,0.85)]"
        />

        <div className="space-y-8">
          {content.items.map((exp, idx) => (
            <div key={exp.company} data-exp-card className="relative">
              {/* Optical Node Dot */}
              <div className="absolute -left-[23px] sm:-left-[33px] top-8 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-200/80 bg-[#05070e] shadow-[0_0_16px_rgba(56,189,248,0.9)]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </div>

              <LiquidGlassCard tiltStrength={3.2} className="p-6 sm:p-8 lg:p-9">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Building2 className="h-4 w-4 text-cyan-300" />
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                        {exp.company}
                      </h3>
                      {exp.statusBadge && (
                        <span className="font-mono-tech rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-200">
                          {exp.statusBadge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-cyan-200/90">
                      {exp.role} · <span className="text-slate-300/80">{exp.division}</span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <span className="font-mono-tech rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1 text-xs text-white">
                      {exp.period}
                    </span>
                    <span className="font-mono-tech inline-flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="h-3 w-3 text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm sm:text-[15px] leading-relaxed text-slate-200/90">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-tech rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="ml-auto font-mono-tech text-[10px] text-slate-500 self-center">
                    0{idx + 1} // PRODUCTION
                  </span>
                </div>
              </LiquidGlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
