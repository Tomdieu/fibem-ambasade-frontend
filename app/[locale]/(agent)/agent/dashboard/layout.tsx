import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AgentSidebar } from "@/components/agent/agent-sidebar";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AgentSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center border-b px-4 gap-2 bg-white">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">
            Gestion des demandes
          </span>
        </header>
        <main className="flex-1 bg-[#F7F7F5]">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
