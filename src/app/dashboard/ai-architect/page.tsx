"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DataStore } from "@/lib/store";
import { CareerArchitectResponse } from "@/lib/ai/schema";
import { getDemoFallbackResponse } from "@/lib/ai/prompts";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Brain,
  Layers,
  Code2,
  Clock,
  Target,
  CheckCircle2,
  Flame,
  Plus,
  AlertCircle,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

const POPULAR_SKILLS = [
  "TypeScript",
  "React",
  "Next.js 15",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "Tailwind CSS",
  "Go",
  "GraphQL",
  "LangChain",
  "AWS",
];

export default function AiArchitectPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Wizard state
  const [targetRole, setTargetRole] = useState("Full-Stack AI SaaS Engineer");
  const [experienceLevel, setExperienceLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [weeklyHours, setWeeklyHours] = useState(12);
  const [currentSkills, setCurrentSkills] = useState<string[]>(["TypeScript", "React", "Node.js"]);
  const [skillInput, setSkillInput] = useState("");
  const [projectInterests, setProjectInterests] = useState("Autonomous AI agents and cloud developer tools");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CareerArchitectResponse | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSkill = (skill: string) => {
    if (currentSkills.includes(skill)) {
      setCurrentSkills(currentSkills.filter((s) => s !== skill));
    } else {
      setCurrentSkills([...currentSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!currentSkills.includes(skillInput.trim())) {
        setCurrentSkills([...currentSkills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) {
      setError("Target role is required.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setSavedSuccess(false);

    try {
      let data: CareerArchitectResponse | null = null;
      let usedProvider = "Google Gemini 1.5 Flash";

      try {
        const res = await fetch("/api/ai/architect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetRole,
            experienceLevel,
            weeklyHours,
            currentSkills,
            projectInterests,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          data = json.data;
          usedProvider = json.provider || "Career Architect";
        } else {
          throw new Error("API route not available in static mode");
        }
      } catch {
        // Fallback for static hosting on GitHub Pages
        data = getDemoFallbackResponse({
          targetRole,
          experienceLevel,
          weeklyHours,
          currentSkills,
          projectInterests,
        });
        usedProvider = "SkillForge Deterministic Engine (GitHub Pages Demo)";
      }

      setResult(data);
      setProvider(usedProvider);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during synthesis.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDashboard = async () => {
    if (!user || !result) return;
    setLoading(true);

    try {
      // 1. Create roadmap
      const createdRoadmap = await DataStore.createRoadmap(user.id, {
        title: `${targetRole} Accelerator Roadmap`,
        target_role: targetRole,
        description: result.summary,
        status: "active",
        milestones_count: result.milestones.length,
      });

      // 2. Create tasks under the new roadmap
      for (const milestone of result.milestones) {
        for (const taskText of milestone.suggestedTasks) {
          await DataStore.createTask(user.id, {
            roadmap_id: createdRoadmap.id,
            title: taskText,
            description: `Part of ${milestone.title}: ${milestone.completionCriteria}`,
            priority: milestone.priority,
            status: "pending",
          });
        }
      }

      setSavedSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/roadmaps/${createdRoadmap.id}`);
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Failed to persist roadmap to dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SkillForge AI Career Architect</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Synthesize Your Custom <span className="gradient-text">Engineering Roadmap</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Provide your current skills and target dream role. Our AI engine computes your exact skills gap
          and architects a verifiable roadmap with shippable portfolio deliverables.
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-center gap-3 text-red-700 dark:text-red-400 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Wizard Card */}
      {!result && (
        <form
          onSubmit={handleGenerate}
          className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6"
        >
          {/* Target Role & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Target Engineering Role"
              placeholder="e.g. AI SaaS Engineer, SRE, Distributed Systems"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              icon={<Target className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border capitalize transition-all cursor-pointer ${
                      experienceLevel === lvl
                        ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-700"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Commitment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="uppercase tracking-wider">Weekly Learning Commitment</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                {weeklyHours} Hours / Week
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={40}
              step={2}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Light (4h/wk)</span>
              <span>Balanced (12h/wk)</span>
              <span>Intensive (40h/wk)</span>
            </div>
          </div>

          {/* Current Skills Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Current Skills & Technologies ({currentSkills.length} selected)
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.map((skill) => {
                const isSelected = currentSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
            <div className="pt-2">
              <input
                type="text"
                placeholder="Type other skills and hit Enter (e.g. PyTorch, Kubernetes)..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddCustomSkill}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          {/* Project Interests */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Project Domain & Interests (Optional)
            </label>
            <textarea
              rows={2}
              value={projectInterests}
              onChange={(e) => setProjectInterests(e.target.value)}
              placeholder="e.g. FinTech real-time systems, Healthcare LLM agents, Developer tools..."
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={loading}
              className="w-full sm:w-auto shadow-xl shadow-indigo-500/25"
              icon={<Sparkles className="w-5 h-5" />}
            >
              Generate AI Career Roadmap
            </Button>
          </div>
        </form>
      )}

      {/* Loading state indicator */}
      {loading && !result && (
        <div className="p-12 text-center rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-900 space-y-4 shadow-xl">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              SkillForge AI is Synthesizing Your Roadmap...
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Analyzing role standards, evaluating skills gap matrix, and formulating verifiable
              capstone milestones. This takes ~3 seconds.
            </p>
          </div>
        </div>
      )}

      {/* Generated Result Display */}
      {result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Result Header */}
          <div className="p-6 sm:p-8 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/80 to-violet-50/50 dark:from-indigo-950/40 dark:to-violet-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="cyan" size="sm">
                  {targetRole}
                </Badge>
                <Badge variant="purple" size="sm">
                  Provider: {provider}
                </Badge>
                {result.isDemoFallback && (
                  <Badge variant="warning" size="sm">
                    Verified Fallback Engine
                  </Badge>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Roadmap Synthesized Successfully
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setResult(null)}
              >
                Re-Configure
              </Button>
              <Button
                variant="primary"
                size="md"
                isLoading={loading}
                onClick={handleSaveToDashboard}
                icon={savedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
                className="shadow-lg shadow-indigo-500/25"
              >
                {savedSuccess ? "Saved! Redirecting..." : "Save to My Dashboard"}
              </Button>
            </div>
          </div>

          {/* Skills Gap Analysis */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              <span>Skills Gap Diagnostics</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.skillsGapAnalysis.map((gap, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2"
                >
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-900 dark:text-white">{gap.skill}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {gap.currentLevel}% → {gap.targetLevel}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                      style={{ width: `${(gap.currentLevel / gap.targetLevel) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-300">Focus:</strong> {gap.recommendedFocus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones & Recommended Tasks */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-violet-500" />
              <span>Phased Learning Milestones</span>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {result.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {milestone.explanation}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="purple" size="sm">
                        {milestone.estimatedEffort}
                      </Badge>
                      <Badge
                        variant={milestone.priority === "high" ? "danger" : "default"}
                        size="sm"
                      >
                        {milestone.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Graduation Criterion:{" "}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {milestone.completionCriteria}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Suggested Actionable Tasks
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {milestone.suggestedTasks.map((task, tIdx) => (
                        <div
                          key={tIdx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Capstone Blueprint */}
          <div className="p-6 sm:p-8 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-slate-900 dark:to-indigo-950/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <FolderGit2 className="w-4 h-4" />
                <span>Recommended Portfolio Capstone</span>
              </div>
              <Badge variant="purple" size="sm">
                {result.portfolioProject.difficulty.toUpperCase()}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {result.portfolioProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {result.portfolioProject.architectureSummary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {result.portfolioProject.recommendedStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-indigo-200/60 dark:border-indigo-800/60 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Key Capstone Deliverables
              </span>
              <div className="flex flex-wrap gap-4 text-xs text-slate-700 dark:text-slate-300">
                {result.portfolioProject.keyDeliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
