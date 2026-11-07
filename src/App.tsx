import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { PORTFOLIO_DATA, type Language } from './data/portfolioData';
import { motionState } from './store/motionState';
import { LiquidGlassFilter } from './components/ui/LiquidGlassFilter';
import { CustomLiquidCursor } from './components/ui/CustomLiquidCursor';
import { OpticalPreloader } from './components/ui/OpticalPreloader';
import { SceneCanvas } from './components/canvas/SceneCanvas';
import { FloatingNavbar } from './components/sections/FloatingNavbar';
import { HeroSection } from './components/sections/HeroSection';
import { AumovioSpotlight } from './components/sections/AumovioSpotlight';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { ProjectsCarousel3D } from './components/sections/ProjectsCarousel3D';
import { GLBOpticalSandbox } from './components/sections/GLBOpticalSandbox';
import { SkillsBentoAndCredentials } from './components/sections/SkillsBentoAndCredentials';
import { ContactPortal } from './components/sections/ContactPortal';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  'about',
  'aumovio',
  'experience',
  'projects',
  'lab3d',
  'arsenal',
  'contact',
];

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('about');
  const lenisRef = useRef<Lenis | null>(null);

  const content = PORTFOLIO_DATA[lang];

  // Lenis + GSAP ScrollTrigger Chained Motion Synchronization
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateNativeProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      motionState.scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    if (prefersReduced) {
      window.addEventListener('scroll', updateNativeProgress, { passive: true });
      return () => window.removeEventListener('scroll', updateNativeProgress);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      ScrollTrigger.update();
      motionState.scrollProgress = e.progress;
      motionState.scrollVelocity = e.velocity;
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener('scroll', updateNativeProgress, { passive: true });

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener('scroll', updateNativeProgress);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track active section for Floating Liquid Glass Navbar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -36 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full selection:bg-cyan-400/30 selection:text-white">
      {/* Hidden SVG Refraction Filter Bank */}
      <LiquidGlassFilter />

      {/* Crisp Optical Calibration Preloader */}
      <OpticalPreloader />

      {/* Velocity-Deforming Liquid Glass Cursor */}
      <CustomLiquidCursor />

      {/* Persistent WebGL 3D Stage (Fluid Caustic Shader + Chained Morphing Liquid Glass Core) */}
      <SceneCanvas />

      {/* Subtle Cinema Film Grain Layer */}
      <div
        aria-hidden="true"
        className="optical-film-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.045]"
      />

      {/* Floating Capsule Navigation */}
      <FloatingNavbar
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'es' : 'en'))}
        nav={content.nav}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Foreground Interactive DOM Chapters */}
      <main className="relative z-10 flex flex-col">
        <HeroSection
          content={content.hero}
          onExploreAumovio={() => scrollToSection('aumovio')}
        />

        <AumovioSpotlight content={content.aumovio} />

        <ExperienceTimeline content={content.experience} />

        <ProjectsCarousel3D content={content.projects} />

        <GLBOpticalSandbox content={content.glbStage} />

        <SkillsBentoAndCredentials content={content.bento} />

        <ContactPortal content={content.contact} />
      </main>
    </div>
  );
};

export default App;
