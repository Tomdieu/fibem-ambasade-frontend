"use client";

import { useState, useEffect } from "react";

import { Globe, Menu, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import type { NavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";

import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "./search-dialog";
import Image from "next/image";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

const LOCALE_MAP = { FR: "fr", EN: "en", PT: "pt" } as const;
type Language = keyof typeof LOCALE_MAP;
const LANGUAGE_CYCLE: Language[] = ["FR", "EN", "PT"];

function DesktopNavItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  if (item.children && item.children.length > 0) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="flex w-48 flex-col gap-0.5 p-1">
            {item.children.map((child) => (
              <li key={child.href}>
                <NavigationMenuLink
                  active={pathname === child.href}
                  render={
                    <Link href={child.href} className="w-full" />
                  }
                  className="w-full rounded px-3 py-2 text-xs"
                >
                  {child.label}
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        active={isActive}
        render={<Link href={item.href} />}
        className="inline-flex h-9 w-max items-center justify-center rounded-none px-2.5 py-1.5 text-xs font-medium transition-all hover:bg-muted focus:bg-muted"
      >
        {item.label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export function Header() {
  const scrollY = useScrollPosition();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mainNav } = useNavigation();
  const t = useI18n();

  // Load user from cookie on mount
  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("gb-user="));
    
    if (userCookie) {
      try {
        const userJson = decodeURIComponent(userCookie.split("=")[1]);
        const userData = JSON.parse(userJson);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Detect current locale from the URL
  const currentLocale =
    (["fr", "en", "pt"].find(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    ) as "fr" | "en" | "pt") ?? "fr";

  const currentLang = (
    Object.entries(LOCALE_MAP) as [Language, string][]
  ).find(([, v]) => v === currentLocale)?.[0] ?? "FR";

  const cycleLanguage = () => {
    const nextLang =
      LANGUAGE_CYCLE[
        (LANGUAGE_CYCLE.indexOf(currentLang) + 1) % LANGUAGE_CYCLE.length
      ];
    const nextLocale = LOCALE_MAP[nextLang];
    // Replace locale prefix in current path
    const pathWithoutLocale = pathname.replace(/^\/(fr|en|pt)/, "") || "/";
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  const handleLogout = async () => {
    // Clear user cookie and redirect
    document.cookie = "gb-session=; path=/; max-age=0;";
    document.cookie = "gb-user=; path=/; max-age=0;";
    document.cookie = "gb-role=; path=/; max-age=0;";
    setUser(null);
    router.push(`/${currentLocale}`);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white transition-shadow",
          scrollY > 20 && "shadow-sm"
        )}
      >
        {/* ── Row 1: Logo + utility actions ── */}
        <div className="border-b">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-(--spacing-container)">
            {/* Logo + site name */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/web-app-manifest-192x192.png"
                alt="Logo de l'Ambassade de Guinée-Bissau en France"
                className="h-10 w-10 rounded object-contain"
                width={40}
                height={40}
              />
              <span className="hidden text-sm font-semibold leading-tight text-(--color-gb-dark) sm:block">
                Ambassade de Guinée-Bissau<br />
                <span className="font-normal text-text-muted text-xs">République de Guinée-Bissau · France</span>
              </span>
            </Link>

            {/* Utility actions */}
            <div className="flex items-center gap-1">
              <SearchDialog />

              {/* Auth section — desktop only */}
              <div className="hidden md:flex gap-1 items-center">
                {!isLoading && user ? (
                  <>
                    {/* User info */}
                    <div className="flex items-center gap-2 px-3 py-1">
                      <User className="size-4 text-[var(--color-gb-red)]" />
                      <div className="text-xs">
                        <p className="font-medium text-(--color-gb-dark)">
                          {user.first_name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Dashboard button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-(--color-gb-red) border-(--color-gb-red) hover:bg-gb-red/10"
                      asChild
                    >
                      <Link href={`/${currentLocale}/dashboard`}>
                        {t("citizen.nav_dashboard")}
                      </Link>
                    </Button>

                    {/* Logout button */}
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-(--color-gb-red) hover:bg-gb-red/10"
                    >
                      <LogOut className="size-3.5 mr-1" />
                      {t("citizen.logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Login & Register buttons */}
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Link href={`/${currentLocale}/auth/login`}>{t("auth.login_btn")}</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Link href={`/${currentLocale}/auth/register`}>{t("auth.register_link")}</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Language toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={cycleLanguage}
                aria-label="Changer de langue"
                className="gap-1 text-xs"
              >
                <Globe className="size-3.5" />
                <span>{currentLang}</span>
              </Button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Row 2: Navigation (desktop only) ── */}
        <div className="hidden md:block border-b bg-white">
          <div className="mx-auto max-w-7xl px-(--spacing-container)">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {mainNav.map((item) => (
                  <DesktopNavItem key={item.href} item={item} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <MobileNav
        navItems={mainNav}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        user={user}
        isLoading={isLoading}
        onLogout={handleLogout}
        locale={currentLocale}
      />
    </>
  );
}
