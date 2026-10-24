"use client";

import React, { useState } from "react";
import { X, Sparkles, Target, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RoadmapItem } from "@/lib/store";

interface CreateRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (roadmap: Omit<RoadmapItem, "id" | "user_id" | "created_at" | "updated_at" | "tasks_count" | "completed_tasks_count">) => Promise<void>;
}

export const CreateRoadmapModal: React.FC<CreateRoadmapModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [description, setDescription] = useState("");
  const [milestonesCount, setMilestonesCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please provide a roadmap title.");
      return;
    }
    if (!targetRole.trim()) {
      setError("Target role is required.");
      return;
    }

    setLoading(true);
    try {
      await onCreate({
        title: title.trim(),
        target_role: targetRole.trim(),
        description: description.trim(),
        status: "active",
        milestones_count: Number(milestonesCount) || 3,
      });
      setTitle("");
      setTargetRole("");
      setDescription("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 p-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-1">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create Custom Career Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Define your own personalized milestones and track custom deliverables.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Roadmap Title"
            placeholder="e.g. Distributed Cloud & Kubernetes Mastery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            label="Target Engineering Role"
            placeholder="e.g. Site Reliability Engineer / DevOps Lead"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            icon={<Target className="w-4 h-4" />}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Description / Core Objectives
            </label>
            <textarea
              rows={3}
              placeholder="Outline the core concepts, project deliverables, and learning outcomes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Estimated Milestones
            </label>
            <select
              value={milestonesCount}
              onChange={(e) => setMilestonesCount(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value={2}>2 Milestones (4-6 Weeks Sprint)</option>
              <option value={3}>3 Milestones (8-10 Weeks Comprehensive)</option>
              <option value={4}>4 Milestones (12-14 Weeks Deep Mastery)</option>
              <option value={5}>5 Milestones (Full Career Transition)</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Create Roadmap
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
