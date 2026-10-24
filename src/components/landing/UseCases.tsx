import React from "react";
import { GraduationCap, Briefcase, RefreshCw, Award, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const USE_CASES = [
  {
    role: "Computer Science Students",
    subtitle: "Beat the Campus Placement Curve",
    icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
    problem: "Academic curriculums teach theory but miss modern stacks like Next.js 15, Turbopack, and LLM APIs.",
    solution: "SkillForge pairs foundational concepts with modern industry projects recruiters search for on GitHub.",
    bullets: [
      "Stand out during summer internship searches",
      "Replace toy school assignments with production architectures",
      "Master Git, CI/CD, and cloud deployments before graduating",
    ],
  },
  {
    role: "Fresh Graduates",
    subtitle: "Break the 'Need Experience to Get Experience' Loop",
    icon: <Briefcase className="w-6 h-6 text-violet-500" />,
    problem: "Entry-level listings expect 2+ years of production experience and live portfolio demonstrations.",
    solution: "AI generates end-to-end full-stack capstone blueprints with live Vercel links and system architecture diagrams.",
    bullets: [
      "Prove competence with documented system design decisions",
      "Demonstrate real Supabase Auth and RLS security handling",
      "Ace technical interviews with STAR-aligned project stories",
    ],
  },
  {
    role: "Career Switchers",
    subtitle: "Navigate the Transition with Zero Wasted Time",
    icon: <RefreshCw className="w-6 h-6 text-emerald-500" />,
    problem: "Jumping between random YouTube videos and tutorials causes burnout without a coherent roadmap.",
    solution: "Personalized study calendars matched strictly to your weekly hours, cutting months off self-study.",
    bullets: [
      "Step-by-step guidance tailored to 5-15 hours/week availability",
      "Direct skill comparisons against target engineering salaries",
      "Clear graduation milestones to know when you are job-ready",
    ],
  },
  {
    role: "Mid-Level Engineers",
    subtitle: "Pivot into AI & Distributed Systems",
    icon: <Award className="w-6 h-6 text-cyan-500" />,
    problem: "General frontend or backend devs needing to transition into generative AI and agentic architectures.",
    solution: "High-density modules focusing strictly on vector search, RAG pipelines, and agentic reasoning loops.",
    bullets: [
      "Skip the basics and dive straight into advanced tool calling",
      "Benchmark local and cloud LLM inference pipelines",
      "Position yourself for Senior AI Engineer compensation",
    ],
  },
];

export const UseCases: React.FC = () => {
  return (
    <section id="usecases" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" size="md" className="mb-3">
            Target Audience & Outcomes
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tailored for Every Stage of Your{" "}
            <span className="gradient-text">Engineering Journey</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Whether you are writing your first line of TypeScript or pivoting into enterprise AI,
            SkillForge builds the exact bridge to your next milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {USE_CASES.map((uc, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/80">
                    {uc.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {uc.role}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {uc.subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400 block mb-1">
                      The Obstacle
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {uc.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/60 dark:border-indigo-900/50">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                      The SkillForge Advantage
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      {uc.solution}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {uc.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
