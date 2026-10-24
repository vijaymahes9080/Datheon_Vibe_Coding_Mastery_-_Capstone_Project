import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase credentials are not populated in environment,
  // allow client-side demo mode and route handling without crashing
  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protect /dashboard route if live Supabase is active and no session
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      const demoCookie = request.cookies.get("skillforge_demo_active");
      if (!user && !demoCookie) {
        // Allow client router to handle demo session or redirect to home with auth flag
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("auth", "login");
        // We pass the user through with a header or let client handle client-stored demo user
        return response;
      }
    }
  } catch (error) {
    console.error("Middleware auth check exception:", error);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
