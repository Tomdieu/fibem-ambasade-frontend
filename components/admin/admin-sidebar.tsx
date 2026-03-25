"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Inbox,
  Calendar,
  Users,
  FolderOpen,
  BarChart2,
  Download,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

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
import { logoutAction } from "@/actions/auth-actions";

const gestionItems = [
  { label: "Demandes consulaires", href: "/admin/demandes", icon: Inbox },
  { label: "Rendez-vous", href: "/admin/rendez-vous", icon: Calendar },
  { label: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
  { label: "Documents", href: "/admin/documents", icon: FolderOpen },
];

const rapportsItems = [
  { label: "Statistiques", href: "/admin/statistiques", icon: BarChart2 },
  { label: "Exports", href: "/admin/exports", icon: Download },
];

const systemeItems = [
  { label: "Paramètres", href: "/admin/parametres", icon: Settings },
  { label: "Journal d'audit", href: "/admin/audit", icon: Shield },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-gb-dark border-r-0">
      {/* Header */}
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-gb-red flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">GB</span>
          </div>
          <span className="text-white text-sm font-medium leading-tight">
            Back-office Consulaire
          </span>
        </div>
      </SidebarHeader>

      {/* Nav groups */}
      <SidebarContent>
        {/* GESTION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-xs uppercase tracking-wider px-2">
            Gestion
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {gestionItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className={
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* RAPPORTS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-xs uppercase tracking-wider px-2">
            Rapports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {rapportsItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className={
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SYSTÈME */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 text-xs uppercase tracking-wider px-2">
            Système
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemeItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className={
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Marie Dupont</p>
            <p className="text-white/60 text-xs truncate">Administratrice</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center justify-center w-8 h-8 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
