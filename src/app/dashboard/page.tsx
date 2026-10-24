"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { DataStore, RoadmapItem } from "@/lib/store";
import {
  Sparkles,
  Plus,
  Compass,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trash2,
  TrendingUp,
  Target,
  FolderGit2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { CreateRoadmapModal } from "@/components/dashboard/CreateRoadmapModal";

export default function DashboardPage() {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState<RoadmapItem[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRoadmaps = async () => {
    if (!user) return;
    setLoading(true);
    const data = await DataStore.getRoadmaps(user.id);
    setRoadmaps(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoadmaps();
  }, [user]);

  const handleCreate = async (
    newRoadmapData: Omit<RoadmapItem, "id" | "user_id" | "created_at" | "updated_at" | "tasks_count" | "completed_tasks_count">
  ) => {
    if (!user) return;
    await DataStore.createRoadmap(user.id, newRoadmapData);
    await fetchRoadmaps();
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) return;
    if (confirm("Are you sure you want to delete this roadmap and its tasks?")) {
      await DataStore.deleteRoadmap(user.id, id);
      await fetchRoadmaps();
    }
  };

  const filteredRoadmaps = roadmaps.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const totalTasks = roadmaps.reduce((acc, r) => acc + (r.tasks_count || 0), 0);
  const totalCompleted = roadmaps.reduce((acc, r) => acc + (r.completed_tasks_count || 0), 0);
  const overallVelocity = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/80 via-white to-violet-50/60 dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="purple" size="sm">
                Engineering Workspace
              </Badge>
              <span className="text-xs text-slate-400 font-medium">
                {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, <span className="gradient-text">{user?.display_name || "Engineer"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Track your career milestone progression, update your daily technical tasks, or
              synthesize a brand-new role-specific roadmap with the AI Career Architect.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/ai-architect">
              <Button
                variant="primary"
                size="md"
                icon={<Sparkles className="w-4 h-4" />}
                className="shadow-lg shadow-indigo-500/20"
              >
                AI Career Architect
              </Button>
            </Link>
            <Button
              variant="outline"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsCreateOpen(true)}
            >
              New Roadmap
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Active Roadmaps</span>
            <Layers className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {roadmaps.filter((r) => r.status === "active").length}
            </span>
            <span className="text-xs text-slate-400">trackers</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {totalCompleted}
            </span>
            <span className="text-xs text-slate-400">of {totalTasks} total</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Overall Velocity</span>
            <TrendingUp className="w-4 h-4 text-violet-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {overallVelocity}%
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              On Schedule
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Portfolio Capstone</span>
            <FolderGit2 className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              In Progress
            </span>
          </div>
        </div>
      </div>

      {/* Roadmaps Collection Section */}
      <div className="space-y-4">
        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Your Career Roadmaps</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {filteredRoadmaps.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any roadmap to manage tasks, milestones, and deliverables.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800 self-start sm:self-auto">
            {(["all", "active", "completed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmaps Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800/50 animate-pulse border border-slate-300/50 dark:border-slate-800"
              />
            ))}
          </div>
        ) : filteredRoadmaps.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 space-y-4">
            <Compass className="w-12 h-12 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No roadmaps found in this view
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Generate your personalized roadmap with the AI Career Architect or create a custom one manually.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Link href="/dashboard/ai-architect">
                <Button size="sm" variant="primary" icon={<Sparkles className="w-4 h-4" />}>
                  Launch AI Architect
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={() => setIsCreateOpen(true)}>
                Create Custom
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoadmaps.map((roadmap) => {
              const progress =
                roadmap.tasks_count > 0
                  ? Math.round((roadmap.completed_tasks_count / roadmap.tasks_count) * 100)
                  : 0;

              return (
                <Link
                  key={roadmap.id}
                  href={`/dashboard/roadmaps/${roadmap.id}`}
                  className="group block"
                >
                  <Card
                    glow
                    className="h-full flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <Badge variant="cyan" size="sm">
                          {roadmap.target_role}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={roadmap.status === "completed" ? "success" : "purple"}
                            size="sm"
                          >
                            {roadmap.status.toUpperCase()}
                          </Badge>
                          <button
                            onClick={(e) => handleDelete(e, roadmap.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Delete roadmap"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <CardTitle className="text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {roadmap.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {roadmap.description || "Structured learning milestones and project roadmap."}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Progress Bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">
                            Milestone Completion
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span>{roadmap.milestones_count || 3} Milestones</span>
                        <span>
                          {roadmap.completed_tasks_count}/{roadmap.tasks_count} Tasks Done
                        </span>
                      </div>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Tasks <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <CreateRoadmapModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
