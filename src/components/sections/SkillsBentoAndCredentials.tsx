import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, GraduationCap, Languages, Shield } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import type { PortfolioContent } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface SkillsBentoAndCredentialsProps {
  content: PortfolioContent['bento'];
}

export const SkillsBentoAndCredentials: React.FC<SkillsBentoAndCredentialsProps> = ({
  content,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-bento-cell]',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
    >
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
      </div>

      {/* Asymmetric 12-Col Bento Grid (7/5 + 5/7 Editorial Rhythm) */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
        {content.categories.map((cat) => (
          <LiquidGlassCard
            key={cat.title}
            data-bento-cell
            tiltStrength={3.5}
            className={`${cat.span} p-6 sm:p-8 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tech text-[10px] tracking-[0.2em] text-cyan-300 uppercase">
                  {cat.tag}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
              </div>

              <h3 className="font-display mt-2.5 text-xl sm:text-2xl font-bold text-white">
                {cat.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300/85 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  data-interactive
                  className="font-mono-tech rounded-full border border-white/14 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-100 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </LiquidGlassCard>
        ))}

        {/* Education Cell (5 cols) */}
        <LiquidGlassCard
          data-bento-cell
          tiltStrength={3.5}
          className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono-tech text-[10px] tracking-widest text-emerald-300 uppercase">
                <GraduationCap className="h-4 w-4" />
                ACADEMIC FOUNDATION
              </span>
              <span className="font-mono-tech text-xs text-slate-300">
                {content.education.period}
              </span>
            </div>

            <h3 className="font-display mt-3 text-xl sm:text-2xl font-bold text-white">
              {content.education.school}
            </h3>
            <p className="mt-1 text-sm font-semibold text-cyan-200">
              {content.education.degree}
            </p>
            <p className="font-mono-tech mt-0.5 text-xs text-slate-400">
              {content.education.campus}
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-400 mb-2.5">
              {content.education.courseworkLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {content.education.coursework.map((cw) => (
                <span
                  key={cw}
                  className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-slate-200"
                >
                  {cw}
                </span>
              ))}
            </div>
          </div>
        </LiquidGlassCard>

        {/* Certifications + Languages & Executive Leadership Cell (7 cols) */}
        <LiquidGlassCard
          data-bento-cell
          tiltStrength={3.5}
          className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-[10px] tracking-widest text-amber-300 uppercase">
              <Award className="h-4 w-4" />
              <span>{content.certifications.title}</span>
            </div>

            <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {content.certifications.items.map((cert) => (
                <div
                  key={cert.name}
                  className="rounded-[18px] border border-white/12 bg-black/35 p-4"
                >
                  <p className="font-mono-tech text-[10px] text-cyan-300">{cert.code}</p>
                  <h4 className="mt-1 text-sm font-bold text-white">{cert.name}</h4>
                  <p className="mt-0.5 text-xs text-slate-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 border-t border-white/10 pt-5">
            <div>
              <div className="flex items-center gap-1.5 font-mono-tech text-[10px] tracking-wider text-cyan-300 uppercase">
                <Languages className="h-3.5 w-3.5" />
                <span>{content.languagesAndLeadership.languagesTitle}</span>
              </div>
              <div className="mt-2.5 space-y-1.5">
                {content.languagesAndLeadership.languages.map((l) => (
                  <div key={l.lang} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{l.lang}</span>
                    <span className="font-mono-tech text-slate-300">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-mono-tech text-[10px] tracking-wider text-purple-300 uppercase">
                <Shield className="h-3.5 w-3.5" />
                <span>{content.languagesAndLeadership.leadershipTitle}</span>
              </div>
              <ul className="mt-2.5 space-y-1 text-xs text-slate-200/90">
                {content.languagesAndLeadership.competencies.map((comp) => (
                  <li key={comp} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
};
