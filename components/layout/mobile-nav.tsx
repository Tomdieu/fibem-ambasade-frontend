"use client";

import Link from "next/link";

import type { NavItem } from "@/types";
import { useI18n } from "@/locales/client";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  user?: UserData | null;
  isLoading?: boolean;
  onLogout?: () => void;
  locale?: string;
}

export function MobileNav({
  navItems,
  isOpen,
  onClose,
  user,
  isLoading,
  onLogout,
  locale = "fr",
}: MobileNavProps) {
  const t = useI18n();
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-75 sm:max-w-75 p-0">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="text-sm font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="overflow-y-auto px-4 py-2">
          <Accordion className="w-full">
            {navItems.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <AccordionItem key={item.href} value={item.href}>
                    <AccordionTrigger className="py-3 text-sm font-medium">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1 pb-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block rounded px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              return (
                <div key={item.href} className="border-b last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex w-full items-center py-3 text-sm font-medium transition-colors hover:text-(--color-gb-green)"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </Accordion>
        </nav>

        {/* Auth Links */}
        <div className="border-t px-4 py-4 space-y-2">
          {!isLoading && user ? (
            <>
              {/* User info section */}
              <div className="flex items-center gap-2 pb-2 mb-2 border-b">
                <User className="size-4 text-[var(--color-gb-red)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-(--color-gb-dark) truncate">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Links for authenticated user */}
              <Link
                href={`/${locale}/dashboard`}
                onClick={onClose}
                className="block w-full text-center py-2 px-3 text-sm font-medium text-(--color-gb-red) hover:bg-gb-red/10 rounded transition-colors"
              >
                {t("citizen.nav_dashboard")}
              </Link>

              {/* Logout button */}
              <Button
                onClick={() => {
                  onLogout?.();
                  onClose();
                }}
                variant="ghost"
                size="sm"
                className="w-full text-xs text-(--color-gb-red) hover:bg-gb-red/10"
              >
                <LogOut className="size-3.5 mr-1" />
                {t("citizen.logout")}
              </Button>
            </>
          ) : (
            <>
              {/* Login & Register for unauthenticated users */}
              <Link
                href={`/${locale}/auth/login`}
                onClick={onClose}
                className="block w-full text-center py-2 text-sm font-medium text-(--color-gb-red) hover:text-(--color-gb-red)/80 transition-colors"
              >
                {t("auth.login_btn")}
              </Link>
              <Link
                href={`/${locale}/auth/register`}
                onClick={onClose}
                className="block w-full text-center py-2 px-4 text-sm font-medium bg-(--color-gb-red) text-white rounded-[var(--radius-card)] hover:bg-(--color-gb-red)/90 transition-colors"
              >
                {t("auth.register_link")}
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
