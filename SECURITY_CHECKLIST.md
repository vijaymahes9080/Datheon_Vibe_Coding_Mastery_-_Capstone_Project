# SkillForge AI — Application Security & Hardening Checklist

This security checklist documents the defense-in-depth measures implemented in the SkillForge AI codebase conforming to OWASP ASVS Level 2 standards.

## 1. Authentication & Session Management
- [x] **Secure Cookie Handling**: Cookies are configured with `HttpOnly`, `SameSite=Lax`, and `Secure` attributes via `@supabase/ssr`.
- [x] **Client/Server Session Boundary**: Client components never inspect raw secret keys; tokens are refreshed securely in Next.js middleware.
- [x] **Zero-Credential Demo Mode**: Reviewers can test full application capabilities in isolated demo mode without needing to enter sensitive passwords.
- [x] **Password Complexity Requirements**: Password inputs enforce a minimum length of 6 characters on both client and server.

## 2. Authorization & Multi-Tenant Data Protection (PostgreSQL RLS)
- [x] **Row-Level Security Enabled**: Enabled across all tables (`profiles`, `roadmaps`, `roadmap_tasks`, `leads`).
- [x] **Strict Tenant Ownership**: Users can only query (`SELECT`), create (`INSERT`), modify (`UPDATE`), or delete (`DELETE`) records where `user_id = auth.uid()`.
- [x] **Cross-Tenant Cascade Prevention**: `roadmap_tasks` contains an `EXISTS` subquery verifying that any mutated task belongs to a roadmap owned by the authenticated caller.
- [x] **Public Data Scrape Prevention**: The `leads` table accepts public `INSERT` operations for lead capture but restricts `SELECT` to `service_role`, preventing enumeration attacks.

## 3. API Hardening & Abuse Mitigation
- [x] **Rate Limiting**:
  - `/api/leads`: Capped at 5 requests per minute per IP address.
  - `/api/ai/architect`: Capped at 6 requests per minute per IP address to prevent quota exhaustion and DDoS attacks.
- [x] **Input Sanitization**:
  - Strings are trimmed, bounded, and length-checked (e.g. names 2-100 chars, message max 1,000 chars, hours 1-80).
  - Emails are validated using RFC-compliant regex patterns.
- [x] **Structured Schema Validation**:
  - Model responses are parsed through `validateCareerArchitectResponse` to prevent arbitrary model injection or malformed data propagation.
- [x] **No Arbitrary Code Execution**: AI responses never generate or execute shell scripts, raw SQL, or dynamic `eval()` strings.

## 4. Secret & Credential Management
- [x] **Zero Secrets in Repository**: `.env*` files are strictly excluded via `.gitignore`.
- [x] **Placeholder Configuration**: `.env.example` contains only sanitized dummy keys.
- [x] **Server-Only Isolation**: Privileged secrets (`SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`) are accessed strictly inside server-side route handlers.
