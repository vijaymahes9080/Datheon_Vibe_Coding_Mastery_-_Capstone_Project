import { NextRequest, NextResponse } from "next/server";
import {
  CareerArchitectInput,
  validateCareerArchitectResponse,
} from "@/lib/ai/schema";
import {
  buildCareerArchitectPrompt,
  getDemoFallbackResponse,
} from "@/lib/ai/prompts";

// Simple IP-based rate limiting
const aiRateLimitMap = new Map<string, { count: number; lastReset: number }>();
const AI_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const AI_MAX_REQUESTS_PER_WINDOW = 6;

function checkAiRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = aiRateLimitMap.get(ip);
  if (!record || now - record.lastReset > AI_RATE_LIMIT_WINDOW_MS) {
    aiRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= AI_MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    if (!checkAiRateLimit(ip)) {
      return NextResponse.json(
        { error: "AI rate limit reached. Please wait a minute before generating another roadmap." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { currentSkills, targetRole, experienceLevel, weeklyHours, projectInterests } = body;

    // Validate inputs
    if (!targetRole || typeof targetRole !== "string" || targetRole.trim().length < 2) {
      return NextResponse.json(
        { error: "Target engineering role is required (min 2 characters)." },
        { status: 400 }
      );
    }

    const skills = Array.isArray(currentSkills)
      ? currentSkills.filter((s) => typeof s === "string" && s.trim().length > 0)
      : ["JavaScript", "HTML/CSS"];

    const hours = Number(weeklyHours) > 0 && Number(weeklyHours) <= 80 ? Number(weeklyHours) : 10;
    const exp = ["beginner", "intermediate", "advanced"].includes(experienceLevel)
      ? experienceLevel
      : "intermediate";

    const architectInput: CareerArchitectInput = {
      currentSkills: skills,
      targetRole: targetRole.trim(),
      experienceLevel: exp,
      weeklyHours: hours,
      projectInterests: typeof projectInterests === "string" ? projectInterests.trim() : undefined,
    };

    // Check for configured AI keys
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // If Gemini key is available, call Google Gemini 1.5/2.0 REST API
    if (geminiKey) {
      try {
        const prompt = buildCareerArchitectPrompt(architectInput);
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
          const parsed = JSON.parse(rawText);
          const validation = validateCareerArchitectResponse(parsed);

          if (validation.isValid && validation.sanitized) {
            return NextResponse.json({
              success: true,
              data: validation.sanitized,
              provider: "gemini-1.5-flash",
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini call error, using reliable fallback:", geminiErr);
      }
    }

    // If OpenAI key is available, call OpenAI API
    if (openaiKey) {
      try {
        const prompt = buildCareerArchitectPrompt(architectInput);
        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content:
                  "You are SkillForge AI Career Architect. You return only valid JSON adhering to the required schema.",
              },
              { role: "user", content: prompt },
            ],
            temperature: 0.2,
          }),
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          const rawText = openAiData?.choices?.[0]?.message?.content || "{}";
          const parsed = JSON.parse(rawText);
          const validation = validateCareerArchitectResponse(parsed);

          if (validation.isValid && validation.sanitized) {
            return NextResponse.json({
              success: true,
              data: validation.sanitized,
              provider: "gpt-4o-mini",
            });
          }
        }
      } catch (openAiErr) {
        console.warn("OpenAI call error, using reliable fallback:", openAiErr);
      }
    }

    // High-quality verified fallback when API credentials are not configured in environment
    const fallbackResponse = getDemoFallbackResponse(architectInput);
    return NextResponse.json({
      success: true,
      data: fallbackResponse,
      provider: "demo-fallback",
      note: "Generated using verified deterministic Career Architect engine. Set GEMINI_API_KEY in environment for live LLM inference.",
    });
  } catch (error: any) {
    console.error("AI Architect route error:", error);
    return NextResponse.json(
      { error: "Failed to generate career roadmap. Please try again." },
      { status: 500 }
    );
  }
}
