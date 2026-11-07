import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Play,
  Server,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { MagneticButton } from '../ui/MagneticButton';
import { motionState } from '../../store/motionState';
import type { PortfolioContent } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface AumovioSpotlightProps {
  content: PortfolioContent['aumovio'];
}

const NODE_ICONS = [Layers, Server, ShieldCheck, Database, Terminal];

export const AumovioSpotlight: React.FC<AumovioSpotlightProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<number>(2); // Default highlight: Orchestrator + Watchdog
  const [simStep, setSimStep] = useState<number>(-1);
  const [simLogs, setSimLogs] = useState<string[]>([
    '[SYSTEM] Aumovio On-Premise Distributed Automation Cluster · ONLINE',
    '[WATCHDOG] Concurrency locks armed · 0 active process collisions',
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-aumovio-reveal]',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
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

  const runPipelineSimulation = () => {
    if (simStep !== -1) return;
    motionState.aumovioPulseActive = true;
    setSimStep(0);
    setSelectedNode(0);
    setSimLogs([
      '[01 // PORTAL] One-Click trigger dispatched from React Financial Controlling UI...',
    ]);

    const logMessages = [
      '[02 // ASP.NET API] Payload validated (C# REST contract OK) -> Job #SAP-9042 created.',
      '[03 // ORCHESTRATOR] Enqueued in Async Queue · Watchdog verified 0 COM session locks.',
      '[04 // DOCKER + SQL] Container worker allocated · SQL audit transaction initialized.',
      '[05 // DEVWINUI CLI] Headless C#/XAML + SAP RPA completed! +19.2 hrs/mo reclaimed · Audit logged.',
    ];

    logMessages.forEach((msg, i) => {
      setTimeout(() => {
        const nextIdx = i + 1;
        setSimStep(nextIdx);
        setSelectedNode(nextIdx);
        setSimLogs((prev) => [...prev.slice(-4), msg]);

        if (nextIdx === 4) {
          setTimeout(() => {
            setSimStep(-1);
            motionState.aumovioPulseActive = false;
          }, 1600);
        }
      }, (i + 1) * 720);
    });
  };

  const activeNodeData = content.nodes[selectedNode] ?? content.nodes[0];

  return (
    <section
      id="aumovio"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div data-aumovio-reveal className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1 text-[11px] font-medium text-emerald-200">
            <Activity className="h-3.5 w-3.5 text-emerald-300" />
            <span className="font-mono-tech tracking-wider">{content.badge}</span>
          </div>

          <h2 className="leading-[1.02] tracking-tight">
            <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
              {content.title}{' '}
            </span>
            <span className="font-serif-editorial prismatic-text text-4xl sm:text-5xl lg:text-6xl italic font-normal">
              {content.titleEditorial}
            </span>
          </h2>

          <p className="text-sm sm:text-base font-medium text-cyan-200/90">
            {content.roleLine}
          </p>
        </div>

        <div data-aumovio-reveal className="flex flex-col items-start lg:items-end gap-1.5">
          <span className="font-mono-tech rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white">
            {content.period}
          </span>
          <span className="font-mono-tech text-[11px] text-slate-400">
            {content.contractNote}
          </span>
        </div>
      </div>

      <p
        data-aumovio-reveal
        className="mt-6 max-w-4xl text-base sm:text-lg leading-relaxed text-slate-300/90"
      >
        {content.intro}
      </p>

      {/* 3 Executive Quantified Metric Monoliths */}
      <div
        data-aumovio-reveal
        className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {content.metrics.map((m) => (
          <LiquidGlassCard key={m.label} tiltStrength={5} className="p-6 sm:p-7">
            <div className="flex items-baseline gap-2">
              <span className="font-display tabular-nums text-4xl sm:text-5xl font-extrabold text-white">
                {m.value}
              </span>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-cyan-300">
                {m.unit}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-white">{m.label}</h3>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300/85">
              {m.detail}
            </p>
          </LiquidGlassCard>
        ))}
      </div>

      {/* Interactive 5-Node Distributed Pipeline Visualizer */}
      <LiquidGlassCard
        data-aumovio-reveal
        tiltStrength={1.8}
        className="mt-8 p-6 sm:p-8 lg:p-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyan-300" />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                {content.pipelineTitle}
              </h3>
            </div>
            <p className="font-mono-tech mt-1 text-xs text-slate-400">
              {content.pipelineHint}
            </p>
          </div>

          <MagneticButton
            variant="primary"
            onClick={runPipelineSimulation}
            className="shrink-0"
          >
            <Play
              className={`h-4 w-4 ${
                simStep !== -1 ? 'animate-spin text-emerald-300' : 'text-cyan-300'
              }`}
            />
            <span>{simStep !== -1 ? content.simulatingBtn : content.simulateBtn}</span>
          </MagneticButton>
        </div>

        {/* 5 Architectural Nodes Grid */}
        <div className="mt-7 grid grid-cols-1 gap-3.5 lg:grid-cols-5">
          {content.nodes.map((node, idx) => {
            const Icon = NODE_ICONS[idx] || Cpu;
            const isSelected = selectedNode === idx;
            const isSimActive = simStep === idx;

            return (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => {
                  setSelectedNode(idx);
                  motionState.aumovioHoveredNode = idx;
                }}
                onMouseLeave={() => {
                  motionState.aumovioHoveredNode = -1;
                }}
                onClick={() => setSelectedNode(idx)}
                className={`group relative flex flex-col justify-between rounded-[18px] border p-4 text-left transition-all duration-300 cursor-pointer ${
                  isSelected || isSimActive
                    ? 'border-white/35 bg-white/[0.10] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_30px_rgba(0,0,0,0.45)] -translate-y-1'
                    : 'border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/40"
                      style={{
                        boxShadow: isSelected ? `0 0 20px ${node.accent}44` : undefined,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: node.accent }} />
                    </span>
                    <span className="font-mono-tech text-[10px] text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="font-mono-tech mt-3 text-[9px] tracking-widest text-slate-400 uppercase">
                    {node.step}
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-white leading-snug">
                    {node.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-300/80 line-clamp-2">
                    {node.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.07] flex items-center justify-between">
                  <span
                    className="font-mono-tech text-[10px] font-semibold"
                    style={{ color: node.accent }}
                  >
                    {node.metric}
                  </span>
                  {isSimActive && (
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Concentric Inspector Detail & Live Telemetry Console */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-[18px] border border-white/12 bg-black/35 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="font-mono-tech text-xs font-semibold uppercase tracking-wider"
                style={{ color: activeNodeData.accent }}
              >
                {activeNodeData.step} — {activeNodeData.title}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 font-mono-tech text-[11px] text-white">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                {activeNodeData.metric}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-200/95">
              {activeNodeData.detail}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeNodeData.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono-tech rounded-full border border-white/12 bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Live Distributed Telemetry Stream */}
          <div className="lg:col-span-5 rounded-[18px] border border-white/10 bg-[#04060c]/85 p-4 font-mono-tech text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5 text-[10px] text-slate-400">
              <span>ORCHESTRATOR TELEMETRY STREAM</span>
              <span className="text-emerald-400">● LIVE</span>
            </div>
            <div className="space-y-1.5 text-[11px] leading-relaxed">
              {simLogs.map((line, i) => (
                <p
                  key={`${line}-${i}`}
                  className={
                    i === simLogs.length - 1 ? 'text-cyan-200 font-medium' : 'text-slate-400'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs text-slate-400 border-t border-white/[0.06] pt-4">
          {content.governanceNote}
        </p>
      </LiquidGlassCard>
    </section>
  );
};
