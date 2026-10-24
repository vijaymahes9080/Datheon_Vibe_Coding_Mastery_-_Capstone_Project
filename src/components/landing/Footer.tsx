import React from "react";
import { Sparkles, ShieldCheck, Globe, Code, Share2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/70 dark:border-slate-800/80">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Skill<span className="gradient-text">Forge</span> AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Autonomous AI Career Architect empowering next-generation software engineers to bridge
              skills gaps and ship portfolio capstones.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/vijaymahes9080/Datheon_Vibe_Coding_Mastery_-_Capstone_Project"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Share"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  AI Skills Diagnostics
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Interactive Preview
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  3-Step Acceleration
                </a>
              </li>
              <li>
                <a href="#usecases" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Audience Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Engineering
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Architecture Overview
                </a>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">Next.js 15 App Router</span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">Supabase RLS & PostgreSQL</span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">Turbopack High Velocity</span>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Trust & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Trust & Security
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero model training on user private project notes</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Strict cryptographic tenant isolation via RLS</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>OWASP ASVS verified endpoint validation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 SkillForge AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built for Datheon AI Mastery Capstone</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span>Deployed with Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
