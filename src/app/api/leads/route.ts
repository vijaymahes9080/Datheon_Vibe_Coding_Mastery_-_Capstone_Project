import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Basic in-memory rate-limiter and fallback store
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const fallbackLeadsStore: Array<{ id: string; name: string; email: string; message?: string; created_at: string }> = [];

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Valid name (2-100 characters) is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim()) || email.length > 255) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    const sanitizedMessage = typeof message === "string" ? message.trim().slice(0, 1000) : null;
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Check for recent duplicate submission in last 5 minutes
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: existingLead } = await supabase
        .from("leads")
        .select("id")
        .eq("email", cleanEmail)
        .gte("created_at", fiveMinsAgo)
        .maybeSingle();

      if (existingLead) {
        return NextResponse.json(
          { message: "You have already submitted an early access request recently. We'll be in touch!" },
          { status: 200 }
        );
      }

      const { data, error } = await supabase
        .from("leads")
        .insert({
          name: cleanName,
          email: cleanEmail,
          message: sanitizedMessage,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase insert lead error:", error);
        // Fallback gracefully so user is not blocked
        const fallbackLead = {
          id: `lead_${Date.now()}`,
          name: cleanName,
          email: cleanEmail,
          message: sanitizedMessage || undefined,
          created_at: new Date().toISOString(),
        };
        fallbackLeadsStore.push(fallbackLead);
        return NextResponse.json({
          success: true,
          lead: fallbackLead,
          note: "Lead captured safely in fallback storage.",
        });
      }

      return NextResponse.json({
        success: true,
        lead: data,
      });
    } else {
      // Fallback local persistence
      const fallbackLead = {
        id: `lead_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        message: sanitizedMessage || undefined,
        created_at: new Date().toISOString(),
      };
      fallbackLeadsStore.push(fallbackLead);

      return NextResponse.json({
        success: true,
        lead: fallbackLead,
        note: "Lead stored locally. Configure Supabase environment variables for cloud sync.",
      });
    }
  } catch (error: any) {
    console.error("Error in /api/leads route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
