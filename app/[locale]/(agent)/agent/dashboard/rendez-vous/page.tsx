import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AgentAppointmentsTable } from "@/components/agent/agent-appointments-table";
import { getAppointments } from "@/actions/booking-actions";
import { Appointment } from "@/types/appointment";

export default async function AgentRendezVousPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("gb-user");
  const roleCookie = cookieStore.get("gb-role");

  // Verify user is authenticated and is an agent
  if (!userCookie || roleCookie?.value !== "agent") {
    redirect("/auth/login");
  }

  // Fetch appointments visible to agent
  const appointmentResult = await getAppointments();
  let appointments: Appointment[] = [];

  if (appointmentResult.success && appointmentResult.data) {
    const appointmentData = Array.isArray(appointmentResult.data)
      ? appointmentResult.data
      : [appointmentResult.data];
    appointments = appointmentData;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Rendez-vous</h1>
          <p className="text-gray-500">
            Gérez les rendez-vous assignés et les rendez-vous en attente.
          </p>
        </div>
        <Link href="/agent/dashboard/rendez-vous/nouveau">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Créer un rendez-vous
          </Button>
        </Link>
      </div>

      <AgentAppointmentsTable initialAppointments={appointments} />
    </div>
  );
}
