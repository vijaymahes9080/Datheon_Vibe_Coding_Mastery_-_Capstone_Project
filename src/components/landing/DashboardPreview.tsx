"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  TrendingUp,
  FolderGit2,
  Code2,
  Calendar,
  Layers,
  ArrowUpRight,
  Flame,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PreviewRole {
  id: string;
  role: string;
  targetCompany: string;
  progress: number;
  timeEstimate: string;
  skillsGap: { skill: string; current: number; required: number }[];
  milestones: {
    id: string;
    title: string;
    description: string;
    priority: "high" | "medium";
    tasks: { id: string; title: string; completed: boolean }[];
  }[];
  portfolioProject: {
    title: string;
    desc: string;
    stack: string[];
    deliverable: string;
  };
}

const PREVIEW_DATA: PreviewRole[] = [
  {
    id: "fs-ai",
    role: "Full-Stack AI SaaS Engineer",
    targetCompany: "Next-Gen AI Startups",
    progress: 68,
    timeEstimate: "8 Weeks (10 hrs/wk)",
    skillsGap: [
      { skill: "Next.js 15 App Router", current: 85, required: 95 },
      { skill: "LangChain / AI Tool Calling", current: 40, required: 90 },
      { skill: "Supabase RLS & Auth", current: 70, required: 85 },
      { skill: "Vector DB & RAG Pipelines", current: 35, required: 80 },
    ],
    milestones: [
      {
        id: "m1",
        title: "Phase 1: Architecture & Auth Security",
        description: "Configure Next.js 15 SSR, Row-Level Security, and session isolation.",
        priority: "high",
        tasks: [
          { id: "t1", title: "Set up Supabase SSR middleware with cookie storage", completed: true },
          { id: "t2", title: "Define RLS tenant policies for multi-user safety", completed: true },
          { id: "t3", title: "Implement rate-limiting guards on API routes", completed: true },
        ],
      },
      {
        id: "m2",
        title: "Phase 2: AI Orchestration & Tool Calling",
        description: "Integrate LLM streaming completions with structured JSON schema outputs.",
        priority: "high",
        tasks: [
          { id: "t4", title: "Implement structured schema validation with Zod", completed: true },
          { id: "t5", title: "Create fallback provider adapters for resilient failover", completed: false },
          { id: "t6", title: "Build responsive streaming markdown message parser", completed: false },
        ],
      },
    ],
    portfolioProject: {
      title: "OmniAgent AI Workflow Automation Platform",
      desc: "An enterprise agent orchestration platform with custom tool plugins, human-in-the-loop approvals, and Supabase audit logs.",
      stack: ["Next.js 15", "TypeScript", "Supabase", "Gemini 1.5", "Tailwind CSS"],
      deliverable: "Live Vercel URL with GitHub CI/CD badges and demo credentials.",
    },
  },
  {
    id: "backend-go",
    role: "Distributed Backend Architect",
    targetCompany: "High-Scale FinTech",
    progress: 45,
    timeEstimate: "10 Weeks (12 hrs/wk)",
    skillsGap: [
      { skill: "PostgreSQL Query Optimization", current: 60, required: 90 },
      { skill: "Distributed Transactions (Saga)", current: 30, required: 85 },
      { skill: "Event Streaming / Kafka", current: 45, required: 85 },
      { skill: "Kubernetes & Docker", current: 55, required: 80 },
    ],
    milestones: [
      {
        id: "m3",
        title: "Phase 1: Database Sharding & Index Tuning",
        description: "Master B-Tree, BRIN indexes and EXPLAIN ANALYZE execution traces.",
        priority: "high",
        tasks: [
          { id: "t7", title: "Implement composite indexes for sub-10ms queries", completed: true },
          { id: "t8", title: "Set up connection pooling with PgBouncer", completed: false },
        ],
      },
      {
        id: "m4",
        title: "Phase 2: Event-Driven Message Brokers",
        description: "Design idempotent consumer workflows and dead-letter queue recovery.",
        priority: "medium",
        tasks: [
          { id: "t9", title: "Build exactly-once semantics pipeline", completed: false },
          { id: "t10", title: "Stress test 100k events/sec throughput", completed: false },
        ],
      },
    ],
    portfolioProject: {
      title: "VaultStream: Real-time Ledger & Reconciliation Engine",
      desc: "Fault-tolerant distributed transactional ledger supporting double-entry bookkeeping with sub-5ms processing.",
      stack: ["PostgreSQL", "Go", "Docker", "Redis", "Grafana"],
      deliverable: "Benchmarked load test report and reproducible Docker Compose environment.",
    },
  },
];

