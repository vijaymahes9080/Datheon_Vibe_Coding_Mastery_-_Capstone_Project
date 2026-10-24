"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DataStore, RoadmapItem, TaskItem } from "@/lib/store";
import {
  ArrowLeft,
  CheckCircle2,
  Edit3,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TaskManager } from "@/components/dashboard/TaskManager";

export default function RoadmapDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState<RoadmapItem | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    const allRoadmaps = await DataStore.getRoadmaps(user.id);
    const target = allRoadmaps.find((r) => r.id === id);
    if (!target) {
      router.push("/dashboard");
      return;
    }
    setRoadmap(target);
    setEditTitle(target.title);
    setEditDesc(target.description);

    const roadmapTasks = await DataStore.getTasks(user.id, target.id);
    setTasks(roadmapTasks);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user, id]);

  const handleToggleStatus = async () => {
    if (!user || !roadmap) return;
    const newStatus = roadmap.status === "active" ? "completed" : "active";
    setRoadmap({ ...roadmap, status: newStatus });
    // Update local storage
    const all = await DataStore.getRoadmaps(user.id);
    const updated = all.map((r) => (r.id === roadmap.id ? { ...r, status: newStatus } : r));
    localStorage.setItem("skillforge_local_roadmaps", JSON.stringify(updated));
  };

  const handleSaveEdit = async () => {
    if (!user || !roadmap) return;
    const updatedRoadmap = { ...roadmap, title: editTitle, description: editDesc };
    setRoadmap(updatedRoadmap);
    const all = await DataStore.getRoadmaps(user.id);
    const updated = all.map((r) => (r.id === roadmap.id ? updatedRoadmap : r));
    localStorage.setItem("skillforge_local_roadmaps", JSON.stringify(updated));
    setEditing(false);
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-500 font-semibold">Loading roadmap details...</p>
      </div>
    );
  }

  if (!roadmap) return null;

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Roadmaps</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleStatus}
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          >
            Mark as {roadmap.status === "active" ? "Completed" : "Active"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditing(!editing)}
            icon={<Edit3 className="w-4 h-4" />}
          >
            {editing ? "Cancel" : "Edit Info"}
          </Button>
        </div>
      </div>

      {/* Roadmap Header Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="cyan" size="sm">
                {roadmap.target_role}
              </Badge>
              <Badge variant={roadmap.status === "completed" ? "success" : "purple"} size="sm">
                {roadmap.status.toUpperCase()}
              </Badge>
              <span className="text-xs text-slate-400">
                Created on {new Date(roadmap.created_at).toLocaleDateString()}
              </span>
            </div>

            {editing ? (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-xl font-bold bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={3}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                />
                <Button size="sm" variant="primary" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {roadmap.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  {roadmap.description || "Structured learning curriculum and engineering capstone deliverables."}
                </p>
              </>
            )}
          </div>

          {/* Quick Progress Stats */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shrink-0 min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Progress</span>
              <TrendingUp className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-400">
                ({completedCount}/{tasks.length})
              </span>
            </div>
            <div className="mt-2 w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Task Manager Component */}
      <TaskManager
        roadmapId={roadmap.id}
        initialTasks={tasks}
        onTasksChange={loadData}
      />
    </div>
  );
}
