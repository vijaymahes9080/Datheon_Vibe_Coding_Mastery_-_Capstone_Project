-- SkillForge AI Security & Row-Level Security (RLS) Migration
-- Migration: 20261024000002_rls_security_policies.sql

-- 1. Enable Row-Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 2. Profiles Table Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- 3. Roadmaps Table Policies
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view their own roadmaps"
  ON public.roadmaps
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own roadmaps"
  ON public.roadmaps
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own roadmaps"
  ON public.roadmaps
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own roadmaps"
  ON public.roadmaps
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 4. Roadmap Tasks Policies (Cross-Tenant Verification)
-- Ensures tasks belong to the authenticated user AND to a roadmap they own
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can view their own roadmap tasks"
  ON public.roadmap_tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tasks only for roadmaps they own"
  ON public.roadmap_tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.roadmaps r
      WHERE r.id = roadmap_id AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks only for roadmaps they own"
  ON public.roadmap_tasks
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.roadmaps r
      WHERE r.id = roadmap_id AND r.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.roadmaps r
      WHERE r.id = roadmap_id AND r.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own tasks"
  ON public.roadmap_tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 5. Leads Table Policies
-- Anonymous visitors can submit leads, but cannot read or mutate other leads
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Service-role only for viewing leads; prevents public enumeration
CREATE POLICY "Only service role can read leads"
  ON public.leads
  FOR SELECT
  TO service_role
  USING (true);
