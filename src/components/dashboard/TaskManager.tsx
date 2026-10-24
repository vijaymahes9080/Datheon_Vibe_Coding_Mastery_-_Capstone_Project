"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DataStore, TaskItem } from "@/lib/store";
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  CheckSquare,
  Clock,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

interface TaskManagerProps {
  roadmapId: string;
  initialTasks: TaskItem[];
  onTasksChange: () => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  roadmapId,
  initialTasks,
  onTasksChange,
}) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all");
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium");
  const [newDueDate, setNewDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state if props change
  React.useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleToggleTask = async (task: TaskItem) => {
    if (!user) return;
    const nextStatus = task.status === "completed" ? "pending" : "completed";

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
    );

    try {
      await DataStore.updateTaskStatus(user.id, task.id, nextStatus);
      onTasksChange();
    } catch (e) {
      // Revert if error
      setTasks(initialTasks);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTitle.trim()) return;

    setLoading(true);
    setError(null);
    try {
      await DataStore.createTask(user.id, {
        roadmap_id: roadmapId,
        title: newTitle.trim(),
        description: newDesc.trim(),
        priority: newPriority,
        status: "pending",
        due_date: newDueDate ? new Date(newDueDate).toISOString() : null,
      });

      setNewTitle("");
      setNewDesc("");
      setNewDueDate("");
      setIsAdding(false);
      onTasksChange();
    } catch (err: any) {
      setError(err.message || "Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    await DataStore.deleteTask(user.id, taskId);
    onTasksChange();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Roadmap Tasks & Action Items ({tasks.length})
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800 text-xs">
            {(["all", "pending", "in_progress", "completed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg font-medium capitalize cursor-pointer transition-colors ${
                  filter === tab
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab === "in_progress" ? "In Progress" : tab}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsAdding(!isAdding)}
            icon={<Plus className="w-4 h-4" />}
          >
            {isAdding ? "Cancel" : "Add Task"}
          </Button>
        </div>
      </div>

      {/* Add Task Form (Collapsible) */}
      {isAdding && (
        <form
          onSubmit={handleCreateTask}
          className="p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Create New Roadmap Task
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
              Milestone Deliverable
            </span>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Task Title"
              placeholder="e.g. Implement hybrid vector search with BM25"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Priority
              </label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Task Details / Completion Criteria (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Explain technical acceptance criteria or reference links..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-end justify-between gap-4 pt-1">
            <div className="w-full sm:w-auto">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" variant="primary" isLoading={loading}>
                Save Task
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
          <p className="text-xs text-slate-500 font-semibold">
            No tasks found in this view. Click &quot;Add Task&quot; above to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isDone = task.status === "completed";
            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                  isDone
                    ? "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40 opacity-75"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/40"
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    onClick={() => handleToggleTask(task)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors shrink-0"
                    title={isDone ? "Mark as pending" : "Mark as completed"}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-indigo-500" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-sm font-semibold transition-all ${
                          isDone
                            ? "line-through text-slate-400 dark:text-slate-500"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {task.title}
                      </span>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "danger"
                            : task.priority === "medium"
                            ? "warning"
                            : "default"
                        }
                        size="sm"
                      >
                        {task.priority.toUpperCase()}
                      </Badge>
                      {task.due_date && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p
                        className={`text-xs leading-relaxed ${
                          isDone
                            ? "text-slate-400 dark:text-slate-600"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
