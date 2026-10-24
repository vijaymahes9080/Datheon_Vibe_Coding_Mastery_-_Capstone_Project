"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, AlertCircle, Send, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export const LeadCapture: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Field validation errors
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) {
      errs.name = "Full name is required";
    } else if (name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = "Please provide a valid email address";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit early access request.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-capture" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 sm:p-12 shadow-2xl shadow-indigo-500/10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Badge variant="purple" size="md" className="mb-3">
              Early Access Program
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Get Priority Access to <span className="gradient-text">SkillForge AI</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Join 2,500+ ambitious developers. Get your personalized career diagnostics, exclusive
              capstone templates, and direct mentorship feedback.
            </p>
          </div>

          {success ? (
            <div className="p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center max-w-lg mx-auto space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                You're On The VIP List!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Thank you for applying. We've logged your request into our Supabase database and will
                reach out shortly with your invite code and initial diagnostic prompt.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSuccess(false)}
                className="mt-2"
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 flex items-center gap-3 text-red-700 dark:text-red-400 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Input
                label="Full Name"
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                icon={<User className="w-4 h-4" />}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Target Role or Aspirations (Optional)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <textarea
                    rows={3}
                    placeholder="e.g. Aspiring to transition into Full-Stack AI Engineer by Q4..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>We respect your privacy. No spam ever.</span>
                  <span>{message.length}/500</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="primary"
                isLoading={loading}
                className="w-full shadow-lg shadow-indigo-500/20"
                icon={<Send className="w-4 h-4" />}
              >
                Claim Priority Early Access
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
