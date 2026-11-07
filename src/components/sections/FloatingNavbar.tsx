import React, { useEffect, useState } from 'react';
import { Download, Globe, Sparkles } from 'lucide-react';
import type { Language, PortfolioContent } from '../../data/portfolioData';

interface FloatingNavbarProps {
  lang: Language;
  onToggleLang: () => void;
  nav: PortfolioContent['nav'];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  lang,
  onToggleLang,
  nav,
  activeSection,
  onNavigate,
}) => {
  const [gdlTime, setGdlTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Mexico_City',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setGdlTime(formatted);
      } catch {
        setGdlTime('UTC-6');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 20000);
    return () => clearInterval(timer);
  }, []);

  const links = [
    { id: 'about', label: nav.about },
    { id: 'aumovio', label: nav.aumovio },
    { id: 'experience', label: nav.experience },
    { id: 'projects', label: nav.projects },
    { id: 'lab3d', label: nav.lab3d },
    { id: 'arsenal', label: nav.arsenal },
    { id: 'contact', label: nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3 sm:top-5 sm:px-6">
      <nav
        aria-label="Primary Navigation"
        className="liquid-glass-pill flex w-full max-w-6xl items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-5 sm:py-2.5"
      >
        {/* Brand Monogram + Live Telemetry */}
        <button
          type="button"
          onClick={() => onNavigate('about')}
          className="group flex items-center gap-3 rounded-full px-2 py-1 text-left transition cursor-pointer"
        >
          <span className="font-display relative flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-gradient-to-br from-white/20 via-white/[0.06] to-cyan-400/20 text-sm font-extrabold tracking-tight text-white shadow-[inset_0_2px_3px_rgba(255,255,255,0.55),0_0_14px_rgba(56,189,248,0.28)] group-hover:border-cyan-300/70">
            A
          </span>
          <span className="hidden xl:flex flex-col leading-none">
            <span className="font-mono-tech text-[10px] tracking-widest text-slate-300">
              GDL, MX · {gdlTime}
            </span>
            <span className="font-mono-tech text-[9px] text-cyan-300/80">
              LIQUID OPTICS v2.6
            </span>
          </span>
        </button>

        {/* Capsule Section Links */}
        <ul className="hidden lg:flex items-center gap-1 rounded-full bg-black/25 p-1 border border-white/[0.06]">
          {links.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/14 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_18px_rgba(56,189,248,0.22)]'
                      : 'text-slate-300/85 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.id === 'aumovio' && (
                    <Sparkles className="mr-1 inline-block h-3 w-3 text-cyan-300" />
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right Controls: EN/ES Switch + Direct ATS CV PDF */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label="Toggle Language English / Español"
            className="font-mono-tech inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-cyan-300" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <a
            href="/Alan_Avina_CV.pdf"
            download="Alan_Emmanuel_Avina_Venegas_CV.pdf"
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/35 bg-cyan-400/15 px-3.5 py-1.5 text-xs font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_22px_rgba(56,189,248,0.2)] transition hover:bg-cyan-400/25 hover:border-cyan-200/60"
          >
            <Download className="h-3.5 w-3.5 text-cyan-200" />
            <span className="hidden sm:inline">{nav.downloadCv}</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
