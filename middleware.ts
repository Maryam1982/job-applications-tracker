import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// 1) Define all public routes here
const PUBLIC_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/guest",
  "/",
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Determine if route is publicly accessible
  const path = req.nextUrl.pathname;
  const isPublic = PUBLIC_ROUTES.includes(path) || path.startsWith("/guest");

  // Initialize Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: Partial<CookieOptions> = {}) {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string) {
          res.cookies.delete(name);
        },
      },
    }
  );

  // Get the currently authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2) If route is protected AND there is no user → redirect to login
  if (!isPublic && !user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectedFrom", path); // optional feature
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to visit a public auth page → send back
  if (user && ["/login", "/signup"].includes(path)) {
    const previous = req.headers.get("referer");

    // If referer exists AND isn't the same auth page, redirect back
    if (previous && !previous.endsWith(path)) {
      return NextResponse.redirect(previous);
    }

    // Otherwise fallback to home
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    // Match all routes EXCEPT static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.css$|.*\\.js$).*)",
  ],
};
