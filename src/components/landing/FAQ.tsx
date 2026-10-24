"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const FAQS = [
  {
    q: "How does SkillForge AI formulate realistic career roadmaps?",
    a: "Unlike generic chatbots that produce broad advice, SkillForge AI Career Architect uses structured prompt engineering with strict schema validation. It analyzes your starting tools, target role requirements, and weekly hour budget to synthesize sequential learning milestones with concrete graduation criteria and verifiable capstone projects.",
  },
  {
    q: "Will the generated capstone projects impress hiring managers?",
    a: "Yes. Generic 'Todo apps' or 'Weather widgets' get rejected immediately. SkillForge generates enterprise-grade problem statements—such as distributed ledger reconcilers, multi-tenant RAG systems, and resilient event pipelines—complete with architectural diagrams, test suites, and deployment guidelines.",
  },
  {
    q: "How is my account data and personal progress secured?",
    a: "SkillForge uses Supabase PostgreSQL with strict Row-Level Security (RLS) policies. Every roadmap, task, and lead is cryptographically linked to your authenticated session. Privileged database mutations are strictly guarded on the server side, ensuring zero cross-tenant leakage.",
  },
  {
    q: "What AI providers and models power the platform?",
    a: "Our backend orchestration architecture uses a provider-agnostic adapter supporting Google Gemini 1.5/2.0, OpenAI GPT-4o, and Anthropic Claude 3.5. Model responses are parsed through Zod schema validators before reaching your browser.",
  },
  {
    q: "Can I manage and track tasks daily inside the app?",
    a: "Absolutely. Once an AI roadmap is generated, you can save it directly to your personal dashboard with a single click. From there, you can add custom tasks, update completion statuses, track overall progress gauges, and prioritize your upcoming deadlines.",
  },
  {
    q: "Is there a free tier for university students and boot camp grads?",
    a: "Yes! Students and job-seekers can generate and track their primary career roadmaps completely free. We believe every aspiring engineer deserves a structured, fluff-free path into the technology industry.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-50/50 dark:bg-slate-950/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="purple" size="md" className="mb-3">
            Got Questions?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Everything you need to know about our AI Career Architect and data security.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-850/60 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
