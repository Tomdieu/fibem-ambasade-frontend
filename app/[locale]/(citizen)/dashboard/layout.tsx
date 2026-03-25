import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { CitizenSidebar } from "@/components/citizen/citizen-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <CitizenSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center border-b px-4 gap-2">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Espace citoyen</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
