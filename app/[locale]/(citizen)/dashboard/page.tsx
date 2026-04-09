import Link from "next/link";
import { cookies } from "next/headers";
import {
  TrendingUp,
  CheckCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { RequestsTable } from "@/components/citizen/requests-table";
import { VisaRequest } from "@/types";
import { getVisaRequests } from "@/actions/visa-actions";
import { getAppointments } from "@/actions/booking-actions";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("gb-user");
  
  let user: UserData = {
    id: 0,
    email: "user@example.com",
    first_name: "Utilisateur",
    last_name: "Inconnu",
  };

  if (userCookie?.value) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  // Fetch real visa requests
  const visaResult = await getVisaRequests();
  let visaRequests: VisaRequest[] = [];
  
  if (visaResult.success && visaResult.data) {
    const requestData = Array.isArray(visaResult.data) ? visaResult.data : [visaResult.data];
    visaRequests = requestData.slice(0, 5).map((req: any) => {
      // Map status from backend to frontend status
      let status: "approved" | "pending" | "missing" | "rejected" | "archived" = "pending";
      if (req.status === "approved") status = "approved";
      else if (req.status === "rejected") status = "rejected";
      else if (req.status === "new") status = "missing";
      else if (req.status === "completed") status = "archived";

      return {
        id: req.id,
        reference: req.reference,
        applicantName: fullName,
        nationality: "Guinée-Bissau",
        visaType: req.visa_type,
        submittedAt: new Date(req.submitted_at),
        status,
      };
    });
  }

  // Fetch real appointments
  const appointmentResult = await getAppointments();
  let upcomingAppointment = "N/A";
  
  if (appointmentResult.success && appointmentResult.data) {
    const appointmentData = Array.isArray(appointmentResult.data) ? appointmentResult.data : [appointmentResult.data];
    if (appointmentData.length > 0) {
      const nextAppointment = appointmentData[0];
      const appointmentDate = new Date(nextAppointment.appointment_date);
      upcomingAppointment = appointmentDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
      });
    }
  }

  // Calculate stats from real data
  const pendingCount = visaRequests.filter(r => r.status === "pending" || r.status === "missing").length;
  const completedCount = visaRequests.filter(r => r.status === "approved" || r.status === "archived" || r.status === "rejected").length;

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-6">
      {/* Welcome row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[var(--color-gb-dark)]">
            Bonjour, {user.first_name}
          </h1>
          <p className="text-sm text-muted-foreground capitalize">{today}</p>
        </div>
        <Button
          className="bg-[var(--color-gb-red)] text-white hover:bg-[var(--color-gb-red)]/90 w-fit"
        >
          <Link href="/services/visa">Nouvelle demande</Link>
        </Button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Demandes en cours"
          value={pendingCount}
          icon={TrendingUp}
          color="amber"
        />
        <StatCard
          label="Demandes traitées"
          value={completedCount}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Prochain rendez-vous"
          value={upcomingAppointment}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          label="Total demandes"
          value={visaRequests.length}
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Recent requests */}
      <div className="space-y-4">
        <SectionHeading
          title="Mes demandes récentes"
          action={
            <Link
              href="/dashboard/demandes"
              className="text-sm text-[var(--color-gb-red)] hover:underline"
            >
              Voir tout →
            </Link>
          }
        />
        <div className="bg-white border rounded-[var(--radius-card)] p-4">
          {visaRequests.length > 0 ? (
            <RequestsTable requests={visaRequests} />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune demande trouvée. Commencez par en créer une.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
