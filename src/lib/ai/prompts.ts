import { CareerArchitectInput, CareerArchitectResponse } from "./schema";

export function buildCareerArchitectPrompt(input: CareerArchitectInput): string {
  return `You are SkillForge AI Career Architect, an expert technical mentor, principal engineer, and engineering hiring manager.
Your role is to formulate a structured, fluff-free, and actionable engineering roadmap tailored strictly to the candidate's background.

Candidate Input:
- Current Technical Skills: ${input.currentSkills.join(", ")}
- Target Engineering Role: ${input.targetRole}
- Experience Level: ${input.experienceLevel}
- Available Learning Commitment: ${input.weeklyHours} hours per week
- Project Interests / Industry Domain: ${input.projectInterests || "High-Scale Modern Web & AI"}

CRITICAL INSTRUCTIONS:
1. Do not output conversational filler, markdown commentary, or introductory text.
2. Return ONLY a valid, single JSON object adhering strictly to the schema below.
3. Every milestone must have concrete completion criteria and 2-4 granular tasks.
4. The portfolio capstone project must be an ambitious, production-grade application that solves a real technical challenge (avoid basic todo apps, weather apps, or generic clones).
5. Never represent recommendations as guaranteed hiring predictions or guaranteed employment.

Required JSON Schema:
{
  "summary": "Concise 2-sentence executive summary of the target role gap analysis and estimated ramp-up timeline.",
  "skillsGapAnalysis": [
    {
      "skill": "Specific technology or paradigm",
      "currentLevel": 45,
      "targetLevel": 90,
      "category": "core" | "tooling" | "architecture" | "soft_skills",
      "recommendedFocus": "Specific aspect to practice"
    }
  ],
  "milestones": [
    {
      "id": "m1",
      "title": "Phase title",
      "explanation": "Why this phase is essential",
      "priority": "high" | "medium" | "low",
      "estimatedEffort": "e.g. 3 Weeks (10 hrs/wk)",
      "completionCriteria": "Verifiable proof of mastery",
      "suggestedTasks": ["Task 1", "Task 2", "Task 3"]
    }
  ],
  "portfolioProject": {
    "title": "Capstone project name",
    "architectureSummary": "High-level system design explanation",
    "recommendedStack": ["Tech 1", "Tech 2", "Tech 3"],
    "keyDeliverables": ["Deliverable 1", "Deliverable 2"],
    "difficulty": "intermediate" | "advanced"
  },
  "actionableWeeklyTasks": [
    {
      "week": 1,
      "title": "Weekly focus theme",
      "tasks": ["Weekly task A", "Weekly task B"]
    }
  ],
  "potentialChallenges": ["Challenge 1", "Challenge 2"],
  "suggestedCompletionCriteria": ["Criterion 1", "Criterion 2"]
}`;
}

/**
 * High-quality deterministic fallback response when no live AI API key is configured.
 * Clearly labeled as demo fallback per prompt specifications.
 */
