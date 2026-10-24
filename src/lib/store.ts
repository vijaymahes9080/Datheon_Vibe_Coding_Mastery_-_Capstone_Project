import { createClient } from "./supabase/client";

export interface RoadmapItem {
  id: string;
  user_id: string;
  title: string;
  target_role: string;
  description: string;
  status: "active" | "completed" | "archived";
  milestones_count: number;
  tasks_count: number;
  completed_tasks_count: number;
  created_at: string;
  updated_at: string;
}

export interface TaskItem {
  id: string;
  roadmap_id: string;
  user_id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  due_date?: string | null;
  created_at: string;
  updated_at: string;
}

const LOCAL_ROADMAPS_KEY = "skillforge_local_roadmaps";
const LOCAL_TASKS_KEY = "skillforge_local_tasks";

const INITIAL_DEMO_ROADMAPS: RoadmapItem[] = [
  {
    id: "rm-ai-01",
    user_id: "demo-engineer-001",
    title: "AI Engineer & Agent Architect Mastery",
    target_role: "Senior AI SaaS Engineer",
    description: "End-to-end curriculum from prompt engineering to LangGraph agent state machines and RAG retrieval pipelines.",
    status: "active",
    milestones_count: 3,
    tasks_count: 6,
    completed_tasks_count: 4,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "rm-fs-02",
    user_id: "demo-engineer-001",
    title: "Modern Next.js 15 & Supabase Production Stack",
    target_role: "Full-Stack Web Engineer",
    description: "Production architectural mastery covering Server Components, Server Actions, PostgreSQL RLS, and Vercel edge deployment.",
    status: "active",
    milestones_count: 2,
    tasks_count: 4,
    completed_tasks_count: 2,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const INITIAL_DEMO_TASKS: TaskItem[] = [
  {
    id: "task-01",
    roadmap_id: "rm-ai-01",
    user_id: "demo-engineer-001",
    title: "Master OpenAI & Gemini structured JSON outputs with Zod",
    description: "Ensure zero hallucinated fields by enforcing strict output schemas and error fallbacks.",
    priority: "high",
    status: "completed",
    due_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-02",
    roadmap_id: "rm-ai-01",
    user_id: "demo-engineer-001",
    title: "Implement ReAct agent reasoning loop with tool calling",
    description: "Equip the model with calculator, web search, and SQL querying capabilities.",
    priority: "high",
    status: "completed",
    due_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-03",
    roadmap_id: "rm-ai-01",
    user_id: "demo-engineer-001",
    title: "Build hybrid dense & sparse vector search pipeline",
    description: "Combine BM25 keyword matching with OpenAI text-embedding-3-small embeddings.",
    priority: "high",
    status: "completed",
    due_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-04",
    roadmap_id: "rm-ai-01",
    user_id: "demo-engineer-001",
    title: "Configure cross-encoder reranking with Cohere API",
    description: "Refine initial top-20 document retrieval down to the top-5 most relevant chunks.",
    priority: "medium",
    status: "completed",
    due_date: new Date(Date.now() + 2 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-05",
    roadmap_id: "rm-ai-01",
    user_id: "demo-engineer-001",
    title: "Deploy end-to-end evaluation harness with RAGAS metrics",
    description: "Measure context recall, faithfulness, and answer relevance on a benchmark test set.",
    priority: "high",
    status: "in_progress",
    due_date: new Date(Date.now() + 5 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-06",
    roadmap_id: "rm-ai-01",
    user_id: "demo-engineer-001",
    title: "Benchmark latency and token cost across Gemini Flash vs Claude 3.5 Sonnet",
    description: "Document trade-offs in architecture documentation for technical hiring managers.",
    priority: "medium",
    status: "pending",
    due_date: new Date(Date.now() + 8 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-07",
    roadmap_id: "rm-fs-02",
    user_id: "demo-engineer-001",
    title: "Implement Supabase Row-Level Security policies for multi-tenant data",
    description: "Verify policies using automated test queries to prevent any cross-tenant data leaks.",
    priority: "high",
    status: "completed",
    due_date: new Date(Date.now() - 3 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-08",
    roadmap_id: "rm-fs-02",
    user_id: "demo-engineer-001",
    title: "Integrate Server Actions with optimistic UI updates in React 19",
    description: "Use useOptimistic for instant user feedback with seamless rollback handling.",
    priority: "high",
    status: "completed",
    due_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-09",
    roadmap_id: "rm-fs-02",
    user_id: "demo-engineer-001",
    title: "Configure GitHub Actions CI/CD pipeline for automated test gates",
    description: "Run TypeScript checks, ESLint, and Playwright tests on every PR.",
    priority: "medium",
    status: "in_progress",
    due_date: new Date(Date.now() + 4 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "task-10",
    roadmap_id: "rm-fs-02",
    user_id: "demo-engineer-001",
    title: "Publish production deployment to Vercel with custom domain & SSL",
    description: "Ensure Lighthouse score is >95 across Performance, Accessibility, and Best Practices.",
    priority: "low",
    status: "pending",
    due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DataStore = {
  getRoadmaps: async (userId: string): Promise<RoadmapItem[]> => {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("roadmaps")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return data as RoadmapItem[];
      }
    }

    // Local storage fallback
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_ROADMAPS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
      localStorage.setItem(LOCAL_ROADMAPS_KEY, JSON.stringify(INITIAL_DEMO_ROADMAPS));
    }
    return INITIAL_DEMO_ROADMAPS;
  },

  createRoadmap: async (
    userId: string,
    roadmap: Omit<RoadmapItem, "id" | "user_id" | "created_at" | "updated_at" | "tasks_count" | "completed_tasks_count">
  ): Promise<RoadmapItem> => {
    const supabase = createClient();
    const newRoadmap: RoadmapItem = {
      ...roadmap,
      id: `rm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user_id: userId,
      tasks_count: 0,
      completed_tasks_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase
        .from("roadmaps")
        .insert({
          user_id: userId,
          title: roadmap.title,
          target_role: roadmap.target_role,
          description: roadmap.description,
          status: roadmap.status,
          milestones_count: roadmap.milestones_count,
        })
        .select()
        .single();
      if (!error && data) {
        return data as RoadmapItem;
      }
    }

    if (typeof window !== "undefined") {
      const existing = await DataStore.getRoadmaps(userId);
      const updated = [newRoadmap, ...existing];
      localStorage.setItem(LOCAL_ROADMAPS_KEY, JSON.stringify(updated));
    }
    return newRoadmap;
  },

  deleteRoadmap: async (userId: string, roadmapId: string): Promise<void> => {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("roadmaps").delete().eq("id", roadmapId);
    }
    if (typeof window !== "undefined") {
      const existing = await DataStore.getRoadmaps(userId);
      const updated = existing.filter((r) => r.id !== roadmapId);
      localStorage.setItem(LOCAL_ROADMAPS_KEY, JSON.stringify(updated));

      // Also clean up tasks
      const allTasks = await DataStore.getTasks(userId);
      const remainingTasks = allTasks.filter((t) => t.roadmap_id !== roadmapId);
      localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(remainingTasks));
    }
  },

  getTasks: async (userId: string, roadmapId?: string): Promise<TaskItem[]> => {
    const supabase = createClient();
    if (supabase) {
      let query = supabase.from("roadmap_tasks").select("*").order("created_at", { ascending: false });
      if (roadmapId) {
        query = query.eq("roadmap_id", roadmapId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as TaskItem[];
      }
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_TASKS_KEY);
      let list: TaskItem[] = INITIAL_DEMO_TASKS;
      if (saved) {
        try {
          list = JSON.parse(saved);
        } catch (e) {}
      } else {
        localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(INITIAL_DEMO_TASKS));
      }

      if (roadmapId) {
        return list.filter((t) => t.roadmap_id === roadmapId);
      }
      return list;
    }
    return INITIAL_DEMO_TASKS;
  },

  createTask: async (
    userId: string,
    task: Omit<TaskItem, "id" | "user_id" | "created_at" | "updated_at">
  ): Promise<TaskItem> => {
    const supabase = createClient();
    const newTask: TaskItem = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase
        .from("roadmap_tasks")
        .insert({
          roadmap_id: task.roadmap_id,
          user_id: userId,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          due_date: task.due_date,
        })
        .select()
        .single();
      if (!error && data) {
        return data as TaskItem;
      }
    }

    if (typeof window !== "undefined") {
      const allTasks = await DataStore.getTasks(userId);
      const updated = [newTask, ...allTasks];
      localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(updated));

      // Update roadmap counts
      await DataStore.syncRoadmapCounts(userId, task.roadmap_id);
    }
    return newTask;
  },

  updateTaskStatus: async (
    userId: string,
    taskId: string,
    status: "pending" | "in_progress" | "completed"
  ): Promise<void> => {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("roadmap_tasks").update({ status }).eq("id", taskId);
    }
    if (typeof window !== "undefined") {
      const allTasks = await DataStore.getTasks(userId);
      let targetRoadmapId: string | null = null;
      const updated = allTasks.map((t) => {
        if (t.id === taskId) {
          targetRoadmapId = t.roadmap_id;
          return { ...t, status, updated_at: new Date().toISOString() };
        }
        return t;
      });
      localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(updated));

      if (targetRoadmapId) {
        await DataStore.syncRoadmapCounts(userId, targetRoadmapId);
      }
    }
  },

  deleteTask: async (userId: string, taskId: string): Promise<void> => {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("roadmap_tasks").delete().eq("id", taskId);
    }
    if (typeof window !== "undefined") {
      const allTasks = await DataStore.getTasks(userId);
      const taskToDelete = allTasks.find((t) => t.id === taskId);
      const updated = allTasks.filter((t) => t.id !== taskId);
      localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(updated));

      if (taskToDelete) {
        await DataStore.syncRoadmapCounts(userId, taskToDelete.roadmap_id);
      }
    }
  },

  syncRoadmapCounts: async (userId: string, roadmapId: string): Promise<void> => {
    if (typeof window === "undefined") return;
    const tasks = await DataStore.getTasks(userId, roadmapId);
    const roadmaps = await DataStore.getRoadmaps(userId);

    const updatedRoadmaps = roadmaps.map((r) => {
      if (r.id === roadmapId) {
        const completed = tasks.filter((t) => t.status === "completed").length;
        return {
          ...r,
          tasks_count: tasks.length,
          completed_tasks_count: completed,
          updated_at: new Date().toISOString(),
        };
      }
      return r;
    });

    localStorage.setItem(LOCAL_ROADMAPS_KEY, JSON.stringify(updatedRoadmaps));
  },
};
