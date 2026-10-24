// SkillForge AI Career Architect Schemas

export interface CareerArchitectInput {
  currentSkills: string[];
  targetRole: string;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  weeklyHours: number;
  projectInterests?: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  explanation: string;
  priority: "high" | "medium" | "low";
  estimatedEffort: string;
  completionCriteria: string;
  suggestedTasks: string[];
}

export interface PortfolioProjectIdea {
  title: string;
  architectureSummary: string;
  recommendedStack: string[];
  keyDeliverables: string[];
  difficulty: "intermediate" | "advanced";
}

export interface SkillGapItem {
  skill: string;
  currentLevel: number; // 0-100
  targetLevel: number; // 0-100
  category: "core" | "tooling" | "architecture" | "soft_skills";
  recommendedFocus: string;
}

export interface CareerArchitectResponse {
  summary: string;
  skillsGapAnalysis: SkillGapItem[];
  milestones: MilestoneItem[];
  portfolioProject: PortfolioProjectIdea;
  actionableWeeklyTasks: {
    week: number;
    title: string;
    tasks: string[];
  }[];
  potentialChallenges: string[];
  suggestedCompletionCriteria: string[];
  isDemoFallback?: boolean;
}

/**
 * Validates raw LLM JSON output to ensure all required fields conform to schema
 */
export function validateCareerArchitectResponse(data: any): {
  isValid: boolean;
  sanitized?: CareerArchitectResponse;
  errors?: string[];
} {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return { isValid: false, errors: ["AI response must be a JSON object."] };
  }

  if (typeof data.summary !== "string") {
    errors.push("Missing or invalid summary.");
  }

  if (!Array.isArray(data.skillsGapAnalysis) || data.skillsGapAnalysis.length === 0) {
    errors.push("Missing or invalid skillsGapAnalysis array.");
  }

  if (!Array.isArray(data.milestones) || data.milestones.length === 0) {
    errors.push("Missing or invalid milestones array.");
  }

  if (!data.portfolioProject || typeof data.portfolioProject !== "object") {
    errors.push("Missing portfolioProject object.");
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize and return safely formatted object
  const sanitized: CareerArchitectResponse = {
    summary: String(data.summary || ""),
    skillsGapAnalysis: (data.skillsGapAnalysis || []).map((item: any) => ({
      skill: String(item.skill || "Technical Skill"),
      currentLevel: Math.min(100, Math.max(0, Number(item.currentLevel) || 40)),
      targetLevel: Math.min(100, Math.max(0, Number(item.targetLevel) || 90)),
      category: item.category || "core",
      recommendedFocus: String(item.recommendedFocus || "Hands-on project application"),
    })),
    milestones: (data.milestones || []).map((m: any, idx: number) => ({
      id: m.id || `m_${idx + 1}`,
      title: String(m.title || `Phase ${idx + 1} Milestone`),
      explanation: String(m.explanation || ""),
      priority: ["high", "medium", "low"].includes(m.priority) ? m.priority : "high",
      estimatedEffort: String(m.estimatedEffort || "2-3 Weeks"),
      completionCriteria: String(m.completionCriteria || "Deploy working demonstration"),
      suggestedTasks: Array.isArray(m.suggestedTasks)
        ? m.suggestedTasks.map((t: any) => String(t))
        : [],
    })),
    portfolioProject: {
      title: String(data.portfolioProject.title || "Production Portfolio Capstone"),
      architectureSummary: String(data.portfolioProject.architectureSummary || ""),
      recommendedStack: Array.isArray(data.portfolioProject.recommendedStack)
        ? data.portfolioProject.recommendedStack.map((s: any) => String(s))
        : ["TypeScript", "Next.js 15", "Supabase"],
      keyDeliverables: Array.isArray(data.portfolioProject.keyDeliverables)
        ? data.portfolioProject.keyDeliverables.map((d: any) => String(d))
        : ["Live URL", "Architecture Diagram", "Test Suite"],
      difficulty: data.portfolioProject.difficulty === "intermediate" ? "intermediate" : "advanced",
    },
    actionableWeeklyTasks: Array.isArray(data.actionableWeeklyTasks)
      ? data.actionableWeeklyTasks.map((w: any, idx: number) => ({
          week: Number(w.week) || idx + 1,
          title: String(w.title || `Week ${idx + 1} Execution`),
          tasks: Array.isArray(w.tasks) ? w.tasks.map((t: any) => String(t)) : [],
        }))
      : [],
    potentialChallenges: Array.isArray(data.potentialChallenges)
      ? data.potentialChallenges.map((c: any) => String(c))
      : ["Context switching", "Over-engineering MVP architecture"],
    suggestedCompletionCriteria: Array.isArray(data.suggestedCompletionCriteria)
      ? data.suggestedCompletionCriteria.map((c: any) => String(c))
      : ["Complete all milestone tasks", "Deploy portfolio capstone to live production"],
    isDemoFallback: Boolean(data.isDemoFallback),
  };

  return { isValid: true, sanitized };
}
