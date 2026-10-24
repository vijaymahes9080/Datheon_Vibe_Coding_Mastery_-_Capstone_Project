import React from "react";
import {
  Brain,
  Layers,
  Code2,
  CheckSquare,
  Shield,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

const FEATURES = [
  {
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    badge: "AI Engine",
    title: "Precision Skills-Gap Diagnostics",
    description:
      "SkillForge compares your current proficiency with hundreds of verified tech job specs to highlight high-leverage skill gaps and remove redundant learning.",
  },
  {
    icon: <Layers className="w-6 h-6 text-violet-500" />,
    badge: "Roadmaps",
    title: "Structured Milestone Architecture",
    description:
      "Break intimidating objectives into manageable, sequential phases complete with weekly estimated study hours and clear graduation criteria.",
  },
  {
    icon: <Code2 className="w-6 h-6 text-cyan-500" />,
    badge: "Portfolio",
    title: "Shippable Capstone Blueprints",
    description:
      "Replace generic todo-app tutorials with production-grade capstone specs featuring architectural diagrams, schema definitions, and cloud deployment pipelines.",
  },
  {
    icon: <CheckSquare className="w-6 h-6 text-emerald-500" />,
    badge: "Productivity",
    title: "Granular Task Management",
    description:
      "Organize daily execution with priorities, deadlines, and completion checks synced directly to your cloud workspace.",
  },
  {
    icon: <Shield className="w-6 h-6 text-amber-500" />,
    badge: "Enterprise Security",
    title: "Supabase Row-Level Security (RLS)",
    description:
      "Your career roadmap data, notes, and milestones are protected by strict PostgreSQL RLS policies ensuring complete tenant isolation.",
  },
  {
    icon: <Zap className="w-6 h-6 text-rose-500" />,
    badge: "Fast Iteration",
    title: "Real-Time Progress Metrics",
    description:
      "Track your velocity, milestone completion rates, and portfolio readiness with live visualizations and progress meters.",
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" size="md" className="mb-3">
            Core Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for <span className="gradient-text">Relentless Career Growth</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Everything you need to stop wandering aimlessly through documentation and build
            tangible evidence of senior engineering capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <Card
              key={idx}
              glow
              className="group hover:border-indigo-500/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/80 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <Badge variant="default" size="sm">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
