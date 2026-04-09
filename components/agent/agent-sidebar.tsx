"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Inbox, Calendar, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth-actions";
import { useI18n } from "@/locales/client";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export function AgentSidebar() {
  const pathname = usePathname();
  const t = useI18n();
  const [user, setUser] = useState<UserData>({
    id: 0,
    email: "agent@ambassade.gw",
    first_name: "Agent",
    last_name: "Consulaire",
  });

  useEffect(() => {
    // Parse user from browser cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const userCookie = getCookie("gb-user");
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setUser(userData);
      } catch {
        // Keep default user
      }
    }
  }, []);

  const gestionItems = [
    {
      label: t("agent.demandes_a_traiter"),
      href: "/agent/dashboard/demandes",
      icon: Inbox,
    },
    {
      label: t("agent.rendez_vous"),
      href: "/agent/dashboard/rendez-vous",
      icon: Calendar,
    },
  ];

  return (
    <Sidebar className="border-r">
      {/* Header with branding */}
      <SidebarHeader className="border-b px-4 py-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {t("agent.backoffice_title")}
              </span>
              <span className="text-xs text-gray-500">Agent Portal</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="py-4">
        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {t("agent.gestion")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {gestionItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Link href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User info & logout */}
      <SidebarFooter className="border-t px-4 py-4">
        <div className="space-y-4">
          {/* User Card */}
          <div className="rounded-lg bg-gray-50 p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t("agent.logout")}
            </Button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
