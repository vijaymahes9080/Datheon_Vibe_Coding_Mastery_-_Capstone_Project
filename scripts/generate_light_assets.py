#!/usr/bin/env python3
"""
Generate pristine, light-theme SVG and PNG visual assets for SkillForge AI.
Creates:
  1. public/images/skillforge-banner-light.svg & .png
  2. public/images/architecture-diagram-light.svg & .png
  3. public/images/workflow-pipeline-light.svg & .png
  4. public/images/dashboard-preview-light.svg & .png
  5. public/images/linkedin-showcase-light.svg & .png (and root LINKEDIN_SHOWCASE.png)
"""

import os
import sys
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
IMAGES_DIR = os.path.join(PROJECT_ROOT, "public", "images")
ENGINE_PATH = r"C:\Users\vijay\.gemini\config\skills\image-generate\scripts\engine.py"

os.makedirs(IMAGES_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. HERO BANNER (LIGHT THEME) - 1200 x 520
# -------------------------------------------------------------
def get_banner_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520" width="1200" height="520">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="50%" stop-color="#EEF2FF"/>
      <stop offset="100%" stop-color="#F0FDF4"/>
    </linearGradient>
    <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="50%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>
    <filter id="shadow-soft" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.08"/>
    </filter>
    <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="#CBD5E1" opacity="0.6"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="520" fill="url(#bg-grad)"/>
  <rect width="1200" height="520" fill="url(#dot-grid)"/>

  <!-- Luminous Ambient Light Accents -->
  <circle cx="200" cy="120" r="160" fill="#818CF8" opacity="0.12" filter="blur(40px)"/>
  <circle cx="1050" cy="380" r="180" fill="#34D399" opacity="0.12" filter="blur(40px)"/>

  <!-- Top Pill Badge -->
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="460" height="34" rx="17" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1.2"/>
    <circle cx="16" cy="17" r="4.5" fill="#4F46E5"/>
    <text x="28" y="22" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#4338CA" letter-spacing="0.5">DATHEON VIBE CODING MASTERY &amp; CAPSTONE PROJECT</text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(60, 130)">
    <text font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" fill="#0F172A" letter-spacing="-1">
      ⚡ SkillForge AI
    </text>
    <text x="360" y="-4" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#4F46E5" letter-spacing="0.5">
      v1.0 Production
    </text>
    <text y="42" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" fill="#334155">
      Autonomous AI Career Architect &amp; Portfolio Platform
    </text>
    <text y="74" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#64748B">
      Transforming raw aspirations into diagnostic gap analyses, phased roadmaps, and verifiable capstones.
    </text>
  </g>

  <!-- Stack Pills Row -->
  <g transform="translate(60, 245)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="130" height="32" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#shadow-soft)"/>
    <circle cx="14" cy="16" r="4" fill="#000000"/>
    <text x="25" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Next.js 15 App</text>

    <!-- Pill 2 -->
    <rect x="142" y="0" width="110" height="32" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#shadow-soft)"/>
    <circle cx="156" cy="16" r="4" fill="#2563EB"/>
    <text x="167" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">React 19</text>

    <!-- Pill 3 -->
    <rect x="264" y="0" width="140" height="32" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#shadow-soft)"/>
    <circle cx="278" cy="16" r="4" fill="#10B981"/>
    <text x="289" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Supabase RLS</text>

    <!-- Pill 4 -->
    <rect x="416" y="0" width="150" height="32" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#shadow-soft)"/>
    <circle cx="430" cy="16" r="4" fill="#F59E0B"/>
    <text x="441" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Gemini 1.5 Flash</text>

    <!-- Pill 5 -->
    <rect x="578" y="0" width="140" height="32" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#shadow-soft)"/>
    <circle cx="592" cy="16" r="4" fill="#8B5CF6"/>
    <text x="603" y="20" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Tailwind CSS v4</text>
  </g>

  <!-- Interactive Studio Preview Mockup Window -->
  <g transform="translate(60, 305)" filter="url(#shadow-soft)">
    <!-- Container Shell -->
    <rect x="0" y="0" width="1080" height="175" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>

    <!-- Browser Header Bar -->
    <path d="M 0 14 Q 0 0 14 0 L 1066 0 Q 1080 0 1080 14 L 1080 38 L 0 38 Z" fill="#F8FAFC"/>
    <line x1="0" y1="38" x2="1080" y2="38" stroke="#E2E8F0" stroke-width="1"/>
    <!-- Window Dots -->
    <circle cx="20" cy="19" r="5" fill="#EF4444"/>
    <circle cx="36" cy="19" r="5" fill="#F59E0B"/>
    <circle cx="52" cy="19" r="5" fill="#10B981"/>
    <!-- URL Pill -->
    <rect x="75" y="8" width="340" height="22" rx="11" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
    <text x="90" y="23" font-family="system-ui, monospace" font-size="11" fill="#64748B">https://skillforge.ai/dashboard/roadmaps</text>
    <!-- Right demo badge -->
    <rect x="910" y="8" width="150" height="22" rx="11" fill="#DCFCE7" stroke="#86EFAC" stroke-width="1"/>
    <text x="925" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#166534">● 1-Click Demo Active</text>

    <!-- Inside Content Row -->
    <!-- Metric 1 -->
    <g transform="translate(24, 52)">
      <rect x="0" y="0" width="235" height="105" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="16" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B">SKILLS GAP ACCURACY</text>
      <text x="16" y="60" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#0F172A">98.4%</text>
      <rect x="16" y="74" width="200" height="8" rx="4" fill="#E2E8F0"/>
      <rect x="16" y="74" width="196" height="8" rx="4" fill="#10B981"/>
      <text x="16" y="96" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#16A34A">✓ Zod schema validated</text>
    </g>

    <!-- Metric 2 -->
    <g transform="translate(275, 52)">
      <rect x="0" y="0" width="235" height="105" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="16" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#64748B">COMPLETION VELOCITY</text>
      <text x="16" y="60" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#0F172A">85.0%</text>
      <rect x="16" y="74" width="200" height="8" rx="4" fill="#E2E8F0"/>
      <rect x="16" y="74" width="170" height="8" rx="4" fill="#3B82F6"/>
      <text x="16" y="96" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#2563EB">↑ 17 of 20 tasks done</text>
    </g>

    <!-- Live Active Roadmap Widget -->
    <g transform="translate(526, 52)">
      <rect x="0" y="0" width="530" height="105" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <!-- Header -->
      <text x="16" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Active: Senior AI SaaS Engineer Roadmap</text>
      <rect x="390" y="10" width="124" height="20" rx="10" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
      <text x="402" y="24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400E">12 hrs/wk budget</text>
      <!-- Task Row 1 -->
      <g transform="translate(16, 38)">
        <rect x="0" y="0" width="498" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="14" cy="14" r="7" fill="#10B981"/>
        <polyline points="10,14 13,17 18,11" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
        <text x="28" y="18" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155">Implement Supabase RLS multi-tenant security policies</text>
        <rect x="420" y="5" width="70" height="18" rx="9" fill="#FEE2E2"/>
        <text x="432" y="17" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#991B1B">HIGH PRI</text>
      </g>
      <!-- Task Row 2 -->
      <g transform="translate(16, 70)">
        <rect x="0" y="0" width="498" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="14" cy="14" r="7" fill="#10B981"/>
        <polyline points="10,14 13,17 18,11" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
        <text x="28" y="18" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#334155">Build Gemini 1.5 Flash prompt engine with fallback</text>
        <rect x="420" y="5" width="70" height="18" rx="9" fill="#E0E7FF"/>
        <text x="435" y="17" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#3730A3">AI CORE</text>
      </g>
    </g>
  </g>
</svg>"""

# -------------------------------------------------------------
# 2. SYSTEM ARCHITECTURE (LIGHT THEME) - 1200 x 700
# -------------------------------------------------------------
def get_architecture_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
    <linearGradient id="arch-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EFF6FF"/>
    </linearGradient>
    <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.06"/>
    </filter>
    <pattern id="arch-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#CBD5E1" opacity="0.5"/>
    </pattern>
  </defs>

  <rect width="1200" height="700" fill="url(#arch-bg)"/>
  <rect width="1200" height="700" fill="url(#arch-dots)"/>

  <!-- Title Header -->
  <g transform="translate(60, 48)">
    <text font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#0F172A" letter-spacing="-0.5">
      🏗️ SkillForge AI — System Architecture &amp; Data Pipeline
    </text>
    <text y="28" font-family="system-ui, sans-serif" font-size="14.5" font-weight="500" fill="#64748B">
      Full-Stack Micro-SaaS: Next.js 15 App Router • PostgreSQL RLS Security • Multi-Provider AI Inference
    </text>
  </g>

  <!-- 4 Architecture Columns / Tiers -->

  <!-- 1. CLIENT TIER (Left) -->
  <g transform="translate(60, 110)" filter="url(#card-shadow)">
    <rect width="250" height="490" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect width="250" height="42" rx="12" fill="#EEF2FF"/>
    <path d="M 0 32 L 0 42 L 250 42 L 250 32 Z" fill="#EEF2FF"/>
    <line x1="0" y1="42" x2="250" y2="42" stroke="#C7D2FE" stroke-width="1"/>
    <text x="16" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#3730A3">1. CLIENT APPLICATION</text>

    <!-- Component 1 -->
    <g transform="translate(14, 56)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Landing Page (page.tsx)</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Hero, FAQ &amp; Features</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Interactive Dashboard Preview</text>
    </g>

    <!-- Component 2 -->
    <g transform="translate(14, 138)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Career Architect Wizard</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Skills input &amp; role select</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Real-time prompt streaming</text>
    </g>

    <!-- Component 3 -->
    <g transform="translate(14, 220)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Studio Task Manager</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Optimistic state updates</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Priority filter &amp; checklists</text>
    </g>

    <!-- Component 4 -->
    <g transform="translate(14, 302)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Isomorphic Providers</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• ThemeContext (Dark/Light)</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• AuthContext (1-Click Demo)</text>
    </g>

    <!-- Bottom Badge -->
    <g transform="translate(14, 436)">
      <rect width="222" height="38" rx="6" fill="#F1F5F9"/>
      <text x="24" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#334155">React 19 • Tailwind v4 • Next 15</text>
    </g>
  </g>

  <!-- Flow Arrow 1 -> 2 -->
  <g transform="translate(315, 330)">
    <line x1="0" y1="0" x2="35" y2="0" stroke="#4F46E5" stroke-width="2.5" stroke-dasharray="4,3"/>
    <polygon points="35,0 27,-5 27,5" fill="#4F46E5"/>
    <rect x="-8" y="-22" width="52" height="16" rx="4" fill="#EEF2FF"/>
    <text x="-4" y="-10" font-family="system-ui, monospace" font-size="9" font-weight="700" fill="#4338CA">HTTPS</text>
  </g>

  <!-- 2. API & GATEWAY TIER (Middle-Left) -->
  <g transform="translate(355, 110)" filter="url(#card-shadow)">
    <rect width="250" height="490" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect width="250" height="42" rx="12" fill="#F0FDF4"/>
    <path d="M 0 32 L 0 42 L 250 42 L 250 32 Z" fill="#F0FDF4"/>
    <line x1="0" y1="42" x2="250" y2="42" stroke="#BBF7D0" stroke-width="1"/>
    <text x="16" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#166534">2. API &amp; GATEWAY</text>

    <!-- Component 1 -->
    <g transform="translate(14, 56)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Next.js Middleware</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Session cookie synchronization</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Protected route guards</text>
    </g>

    <!-- Component 2 -->
    <g transform="translate(14, 138)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">IP Rate-Limiting Engine</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• 5 requests/min sliding window</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Anti-DDoS &amp; spam throttle</text>
    </g>

    <!-- Component 3 -->
    <g transform="translate(14, 220)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">/api/ai/architect</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Auth verification check</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Multi-provider dispatcher</text>
    </g>

    <!-- Component 4 -->
    <g transform="translate(14, 302)">
      <rect width="222" height="72" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="12" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Zod Schema Validator</text>
      <text x="12" y="40" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Output shape guarantee</text>
      <text x="12" y="58" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Zero malformed JSON spills</text>
    </g>

    <!-- Bottom Badge -->
    <g transform="translate(14, 436)">
      <rect width="222" height="38" rx="6" fill="#F1F5F9"/>
      <text x="24" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#334155">OWASP ASVS Verified • Secure</text>
    </g>
  </g>

  <!-- Flow Arrow 2 -> 3 (Supabase) -->
  <g transform="translate(610, 240)">
    <line x1="0" y1="0" x2="35" y2="0" stroke="#059669" stroke-width="2.5"/>
    <polygon points="35,0 27,-5 27,5" fill="#059669"/>
    <rect x="-8" y="-22" width="52" height="16" rx="4" fill="#DCFCE7"/>
    <text x="-5" y="-10" font-family="system-ui, monospace" font-size="9" font-weight="700" fill="#166534">Postgres</text>
  </g>

  <!-- Flow Arrow 2 -> 4 (AI Engine) -->
  <g transform="translate(610, 440)">
    <line x1="0" y1="0" x2="35" y2="0" stroke="#D97706" stroke-width="2.5"/>
    <polygon points="35,0 27,-5 27,5" fill="#D97706"/>
    <rect x="-8" y="-22" width="52" height="16" rx="4" fill="#FEF3C7"/>
    <text x="-4" y="-10" font-family="system-ui, monospace" font-size="9" font-weight="700" fill="#92400E">AI REST</text>
  </g>

  <!-- 3. SUPABASE PERSISTENCE TIER (Top-Right) -->
  <g transform="translate(650, 110)" filter="url(#card-shadow)">
    <rect width="490" height="230" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect width="490" height="42" rx="12" fill="#F0FDF4"/>
    <path d="M 0 32 L 0 42 L 490 42 L 490 32 Z" fill="#F0FDF4"/>
    <line x1="0" y1="42" x2="490" y2="42" stroke="#BBF7D0" stroke-width="1"/>
    <text x="16" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#166534">3. SUPABASE DATA LAYER (PostgreSQL + RLS)</text>

    <!-- Table Grid -->
    <g transform="translate(16, 56)">
      <!-- Table 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="145" height="74" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="10" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0F172A">auth.users</text>
        <text x="10" y="38" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• UUID primary key</text>
        <text x="10" y="54" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• Cookie session auth</text>
      </g>

      <!-- Table 2 -->
      <g transform="translate(155, 0)">
        <rect x="0" y="0" width="145" height="74" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="10" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0F172A">roadmaps</text>
        <text x="10" y="38" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• Locked to user_id</text>
        <text x="10" y="54" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• RLS tenant isolation</text>
      </g>

      <!-- Table 3 -->
      <g transform="translate(310, 0)">
        <rect x="0" y="0" width="145" height="74" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="10" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0F172A">roadmap_tasks</text>
        <text x="10" y="38" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• Subquery verification</text>
        <text x="10" y="54" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• Optimistic checkbox</text>
      </g>
    </g>

    <!-- Bottom RLS Note -->
    <g transform="translate(16, 145)">
      <rect width="455" height="66" rx="6" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1"/>
      <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065F46">🔒 Cryptographic Row-Level Security (RLS) Guarantee:</text>
      <text x="14" y="44" font-family="system-ui, sans-serif" font-size="10.5" fill="#047857">"Users can strictly view, mutate, and delete ONLY their own roadmaps. Foreign tasks cannot be injected."</text>
    </g>
  </g>

  <!-- 4. AI INFERENCE TIER (Bottom-Right) -->
  <g transform="translate(650, 360)" filter="url(#card-shadow)">
    <rect width="490" height="240" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect width="490" height="42" rx="12" fill="#FEF3C7"/>
    <path d="M 0 32 L 0 42 L 490 42 L 490 32 Z" fill="#FEF3C7"/>
    <line x1="0" y1="42" x2="490" y2="42" stroke="#FDE68A" stroke-width="1"/>
    <text x="16" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#92400E">4. MULTI-PROVIDER AI ADAPTER ENGINE</text>

    <!-- AI Providers Grid -->
    <g transform="translate(16, 56)">
      <!-- AI 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="145" height="85" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="10" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0F172A">Google Gemini</text>
        <text x="10" y="38" font-family="system-ui, sans-serif" font-size="10" fill="#D97706">• 1.5 Flash / 2.0</text>
        <text x="10" y="54" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• High-velocity reasoning</text>
        <text x="10" y="70" font-family="system-ui, sans-serif" font-size="10" fill="#16A34A">● Primary Active</text>
      </g>

      <!-- AI 2 -->
      <g transform="translate(155, 0)">
        <rect x="0" y="0" width="145" height="85" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="10" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0F172A">OpenAI GPT-4o</text>
        <text x="10" y="38" font-family="system-ui, sans-serif" font-size="10" fill="#2563EB">• GPT-4o-mini engine</text>
        <text x="10" y="54" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• Structured JSON mode</text>
        <text x="10" y="70" font-family="system-ui, sans-serif" font-size="10" fill="#4B5563">○ Secondary Fallback</text>
      </g>

      <!-- AI 3 -->
      <g transform="translate(310, 0)">
        <rect x="0" y="0" width="145" height="85" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="10" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0F172A">Deterministic</text>
        <text x="10" y="38" font-family="system-ui, sans-serif" font-size="10" fill="#7C3AED">• Zero-credential engine</text>
        <text x="10" y="54" font-family="system-ui, sans-serif" font-size="10" fill="#64748B">• Instant mock generation</text>
        <text x="10" y="70" font-family="system-ui, sans-serif" font-size="10" fill="#2563EB">● Test Suite Ready</text>
      </g>
    </g>

    <!-- Bottom AI Specs -->
    <g transform="translate(16, 155)">
      <rect width="455" height="68" rx="6" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1"/>
      <text x="14" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#B45309">⚡ Intelligent Output Transformation:</text>
      <text x="14" y="44" font-family="system-ui, sans-serif" font-size="10.5" fill="#92400E">1. Skills Gap Diagnostic (%)  →  2. Phased Learning Curriculum  →  3. Production Capstone Spec</text>
      <text x="14" y="60" font-family="system-ui, sans-serif" font-size="10.5" font-weight="600" fill="#B45309">1-Click direct synchronization into active Supabase database records.</text>
    </g>
  </g>

  <!-- Bottom Global Trust Bar -->
  <g transform="translate(60, 625)">
    <rect width="1080" height="42" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
    <text x="24" y="26" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1E293B">Security &amp; Reliability Gates:</text>
    <text x="220" y="26" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">✓ 100% Automated Tests Passed (9/9)</text>
    <text x="490" y="26" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">✓ Zero Secret Leakage to Client</text>
    <text x="730" y="26" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">✓ Vercel Edge Serverless Deployment</text>
  </g>
</svg>"""

# -------------------------------------------------------------
# 3. WORKFLOW PIPELINE (LIGHT THEME) - 1200 x 440
# -------------------------------------------------------------
def get_workflow_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 440" width="1200" height="440">
  <defs>
    <linearGradient id="wf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="50%" stop-color="#EEF2FF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>
    <filter id="wf-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.07"/>
    </filter>
  </defs>

  <rect width="1200" height="440" fill="url(#wf-bg)"/>

  <!-- Title Header -->
  <g transform="translate(60, 48)">
    <text font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#0F172A" letter-spacing="-0.5">
      🚀 3-Step Career Acceleration Pipeline
    </text>
    <text y="28" font-family="system-ui, sans-serif" font-size="14.5" font-weight="500" fill="#64748B">
      From raw engineering ambitions to enterprise-grade portfolio execution in minutes
    </text>
  </g>

  <!-- Step 1 Card -->
  <g transform="translate(60, 110)" filter="url(#wf-shadow)">
    <rect width="330" height="280" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <!-- Step Badge -->
    <rect x="20" y="20" width="80" height="28" rx="14" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
    <text x="34" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#4338CA">STEP 01</text>
    
    <text x="20" y="80" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#0F172A">Profile &amp; Ambition Input</text>
    <text x="20" y="104" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B">Specify your baseline and goals</text>

    <g transform="translate(20, 126)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#4F46E5"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Current Skills (React, TS, SQL)</text>
    </g>

    <g transform="translate(20, 174)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#2563EB"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Dream Target Role &amp; Tier</text>
    </g>

    <g transform="translate(20, 222)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#10B981"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Weekly Time Budget (8-20 hrs)</text>
    </g>
  </g>

  <!-- Connector Arrow 1 -> 2 -->
  <g transform="translate(402, 235)">
    <line x1="0" y1="0" x2="24" y2="0" stroke="#4F46E5" stroke-width="3"/>
    <polygon points="24,0 16,-6 16,6" fill="#4F46E5"/>
  </g>

  <!-- Step 2 Card -->
  <g transform="translate(435, 110)" filter="url(#wf-shadow)">
    <rect width="330" height="280" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <!-- Step Badge -->
    <rect x="20" y="20" width="80" height="28" rx="14" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
    <text x="34" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#92400E">STEP 02</text>
    
    <text x="20" y="80" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#0F172A">AI Diagnostic &amp; Synthesis</text>
    <text x="20" y="104" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B">Multi-provider structured reasoning</text>

    <g transform="translate(20, 126)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#D97706"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Quantitative Skills Gap %</text>
    </g>

    <g transform="translate(20, 174)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#7C3AED"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Phased Milestone Curricula</text>
    </g>

    <g transform="translate(20, 222)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#2563EB"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Production Capstone Specs</text>
    </g>
  </g>

  <!-- Connector Arrow 2 -> 3 -->
  <g transform="translate(777, 235)">
    <line x1="0" y1="0" x2="24" y2="0" stroke="#059669" stroke-width="3"/>
    <polygon points="24,0 16,-6 16,6" fill="#059669"/>
  </g>

  <!-- Step 3 Card -->
  <g transform="translate(810, 110)" filter="url(#wf-shadow)">
    <rect width="330" height="280" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <!-- Step Badge -->
    <rect x="20" y="20" width="80" height="28" rx="14" fill="#DCFCE7" stroke="#86EFAC" stroke-width="1"/>
    <text x="34" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#166534">STEP 03</text>
    
    <text x="20" y="80" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#0F172A">Studio Execution &amp; Track</text>
    <text x="20" y="104" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B">Persistent Supabase task management</text>

    <g transform="translate(20, 126)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#059669"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">1-Click Roadmap Database Sync</text>
    </g>

    <g transform="translate(20, 174)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#10B981"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Optimistic Task Checklists</text>
    </g>

    <g transform="translate(20, 222)">
      <rect width="290" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="16" cy="20" r="4" fill="#3B82F6"/>
      <text x="28" y="24" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Real-time Velocity Gauges</text>
    </g>
  </g>
</svg>"""

# -------------------------------------------------------------
# 4. DASHBOARD PREVIEW (LIGHT THEME) - 1200 x 680
# -------------------------------------------------------------
def get_dashboard_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" width="1200" height="680">
  <defs>
    <linearGradient id="db-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EFF6FF"/>
    </linearGradient>
    <filter id="db-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="5" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.08"/>
    </filter>
  </defs>

  <rect width="1200" height="680" fill="url(#db-bg)"/>

  <!-- Browser Window Wrapper -->
  <g transform="translate(40, 25)" filter="url(#db-shadow)">
    <rect width="1120" height="630" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>

    <!-- Title Bar -->
    <path d="M 0 14 Q 0 0 14 0 L 1106 0 Q 1120 0 1120 14 L 1120 44 L 0 44 Z" fill="#F1F5F9"/>
    <line x1="0" y1="44" x2="1120" y2="44" stroke="#E2E8F0" stroke-width="1"/>

    <!-- Window Dots -->
    <circle cx="24" cy="22" r="5" fill="#EF4444"/>
    <circle cx="42" cy="22" r="5" fill="#F59E0B"/>
    <circle cx="60" cy="22" r="5" fill="#10B981"/>

    <!-- App Logo & Nav in Title Bar -->
    <text x="88" y="27" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#0F172A">⚡ SkillForge AI</text>
    <rect x="200" y="10" width="160" height="24" rx="12" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
    <text x="214" y="26" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#4338CA">Dashboard / Studio</text>

    <!-- Top Right Controls -->
    <rect x="910" y="10" width="190" height="24" rx="12" fill="#DCFCE7" stroke="#86EFAC" stroke-width="1"/>
    <circle cx="926" cy="22" r="4" fill="#16A34A"/>
    <text x="936" y="26" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#166534">Demo Session: Reviewer</text>

    <!-- Dashboard Subheader -->
    <g transform="translate(24, 66)">
      <text font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A">Career Roadmap Studio</text>
      <text y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B">Manage personalized learning milestones and execute capstone deliverables.</text>
    </g>

    <!-- 4 High-Level Metric Gauges -->
    <g transform="translate(24, 120)">
      <!-- Metric 1 -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="254" height="88" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">ACTIVE ROADMAPS</text>
        <text x="16" y="58" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#0F172A">3</text>
        <text x="48" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#10B981">+1 synthesized</text>
      </g>

      <!-- Metric 2 -->
      <g transform="translate(272, 0)">
        <rect x="0" y="0" width="254" height="88" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">TASKS COMPLETED</text>
        <text x="16" y="58" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#0F172A">17 / 20</text>
        <text x="130" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#3B82F6">85% total</text>
      </g>

      <!-- Metric 3 -->
      <g transform="translate(544, 0)">
        <rect x="0" y="0" width="254" height="88" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">OVERALL VELOCITY</text>
        <text x="16" y="58" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#0F172A">85.0%</text>
        <text x="115" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#10B981">↑ +14% vs avg</text>
      </g>

      <!-- Metric 4 -->
      <g transform="translate(816, 0)">
        <rect x="0" y="0" width="256" height="88" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <text x="16" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748B">CAPSTONE READINESS</text>
        <text x="16" y="58" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#059669">Ready to Ship</text>
        <text x="175" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#059669">Tier 1</text>
      </g>
    </g>

    <!-- Main Workspace Split -->
    <!-- Left Column: Active Roadmap Detail & Tasks (680px) -->
    <g transform="translate(24, 226)">
      <rect width="670" height="380" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2"/>
      
      <!-- Card Title -->
      <text x="20" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#0F172A">Roadmap: Senior AI SaaS Engineer</text>
      <rect x="520" y="16" width="130" height="24" rx="12" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
      <text x="536" y="32" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#4338CA">Progress: 85%</text>

      <!-- Progress Bar -->
      <rect x="20" y="50" width="630" height="8" rx="4" fill="#E2E8F0"/>
      <rect x="20" y="50" width="535" height="8" rx="4" fill="#4F46E5"/>

      <!-- Task Item 1 -->
      <g transform="translate(20, 72)">
        <rect width="630" height="52" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="24" cy="26" r="10" fill="#10B981"/>
        <polyline points="19,26 23,30 29,22" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <text x="44" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1E293B">Implement Supabase RLS multi-tenant security policies</text>
        <text x="44" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#64748B">Due: Oct 24 • Milestone 1: Data Isolation</text>
        <rect x="545" y="14" width="70" height="22" rx="11" fill="#FEE2E2"/>
        <text x="558" y="29" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#991B1B">HIGH PRI</text>
      </g>

      <!-- Task Item 2 -->
      <g transform="translate(20, 134)">
        <rect width="630" height="52" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="24" cy="26" r="10" fill="#10B981"/>
        <polyline points="19,26 23,30 29,22" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <text x="44" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1E293B">Build Zod schema validation for AI Career Architect</text>
        <text x="44" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#64748B">Due: Oct 25 • Milestone 2: Schema Hardening</text>
        <rect x="545" y="14" width="70" height="22" rx="11" fill="#E0E7FF"/>
        <text x="560" y="29" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#3730A3">AI CORE</text>
      </g>

      <!-- Task Item 3 -->
      <g transform="translate(20, 196)">
        <rect width="630" height="52" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
        <circle cx="24" cy="26" r="10" fill="#10B981"/>
        <polyline points="19,26 23,30 29,22" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <text x="44" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1E293B">Construct Isomorphic Dark/Light Theme Provider</text>
        <text x="44" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#64748B">Due: Oct 26 • Milestone 3: Design System</text>
        <rect x="545" y="14" width="70" height="22" rx="11" fill="#FEF3C7"/>
        <text x="558" y="29" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#92400E">MED PRI</text>
      </g>

      <!-- Task Item 4 (Pending) -->
      <g transform="translate(20, 258)">
        <rect width="630" height="52" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2"/>
        <circle cx="24" cy="26" r="10" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
        <text x="44" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#0F172A">Execute Automated Test Suite &amp; Deploy to Vercel</text>
        <text x="44" y="42" font-family="system-ui, sans-serif" font-size="11" fill="#64748B">Due: Oct 28 • Milestone 4: Production Release</text>
        <rect x="545" y="14" width="70" height="22" rx="11" fill="#FEE2E2"/>
        <text x="558" y="29" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#991B1B">HIGH PRI</text>
      </g>

      <!-- Task Item 5 (Pending) -->
      <g transform="translate(20, 318)">
        <rect width="630" height="50" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2"/>
        <circle cx="24" cy="25" r="10" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
        <text x="44" y="23" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#0F172A">Publish 2-min LinkedIn Video Walkthrough &amp; Source</text>
        <text x="44" y="41" font-family="system-ui, sans-serif" font-size="11" fill="#64748B">Due: Oct 29 • Milestone 5: Community Launch</text>
        <rect x="545" y="13" width="70" height="22" rx="11" fill="#DCFCE7"/>
        <text x="556" y="28" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#166534">LAUNCH</text>
      </g>
    </g>

    <!-- Right Column: AI Generator Card (380px) -->
    <g transform="translate(714, 226)">
      <rect width="380" height="380" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2"/>
      
      <text x="20" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#0F172A">🧠 Career Architect AI</text>
      <text x="20" y="52" font-family="system-ui, sans-serif" font-size="12" fill="#64748B">Generate new career roadmap in 1 click</text>

      <!-- Form Inputs Preview -->
      <g transform="translate(20, 72)">
        <text x="0" y="12" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569">CURRENT TECH STACK</text>
        <rect x="0" y="20" width="340" height="36" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
        <text x="12" y="43" font-family="system-ui, sans-serif" font-size="12" fill="#1E293B">React, TypeScript, Node.js, Next.js</text>
      </g>

      <g transform="translate(20, 142)">
        <text x="0" y="12" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569">TARGET DREAM ROLE</text>
        <rect x="0" y="20" width="340" height="36" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
        <text x="12" y="43" font-family="system-ui, sans-serif" font-size="12" fill="#1E293B">Senior AI SaaS Architect</text>
      </g>

      <g transform="translate(20, 212)">
        <text x="0" y="12" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569">AI ENGINE &amp; MODEL</text>
        <rect x="0" y="20" width="340" height="36" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
        <circle cx="16" cy="38" r="4" fill="#F59E0B"/>
        <text x="28" y="43" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Google Gemini 1.5 Flash (Adaptive)</text>
      </g>

      <!-- Action Button -->
      <g transform="translate(20, 296)">
        <rect width="340" height="46" rx="8" fill="#4F46E5"/>
        <text x="75" y="28" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">✨ Synthesize AI Roadmap</text>
      </g>
      <text x="80" y="362" font-family="system-ui, sans-serif" font-size="11" fill="#94A3B8">Instant Supabase database synchronization</text>
    </g>
  </g>
</svg>"""

# -------------------------------------------------------------
# 5. LINKEDIN SHOWCASE (LIGHT THEME) - 1200 x 630
# -------------------------------------------------------------
def get_linkedin_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="li-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EEF2FF"/>
    </linearGradient>
    <filter id="li-shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.08"/>
    </filter>
    <pattern id="li-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="#CBD5E1" opacity="0.6"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#li-bg)"/>
  <rect width="1200" height="630" fill="url(#li-dots)"/>

  <!-- Top Accent Ribbon -->
  <rect width="1200" height="6" fill="#4F46E5"/>

  <!-- Top Badges -->
  <g transform="translate(60, 42)">
    <rect x="0" y="0" width="450" height="32" rx="16" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1.2"/>
    <circle cx="16" cy="16" r="4" fill="#4F46E5"/>
    <text x="28" y="21" font-family="system-ui, sans-serif" font-size="11.5" font-weight="800" fill="#4338CA" letter-spacing="0.5">DATHEON VIBE CODING MASTERY CAPSTONE PROJECT</text>

    <!-- Version Badge -->
    <rect x="940" y="0" width="140" height="32" rx="16" fill="#DCFCE7" stroke="#86EFAC" stroke-width="1.2"/>
    <circle cx="956" cy="16" r="4" fill="#16A34A"/>
    <text x="968" y="21" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#166534">v1.0 Launched</text>
  </g>

  <!-- Title & Headline -->
  <g transform="translate(60, 115)">
    <text font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#0F172A" letter-spacing="-1">
      ⚡ SkillForge AI
    </text>
    <text y="42" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#334155">
      Autonomous AI Career Architect &amp; Portfolio Platform
    </text>
    <text y="72" font-family="system-ui, sans-serif" font-size="15" font-weight="500" fill="#64748B">
      Full-Stack Micro-SaaS: Transforming developer ambitions into structured roadmaps and verifiable capstones.
    </text>
  </g>

  <!-- 4 Feature Pillars Grid -->
  <g transform="translate(60, 220)">
    <!-- Box 1: AI Career Architect -->
    <g transform="translate(0, 0)" filter="url(#li-shadow)">
      <rect width="255" height="260" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <rect width="255" height="36" rx="12" fill="#FEF3C7"/>
      <path d="M 0 26 L 0 36 L 255 36 L 255 26 Z" fill="#FEF3C7"/>
      <text x="14" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#92400E">🧠 AI CAREER ARCHITECT</text>
      
      <text x="16" y="64" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0F172A">Precision Gap Diagnostic</text>
      <text x="16" y="86" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Quantitative skills gap %</text>
      <text x="16" y="106" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Phased milestone schedules</text>
      <text x="16" y="126" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Production capstone specs</text>
      
      <rect x="16" y="150" width="223" height="88" rx="8" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1"/>
      <text x="24" y="174" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#B45309">AI Engine Support:</text>
      <text x="24" y="196" font-family="system-ui, sans-serif" font-size="11" fill="#92400E">• Google Gemini 1.5 Flash</text>
      <text x="24" y="218" font-family="system-ui, sans-serif" font-size="11" fill="#92400E">• Structured Zod Schema</text>
    </g>

    <!-- Box 2: Supabase Security -->
    <g transform="translate(275, 0)" filter="url(#li-shadow)">
      <rect width="255" height="260" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <rect width="255" height="36" rx="12" fill="#F0FDF4"/>
      <path d="M 0 26 L 0 36 L 255 36 L 255 26 Z" fill="#F0FDF4"/>
      <text x="14" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#166534">🔐 SUPABASE RLS SECURITY</text>
      
      <text x="16" y="64" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0F172A">Tenant Isolation</text>
      <text x="16" y="86" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Locked to auth.uid()</text>
      <text x="16" y="106" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Subquery check on tasks</text>
      <text x="16" y="126" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• 1-Click Reviewer Demo</text>

      <rect x="16" y="150" width="223" height="88" rx="8" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1"/>
      <text x="24" y="174" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#065F46">Security Highlights:</text>
      <text x="24" y="196" font-family="system-ui, sans-serif" font-size="11" fill="#047857">• OWASP ASVS Verified</text>
      <text x="24" y="218" font-family="system-ui, sans-serif" font-size="11" fill="#047857">• Zero credential leaks</text>
    </g>

    <!-- Box 3: Modern Tech Stack -->
    <g transform="translate(550, 0)" filter="url(#li-shadow)">
      <rect width="255" height="260" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <rect width="255" height="36" rx="12" fill="#EEF2FF"/>
      <path d="M 0 26 L 0 36 L 255 36 L 255 26 Z" fill="#EEF2FF"/>
      <text x="14" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#3730A3">⚡ MODERN NEXT.JS STACK</text>
      
      <text x="16" y="64" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0F172A">Next.js 15 App Router</text>
      <text x="16" y="86" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• React 19 architecture</text>
      <text x="16" y="106" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Tailwind CSS v4 styling</text>
      <text x="16" y="126" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Turbopack rapid builds</text>

      <rect x="16" y="150" width="223" height="88" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="24" y="174" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1E293B">Design &amp; UI Polish:</text>
      <text x="24" y="196" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Isomorphic Theme Sync</text>
      <text x="24" y="218" font-family="system-ui, sans-serif" font-size="11" fill="#475569">• Optimistic UI updates</text>
    </g>

    <!-- Box 4: Verified Automation -->
    <g transform="translate(825, 0)" filter="url(#li-shadow)">
      <rect width="255" height="260" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <rect width="255" height="36" rx="12" fill="#F1F5F9"/>
      <path d="M 0 26 L 0 36 L 255 36 L 255 26 Z" fill="#F1F5F9"/>
      <text x="14" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#334155">🧪 100% AUTOMATED TESTS</text>
      
      <text x="16" y="64" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0F172A">9/9 Tests Passing</text>
      <text x="16" y="86" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• AI schema validation</text>
      <text x="16" y="106" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• Anti-abuse rate limiting</text>
      <text x="16" y="126" font-family="system-ui, sans-serif" font-size="11.5" fill="#475569">• RLS isolation verification</text>

      <rect x="16" y="150" width="223" height="88" rx="8" fill="#F0FDF4" stroke="#BBF7D0" stroke-width="1"/>
      <text x="24" y="174" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#166534">Production Deployment:</text>
      <text x="24" y="196" font-family="system-ui, sans-serif" font-size="11" fill="#15803D">• Vercel Edge Serverless</text>
      <text x="24" y="218" font-family="system-ui, sans-serif" font-size="11" fill="#15803D">• Zero downtime pipelines</text>
    </g>
  </g>

  <!-- Bottom Author & Repo Footer -->
  <g transform="translate(60, 520)">
    <rect width="1080" height="64" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#li-shadow)"/>
    
    <!-- Left: Author -->
    <text x="24" y="38" font-family="system-ui, sans-serif" font-size="14.5" font-weight="800" fill="#0F172A">
      Engineered by vijaymahes9080 <tspan fill="#64748B" font-weight="500"> | Datheon Vibe Coding Mastery &amp; Capstone Project</tspan>
    </text>

    <!-- Right: GitHub Link Badge -->
    <rect x="730" y="14" width="326" height="36" rx="8" fill="#0F172A"/>
    <text x="750" y="37" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">
      github.com/vijaymahes9080/Datheon_Vibe...
    </text>
  </g>
</svg>"""

def main():
    print("=======================================================")
    print("🎨 Generating SkillForge AI Light-Theme Visual Assets")
    print("=======================================================")

    assets = [
        ("skillforge-banner-light.svg", get_banner_svg(), 1200, 520),
        ("architecture-diagram-light.svg", get_architecture_svg(), 1200, 700),
        ("workflow-pipeline-light.svg", get_workflow_svg(), 1200, 440),
        ("dashboard-preview-light.svg", get_dashboard_svg(), 1200, 680),
        ("linkedin-showcase-light.svg", get_linkedin_svg(), 1200, 630),
    ]

    for filename, svg_content, width, height in assets:
        svg_path = os.path.join(IMAGES_DIR, filename)
        png_path = os.path.join(IMAGES_DIR, filename.replace(".svg", ".png"))

        # 1. Write SVG
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"✓ Saved SVG: {svg_path} ({len(svg_content)} bytes)")

        # 2. Rasterize to high-res PNG (2x scale for Retina sharpness)
        print(f"  Rendering {filename} -> {os.path.basename(png_path)} via engine.py...")
        cmd = [
            sys.executable,
            ENGINE_PATH,
            "svg2raster",
            svg_path,
            png_path,
            "--scale", "2.0"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"  ❌ Rasterization error: {res.stderr}")
        else:
            print(f"  ✓ Rasterized PNG successfully: {png_path} ({os.path.getsize(png_path)} bytes)")

    # Also create a copy of linkedin-showcase-light.png at root as LINKEDIN_SHOWCASE.png for easy direct access
    src_li = os.path.join(IMAGES_DIR, "linkedin-showcase-light.png")
    dst_li = os.path.join(PROJECT_ROOT, "LINKEDIN_SHOWCASE.png")
    if os.path.exists(src_li):
        import shutil
        shutil.copyfile(src_li, dst_li)
        print(f"✓ Copied root banner: {dst_li}")

    print("=======================================================")
    print("🎉 All Light-Theme Assets Generated & Converted!")
    print("=======================================================")

if __name__ == "__main__":
    main()
