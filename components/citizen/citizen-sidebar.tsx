"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { logoutAction } from "@/actions/auth-actions";
import { cn } from "@/lib/utils";

import { useI18n } from "@/locales/client";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export function CitizenSidebar() {
  const pathname = usePathname();
  const t = useI18n();
  const [user, setUser] = useState<UserData | null>(null);

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
  }, []);

  const navItems = useMemo(() => [
    { label: t("citizen.nav_dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { label: t("citizen.nav_requests"), href: "/dashboard/demandes", icon: FileText },
    { label: t("citizen.nav_appointments"), href: "/dashboard/rendez-vous", icon: Calendar },
    { label: t("citizen.nav_profile"), href: "/dashboard/profil", icon: User },
  ], [t]);

  const fullName = user ? `${user.first_name} ${user.last_name}` : "Utilisateur";
  const initials = user
    ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    : "U";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="bg-[var(--color-gb-red)]/10 text-[var(--color-gb-red)] text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-medium truncate">{fullName}</span>
            <Badge variant="secondary" className="w-fit text-xs px-1.5 py-0">
              {t("citizen.role_citizen")}
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  render={
                    <Link
                      href={item.href}
                      className={cn(
                        isActive &&
                          "border-l-2 border-[var(--color-gb-red)] bg-[var(--color-gb-red)]/10 text-[var(--color-gb-red)] pl-[calc(0.5rem-2px)]"
                      )}
                    />
                  }
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-none px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-4" />
            <span>{t("citizen.logout")}</span>
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
