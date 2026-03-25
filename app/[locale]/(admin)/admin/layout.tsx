import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center border-b px-4 gap-2 bg-white">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">
            Administration consulaire
          </span>
        </header>
        <main className="flex-1 bg-[#F7F7F5]">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
