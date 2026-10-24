"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { Features } from "@/components/landing/Features";
import { Workflow } from "@/components/landing/Workflow";
import { UseCases } from "@/components/landing/UseCases";
import { FAQ } from "@/components/landing/FAQ";
import { LeadCapture } from "@/components/landing/LeadCapture";
import { Footer } from "@/components/landing/Footer";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard/ai-architect");
    } else {
      handleOpenAuth("register");
    }
  };

  const handleExploreDemo = () => {
    const el = document.getElementById("preview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        isAuthenticated={Boolean(user)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onGetStarted={handleGetStarted}
          onExploreDemo={handleExploreDemo}
        />

        {/* 2. Interactive Product Preview */}
        <DashboardPreview
          onLaunchGenerator={handleGetStarted}
        />

        {/* 3. Feature Showcase Cards */}
        <Features />

        {/* 4. Three-Step Workflow */}
        <Workflow />

        {/* 5. Audience Benefits Matrix */}
        <UseCases />

        {/* 6. Frequently Asked Questions */}
        <FAQ />

        {/* 7. Lead Capture Section */}
        <LeadCapture />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
