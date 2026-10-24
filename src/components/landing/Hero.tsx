"use client";

import React from "react";
import { ArrowRight, Sparkles, Compass, ShieldCheck, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreDemo }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-grid-pattern">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-violet-500/10 dark:bg-violet-600/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          <span>AI-Powered Career & Portfolio Architect for Next-Gen Engineers</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.12]">
          Turn Learning Goals Into{" "}
          <span className="gradient-text">Shippable Projects</span> & Dream Tech Jobs.
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Stop getting overwhelmed by tutorial hell. SkillForge AI analyzes your current skills,
          calculates your real target gaps, and synthesizes structured milestone roadmaps with
          full-stack portfolio projects that get you hired.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Button
            size="lg"
            variant="primary"
            onClick={onGetStarted}
            className="w-full sm:w-auto shadow-xl shadow-indigo-500/25"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Generate Your Roadmap Free
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={onExploreDemo}
            className="w-full sm:w-auto"
            icon={<Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          >
            Explore Interactive Demo
          </Button>
        </div>

        {/* Social Proof / Key Highlights */}
        <div className="mt-16 pt-8 border-t border-slate-200/70 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-slate-900 dark:text-white">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span>&lt; 30s</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">AI Synthesis Time</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-slate-900 dark:text-white">
              <Target className="w-5 h-5 text-violet-500" />
              <span>100%</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Role-Tailored Milestones</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Zero Slop</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Production Code Criteria</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-5 h-5 text-cyan-500" />
              <span>Supabase</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">RLS Secure Storage</span>
          </div>
        </div>
      </div>
    </section>
  );
};
