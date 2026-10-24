import React from "react";
import { Sliders, Cpu, Rocket, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const STEPS = [
  {
    step: "01",
    title: "Define Skills & Target Trajectory",
    description:
      "Input your current technical toolbelt, dream role (e.g. AI SaaS Engineer), available hours per week, and preferred domain interests.",
    icon: <Sliders className="w-6 h-6 text-indigo-500" />,
    tag: "30 Seconds",
  },
  {
    step: "02",
    title: "AI Synthesizes Your Custom Roadmap",
    description:
      "SkillForge Career Architect computes the gap matrix, establishes phased milestones, estimates time-to-completion, and architects a capstone project spec.",
    icon: <Cpu className="w-6 h-6 text-violet-500" />,
    tag: "Real-Time AI",
  },
  {
    step: "03",
    title: "Execute Tasks, Ship & Get Hired",
    description:
      "Work through daily action items, mark tasks completed, deploy your portfolio project with live links, and share evidence-based proficiency with recruiters.",
    icon: <Rocket className="w-6 h-6 text-emerald-500" />,
    tag: "Shippable Proof",
  },
];

export const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-20 md:py-32 bg-slate-50/70 dark:bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" size="md" className="mb-3">
            Predictable Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Ambition to Offer in <span className="gradient-text">Three Simple Steps</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A battle-tested methodology to fast-track your engineering seniority without wasted effort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-slate-200 dark:text-slate-800 select-none">
                    {step.step}
                  </span>
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/60">
                    {step.icon}
                  </div>
                </div>

                <Badge variant="purple" size="sm" className="mb-3">
                  {step.tag}
                </Badge>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Phase {idx + 1} Execution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
