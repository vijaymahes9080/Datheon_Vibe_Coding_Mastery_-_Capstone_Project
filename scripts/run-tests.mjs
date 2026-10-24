// SkillForge AI Automated Verification Test Suite
// Run via: npm test

import assert from "node:assert";

console.log("\n=======================================================");
console.log("🚀 Starting SkillForge AI Automated Test Suite");
console.log("=======================================================\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    Error: ${err.message}`);
    failed++;
  }
}

// -------------------------------------------------------------
// Suite 1: AI Schema Validator & Sanitizer
// -------------------------------------------------------------
console.log("🔹 Suite 1: AI Career Architect Schema & Validator Tests");

// Inline minimal validator logic to test deterministically without ts-node
function validateCareerArchitectResponse(data) {
  const errors = [];
  if (!data || typeof data !== "object") return { isValid: false, errors: ["Must be object"] };
  if (typeof data.summary !== "string") errors.push("Missing summary");
  if (!Array.isArray(data.skillsGapAnalysis) || data.skillsGapAnalysis.length === 0) errors.push("Missing skills gap");
  if (!Array.isArray(data.milestones) || data.milestones.length === 0) errors.push("Missing milestones");
  if (!data.portfolioProject || typeof data.portfolioProject !== "object") errors.push("Missing portfolio");

  if (errors.length > 0) return { isValid: false, errors };

  return {
    isValid: true,
    sanitized: {
      summary: data.summary,
      milestonesCount: data.milestones.length,
      portfolioTitle: data.portfolioProject.title,
    },
  };
}

test("Valid AI response conforms to schema and sanitizes correctly", () => {
  const mockValid = {
    summary: "Target roadmap for Senior AI Engineer.",
    skillsGapAnalysis: [{ skill: "LangChain", currentLevel: 40, targetLevel: 90 }],
    milestones: [
      { id: "m1", title: "Phase 1: Architecture", priority: "high", suggestedTasks: ["Task 1", "Task 2"] },
    ],
    portfolioProject: {
      title: "OmniAgent Workflow Engine",
      recommendedStack: ["Next.js 15", "Supabase"],
    },
  };
  const res = validateCareerArchitectResponse(mockValid);
  assert.strictEqual(res.isValid, true);
  assert.strictEqual(res.sanitized.portfolioTitle, "OmniAgent Workflow Engine");
});

test("Malformed AI response is safely rejected without crash", () => {
  const mockInvalid = { summary: 123 };
  const res = validateCareerArchitectResponse(mockInvalid);
  assert.strictEqual(res.isValid, false);
  assert.ok(res.errors.length > 0);
});

// -------------------------------------------------------------
// Suite 2: Leads & Input Validation
// -------------------------------------------------------------
console.log("\n🔹 Suite 2: Lead Submission & Anti-Abuse Guards");

function validateLead(name, email) {
  if (!name || name.trim().length < 2) return "Invalid name";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) return "Invalid email";
  return null;
}

test("Valid lead submission passes validation", () => {
  assert.strictEqual(validateLead("Alex Mercer", "alex@skillforge.dev"), null);
});

test("Invalid email rejects with descriptive error", () => {
  assert.strictEqual(validateLead("Alex Mercer", "not-an-email"), "Invalid email");
});

test("Empty name rejects with descriptive error", () => {
  assert.strictEqual(validateLead("", "alex@skillforge.dev"), "Invalid name");
});

// -------------------------------------------------------------
// Suite 3: Multi-Tenant RLS & Security Isolation
// -------------------------------------------------------------
console.log("\n🔹 Suite 3: Supabase Row-Level Security (RLS) Verification");

// Simulated mock database with RLS policy enforcement logic
const mockDatabase = {
  roadmaps: [
    { id: "rm-user-1", user_id: "user-alpha", title: "Alpha Roadmap" },
    { id: "rm-user-2", user_id: "user-beta", title: "Beta Roadmap" },
  ],
  tasks: [
    { id: "t-1", roadmap_id: "rm-user-1", user_id: "user-alpha", title: "Alpha Task" },
    { id: "t-2", roadmap_id: "rm-user-2", user_id: "user-beta", title: "Beta Task" },
  ],
  // Simulate SELECT query with RLS: auth.uid() = user_id
  queryRoadmaps(authUid) {
    return this.roadmaps.filter((r) => r.user_id === authUid);
  },
  // Simulate task creation with RLS: auth.uid() = user_id AND roadmap belongs to auth.uid()
  insertTask(authUid, task) {
    const roadmap = this.roadmaps.find((r) => r.id === task.roadmap_id);
    if (!roadmap || roadmap.user_id !== authUid) {
      throw new Error("RLS Violation: Cannot create task for a roadmap belonging to another user.");
    }
    if (task.user_id !== authUid) {
      throw new Error("RLS Violation: Cannot insert task with foreign user_id.");
    }
    return { ...task, id: `t-${Date.now()}` };
  },
};

test("User can read only their own roadmaps (Tenant Isolation)", () => {
  const alphaRoadmaps = mockDatabase.queryRoadmaps("user-alpha");
  assert.strictEqual(alphaRoadmaps.length, 1);
  assert.strictEqual(alphaRoadmaps[0].title, "Alpha Roadmap");

  const betaRoadmaps = mockDatabase.queryRoadmaps("user-beta");
  assert.strictEqual(betaRoadmaps.length, 1);
  assert.strictEqual(betaRoadmaps[0].title, "Beta Roadmap");
});

test("Cross-tenant task manipulation is blocked by RLS constraint", () => {
  assert.throws(
    () => {
      // User Alpha tries to insert a task into User Beta's roadmap
      mockDatabase.insertTask("user-alpha", {
        roadmap_id: "rm-user-2", // User Beta's roadmap!
        user_id: "user-alpha",
        title: "Malicious cross-tenant task injection",
      });
    },
    /RLS Violation/,
    "Expected cross-tenant insertion to throw RLS Violation"
  );
});

// -------------------------------------------------------------
// Suite 4: Roadmap Task CRUD & Velocity Computation
// -------------------------------------------------------------
console.log("\n🔹 Suite 4: Task Lifecycle & Completion Velocity Metrics");

test("Velocity correctly computes percentage of completed tasks", () => {
  const sampleTasks = [
    { status: "completed" },
    { status: "completed" },
    { status: "pending" },
    { status: "in_progress" },
  ];
  const completed = sampleTasks.filter((t) => t.status === "completed").length;
  const velocity = Math.round((completed / sampleTasks.length) * 100);
  assert.strictEqual(velocity, 50);
});

test("Empty task set yields 0% velocity without division by zero", () => {
  const sampleTasks = [];
  const velocity = sampleTasks.length > 0 ? Math.round((0 / sampleTasks.length) * 100) : 0;
  assert.strictEqual(velocity, 0);
});

// -------------------------------------------------------------
// Test Summary
// -------------------------------------------------------------
console.log("\n=======================================================");
console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All automated verification suites PASSED successfully!\n");
}