export function getDemoFallbackResponse(input: CareerArchitectInput): CareerArchitectResponse {
  return {
    summary: `Comprehensive career acceleration roadmap targeting ${input.targetRole}. Synthesized for an estimated ${Math.round(60 / (input.weeklyHours || 10))} weeks at ${input.weeklyHours || 10} hours/week commitment.`,
    isDemoFallback: true,
    skillsGapAnalysis: [
      {
        skill: input.currentSkills[0] || "Core Fundamentals",
        currentLevel: input.experienceLevel === "beginner" ? 30 : input.experienceLevel === "intermediate" ? 60 : 80,
        targetLevel: 95,
        category: "core",
        recommendedFocus: "Production performance, memory safety, and clean architecture patterns",
      },
      {
        skill: "Next.js 15 App Router & Server Components",
        currentLevel: 45,
        targetLevel: 90,
        category: "core",
        recommendedFocus: "Streaming SSR, Suspense boundaries, and Server Actions",
      },
      {
        skill: "Supabase PostgreSQL & Row-Level Security (RLS)",
        currentLevel: 40,
        targetLevel: 85,
        category: "architecture",
        recommendedFocus: "Multi-tenant authorization, foreign-key indexing, and sub-10ms query execution",
      },
      {
        skill: "LLM Orchestration & Structured Schema Output",
        currentLevel: 35,
        targetLevel: 90,
        category: "tooling",
        recommendedFocus: "Prompt engineering, Zod schema validation, and fallback provider adapters",
      },
    ],
    milestones: [
      {
        id: "m_1",
        title: "Phase 1: Production Architectural Foundations",
        explanation: "Master modern full-stack web architecture, TypeScript strict typing, and automated testing.",
        priority: "high",
        estimatedEffort: "3 Weeks",
        completionCriteria: "Production build passing with zero type or lint errors and 90%+ test coverage.",
        suggestedTasks: [
          "Scaffold Next.js 15 App Router with Turbopack and strict TypeScript",
          "Configure Tailwind CSS design tokens with persistent theme switcher",
          "Implement Zod input schema validation on server endpoints",
        ],
      },
      {
        id: "m_2",
        title: "Phase 2: Database Security & Multi-Tenant Authorization",
        explanation: "Build enterprise data integrity using Supabase PostgreSQL and Row-Level Security.",
        priority: "high",
        estimatedEffort: "3 Weeks",
        completionCriteria: "Pass automated RLS cross-tenant penetration tests with 100% tenant isolation.",
        suggestedTasks: [
          "Author version-controlled SQL migrations for user profiles, roadmaps, and tasks",
          "Implement strict RLS policies restricting cross-tenant reads and mutations",
          "Integrate isomorphic Supabase SSR cookie session handling",
        ],
      },
      {
        id: "m_3",
        title: "Phase 3: AI Orchestration & Autonomous Tool Calling",
        explanation: "Incorporate intelligent LLM agent reasoning loops and real-time streaming interfaces.",
        priority: "high",
        estimatedEffort: "4 Weeks",
        completionCriteria: "Deploy working AI Career Architect with sub-2s streaming response latency.",
        suggestedTasks: [
          "Connect multi-provider LLM adapter with Google Gemini and OpenAI fallbacks",
          "Implement server-side rate-limiting and abuse mitigation guards",
          "Build interactive multi-step generator wizard with 1-click roadmap persistence",
        ],
      },
    ],
    portfolioProject: {
      title: `${input.targetRole} Enterprise Capstone Platform`,
      architectureSummary:
        "A full-stack, multi-tenant cloud application demonstrating modern Next.js 15 SSR, Supabase RLS security, and real-time AI generation.",
      recommendedStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase PostgreSQL", "Gemini 1.5/2.0", "Vercel"],
      keyDeliverables: [
        "Live publicly accessible production URL on Vercel",
        "Documented architecture and database schema diagrams",
        "Automated GitHub Actions CI/CD test gates",
      ],
      difficulty: "advanced",
    },
    actionableWeeklyTasks: [
      {
        week: 1,
        title: "System Architecture Scaffolding",
        tasks: [
          "Initialize repository and configure strict TypeScript compiler options",
          "Build responsive marketing landing page with interactive preview widget",
        ],
      },
      {
        week: 2,
        title: "Database Modeling & Authorization",
        tasks: [
          "Deploy Supabase migration scripts for profiles and roadmaps tables",
          "Write unit tests verifying unauthorized users cannot query foreign tenant records",
        ],
      },
      {
        week: 3,
        title: "AI Pipeline & Capstone Launch",
        tasks: [
          "Implement protected /api/ai/architect route with output validation",
          "Deploy to Vercel and publish technical documentation",
        ],
      },
    ],
    potentialChallenges: [
      "Balancing complex feature ambitions with ship velocity",
      "Avoiding tutorial hell by writing code from scratch",
      "Managing rate-limiting quotas on free-tier LLM endpoints",
    ],
    suggestedCompletionCriteria: [
      "Ship all 3 milestone phases with verified task check-offs",
      "Deploy portfolio capstone to a public URL with HTTPS",
      "Record a 2-minute technical walkthrough video for LinkedIn and GitHub",
    ],
  };
}
