import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["fr", "en", "pt"] as const;
const DEFAULT_LOCALE = "fr";
type Locale = (typeof LOCALES)[number];

function getLocale(request: NextRequest): Locale {
  // 1. Check cookie set by the language toggle (next-international uses "Next-Locale")
  const cookieLocale = request.cookies.get("Next-Locale")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  // 2. Detect from Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const locale of LOCALES) {
    if (acceptLang.toLowerCase().startsWith(locale)) return locale;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale prefix
  const pathnameLocale = LOCALES.find(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameLocale) {
    // No locale in URL — redirect to detected locale
    const locale = getLocale(request);
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Auth protection
  const pathWithoutLocale = pathname.slice(pathnameLocale.length + 1) || "/";
  const session = request.cookies.get("gb-session");
  const role = request.cookies.get("gb-role")?.value;

  const isProtectedDashboard = pathWithoutLocale.startsWith("/dashboard");
  const isProtectedAdmin = pathWithoutLocale.startsWith("/admin");
  const isAuthPage = pathWithoutLocale.startsWith("/auth");

  // Protect dashboard routes - require citizen role and session
  if (isProtectedDashboard && !session) {
    const loginUrl = new URL(`/${pathnameLocale}/auth/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin routes - require admin role and session
  if (isProtectedAdmin && (!session || role !== "admin")) {
    const loginUrl = new URL(`/${pathnameLocale}/auth/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (isAuthPage && session) {
    const redirectPath = role === "admin" ? "admin" : "dashboard";
    return NextResponse.redirect(
      new URL(`/${pathnameLocale}/${redirectPath}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