export const DashboardPreview: React.FC<{ onLaunchGenerator: () => void }> = ({
  onLaunchGenerator,
}) => {
  const [selectedRole, setSelectedRole] = useState(PREVIEW_DATA[0]);
  const [tasksState, setTasksState] = useState<{ [id: string]: boolean }>({
    t1: true,
    t2: true,
    t3: true,
    t4: true,
    t5: false,
    t6: false,
    t7: true,
    t8: false,
    t9: false,
    t10: false,
  });

  const toggleTask = (taskId: string) => {
    setTasksState((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <section id="preview" className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="purple" size="md" className="mb-3">
            Interactive Product Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See Your Future Career Plan in <span className="gradient-text">Action</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            SkillForge AI transforms vague ambitions into quantifiable milestones, trackable tasks,
            and interview-winning capstone projects. Try checking off milestones below!
          </p>

          {/* Role selector tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800 max-w-lg mx-auto">
            {PREVIEW_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedRole(item)}
                className={`flex-1 min-w-[160px] py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedRole.id === item.id
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.role}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Shell Mockup */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-500/10 overflow-hidden">
          {/* Top Browser / Window Bar */}
          <div className="bg-slate-100 dark:bg-slate-950 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-3 text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                https://skillforge.ai/dashboard/roadmaps/{selectedRole.id}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Preview Mode
              </span>
            </div>
          </div>

          {/* Dashboard Content Grid */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedRole.role}
                  </h3>
                  <Badge variant="cyan" size="sm">
                    {selectedRole.targetCompany}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {selectedRole.timeEstimate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-amber-500" />
                    High Hiring Demand
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="primary"
                  icon={<Sparkles className="w-4 h-4" />}
                  onClick={onLaunchGenerator}
                >
                  Generate My Custom Roadmap
                </Button>
              </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Roadmap Completion
                  </span>
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {selectedRole.progress}%
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    +12% this week
                  </span>
                </div>
                <div className="mt-2 w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
                    style={{ width: `${selectedRole.progress}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Portfolio Readiness
                  </span>
                  <FolderGit2 className="w-4 h-4 text-violet-500" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    Ready to Ship
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Capstone includes live URL & CI/CD
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Next Task Deadline
                  </span>
                  <Calendar className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    In 2 Days
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Zod schema validation suite
                </p>
              </div>
            </div>

            {/* Split View: Milestones & Skills Gap */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Milestones & Tasks Checkbox Column */}
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  Actionable Milestones & Tasks (Interactive)
                </h4>

                <div className="space-y-4">
                  {selectedRole.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                            {milestone.title}
                          </h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {milestone.description}
                          </p>
                        </div>
                        <Badge
                          variant={milestone.priority === "high" ? "purple" : "default"}
                          size="sm"
                        >
                          {milestone.priority.toUpperCase()} PRIORITY
                        </Badge>
                      </div>

                      <div className="mt-3.5 space-y-2">
                        {milestone.tasks.map((task) => {
                          const isDone = tasksState[task.id] ?? task.completed;
                          return (
                            <button
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer group"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 shrink-0" />
                              )}
                              <span
                                className={`text-xs ${
                                  isDone
                                    ? "line-through text-slate-400 dark:text-slate-500"
                                    : "text-slate-700 dark:text-slate-200 font-medium"
                                }`}
                              >
                                {task.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Gap & Capstone Project Column */}
              <div className="space-y-6">
                {/* Skills Gap Analysis */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Skills Gap Analysis</span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                      Current vs Target
                    </span>
                  </h4>

                  <div className="space-y-3">
                    {selectedRole.skillsGap.map((gap) => (
                      <div key={gap.skill} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            {gap.skill}
                          </span>
                          <span className="text-slate-400">
                            {gap.current}% / {gap.required}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                            style={{ width: `${(gap.current / gap.required) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portfolio Capstone Card */}
                <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/80 bg-gradient-to-br from-indigo-50/80 to-violet-50/40 dark:from-indigo-950/30 dark:to-violet-950/20">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    <Code2 className="w-4 h-4" />
                    <span>Capstone Project Spec</span>
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-2">
                    {selectedRole.portfolioProject.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {selectedRole.portfolioProject.desc}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selectedRole.portfolioProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-indigo-200/60 dark:border-indigo-800/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Live Verification</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5">
                      Vercel URL <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
