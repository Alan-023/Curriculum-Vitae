import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { MagneticButton } from '../ui/MagneticButton';
import type { PortfolioContent } from '../../data/portfolioData';

interface HeroSectionProps {
  content: PortfolioContent['hero'];
  onExploreAumovio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, onExploreAumovio }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-reveal]',
        { y: 36, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.05,
          stagger: 0.09,
          ease: 'power4.out',
          delay: 0.25,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-5 pt-24 pb-10 sm:px-8 lg:pt-28 lg:pb-12"
    >
      {/* Asymmetric 12-Col Editorial Grid (Left Content 8 cols, Right 4 cols Open Window to 3D Prism) */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 my-auto">
        <div className="lg:col-span-8 space-y-4 sm:space-y-5">
          {/* Live Aumovio Status Capsule */}
          <div data-hero-reveal className="inline-flex max-w-full">
            <div className="liquid-glass-pill inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wider text-slate-200">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono-tech truncate">{content.liveBadge}</span>
            </div>
          </div>

          {/* Eyebrow */}
          <p
            data-hero-reveal
            className="font-mono-tech text-xs tracking-[0.2em] text-cyan-300/90 uppercase"
          >
            {content.eyebrow}
          </p>

          {/* Sculptural Display + Editorial Serif Headline */}
          <h1
            data-hero-reveal
            className="leading-[0.95] tracking-tight"
          >
            <span className="font-display block text-[clamp(2.7rem,6.6vw,5.8rem)] font-extrabold text-white">
              {content.headlinePrimary}
            </span>
            <span className="font-serif-editorial prismatic-text mt-1 block text-[clamp(3.1rem,7.5vw,6.6rem)] italic font-normal">
              {content.headlineEditorial}
            </span>
          </h1>

          {/* Technical Role Signature */}
          <p
            data-hero-reveal
            className="font-mono-tech text-xs sm:text-sm text-slate-300/95 border-l-2 border-cyan-400/60 pl-3.5 py-0.5"
          >
            {content.roleStatement}
          </p>

          {/* Executive Value Proposition */}
          <p
            data-hero-reveal
            className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300/90 font-light"
          >
            {content.summary}
          </p>

          {/* Magnetic CTAs & Social Pills */}
          <div data-hero-reveal className="flex flex-wrap items-center gap-3.5 pt-2">
            <MagneticButton variant="primary" onClick={onExploreAumovio}>
              <span>{content.ctaPrimary}</span>
              <ArrowDownRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </MagneticButton>

            <MagneticButton
              variant="glass"
              href="/Alan_Avina_CV.pdf"
              download="Alan_Emmanuel_Avina_Venegas_CV.pdf"
            >
              <Download className="h-4 w-4 text-cyan-300" />
              <span>{content.ctaSecondary}</span>
            </MagneticButton>

            <div className="flex items-center gap-2 pl-1">
              <MagneticButton
                variant="ghost"
                href="https://www.linkedin.com/in/alan-avina"
                target="_blank"
                rel="noreferrer"
                ariaLabel="LinkedIn Profile"
                className="px-3.5 py-3.5"
              >
                <Linkedin className="h-4 w-4 text-sky-300" />
              </MagneticButton>

              <MagneticButton
                variant="ghost"
                href="https://github.com/Alan-023"
                target="_blank"
                rel="noreferrer"
                ariaLabel="GitHub Profile"
                className="px-3.5 py-3.5"
              >
                <Github className="h-4 w-4 text-slate-200" />
              </MagneticButton>

              <MagneticButton
                variant="ghost"
                href="mailto:alan.avinav@gmail.com"
                ariaLabel="Send Email"
                className="px-3.5 py-3.5"
              >
                <Mail className="h-4 w-4 text-amber-200" />
              </MagneticButton>
            </div>
          </div>

          <div
            data-hero-reveal
            className="font-mono-tech flex items-center gap-2 text-xs text-slate-400 pt-1"
          >
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            <span>Tonalá / Guadalajara, Jalisco, MX · alan.avinav@gmail.com</span>
          </div>
        </div>

        {/* Right 4-Col Optical Framing Telemetry (Frames the 3D Refractive Sculpture behind it) */}
        <div data-hero-reveal className="hidden lg:flex lg:col-span-4 flex-col items-end justify-end h-full min-h-[340px] pointer-events-none">
          <div className="liquid-glass-pill rounded-2xl px-4 py-3 text-right max-w-[230px] border border-white/10">
            <p className="font-mono-tech text-[10px] tracking-widest text-cyan-300 uppercase">
              OPTICAL CORE // IOR 1.52
            </p>
            <p className="mt-1 text-xs text-slate-300 leading-snug">
              Move cursor or scroll to bend real-time chromatic light & morph scene geometry.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Executive KPI Strip (Concentric Liquid Glass Cards with Rainbow Hover Refraction) */}
      <div
        data-hero-reveal
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-10"
      >
        {content.kpis.map((kpi, idx) => (
          <LiquidGlassCard
            key={kpi.label}
            tiltStrength={4.5}
            className="p-5 sm:p-6 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display tabular-nums text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {kpi.value}
              </span>
              <span className="font-mono-tech text-[10px] text-cyan-300/80">
                0{idx + 1} // KPI
              </span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-slate-100">{kpi.label}</p>
            <p className="font-mono-tech mt-1 text-xs text-slate-400">{kpi.sub}</p>
          </LiquidGlassCard>
        ))}
      </div>
    </section>
  );
};
