import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { MagneticButton } from '../ui/MagneticButton';
import type { PortfolioContent } from '../../data/portfolioData';

interface ContactPortalProps {
  content: PortfolioContent['contact'];
}

export const ContactPortal: React.FC<ContactPortalProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('alan.avinav@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = 'mailto:alan.avinav@gmail.com';
    }
  };

  return (
    <footer
      id="contact"
      className="relative mx-auto w-full max-w-7xl px-5 pt-16 pb-16 sm:px-8 lg:pt-24"
    >
      <LiquidGlassCard tiltStrength={2.2} className="p-8 sm:p-12 lg:p-16 text-center">
        <p className="font-mono-tech text-xs tracking-[0.22em] text-cyan-300 uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 leading-[0.98] tracking-tight">
          <span className="font-display block text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white">
            {content.title}
          </span>
          <span className="font-serif-editorial prismatic-text mt-1 block text-5xl sm:text-7xl lg:text-8xl italic font-normal">
            {content.titleEditorial}
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300/90">
          {content.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton variant="primary" onClick={handleCopyEmail}>
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>{content.copiedEmail}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-cyan-300" />
                <span>{content.copyEmail}</span>
              </>
            )}
          </MagneticButton>

          <MagneticButton
            variant="glass"
            href="/Alan_Avina_CV.pdf"
            download="Alan_Emmanuel_Avina_Venegas_CV.pdf"
          >
            <Download className="h-4 w-4 text-cyan-300" />
            <span>{content.downloadPdf}</span>
          </MagneticButton>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
          <a
            href="https://www.linkedin.com/in/alan-avina"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-slate-200 transition hover:text-white hover:border-cyan-300/50"
          >
            <Linkedin className="h-3.5 w-3.5 text-sky-300" />
            <span>LinkedIn / alan-avina</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          <a
            href="https://github.com/Alan-023"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-slate-200 transition hover:text-white hover:border-cyan-300/50"
          >
            <Github className="h-3.5 w-3.5 text-white" />
            <span>GitHub / Alan-023</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          <a
            href="mailto:alan.avinav@gmail.com"
            className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono-tech text-slate-200 transition hover:text-white hover:border-cyan-300/50"
          >
            <Mail className="h-3.5 w-3.5 text-emerald-300" />
            <span>alan.avinav@gmail.com</span>
          </a>
        </div>

        <p className="font-mono-tech mt-8 text-xs text-slate-400">
          {content.availability}
        </p>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="font-mono-tech text-[11px] text-slate-400/90">
            © {new Date().getFullYear()} · {content.footerNote}
          </p>
        </div>
      </LiquidGlassCard>
    </footer>
  );
};
