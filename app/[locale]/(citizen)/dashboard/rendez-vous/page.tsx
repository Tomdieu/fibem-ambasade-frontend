import { cookies } from "next/headers";
import { Calendar, Clock, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAppointments } from "@/actions/booking-actions";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Appointment {
  id: string;
  reference: string;
  date: Date;
  time: string;
  type: string;
  location: string;
  status: "confirmed" | "pending" | "cancelled";
}

export default async function AppointmentsPage() {
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

  // Fetch real appointments from backend
  const result = await getAppointments();
  let appointments: Appointment[] = [];

  if (result.success && result.data) {
    // Convert backend API response to Appointment format
    const appointmentData = Array.isArray(result.data) ? result.data : [result.data];
    appointments = appointmentData.map((apt: any) => ({
      id: apt.id,
      reference: apt.confirmation_number,
      date: new Date(apt.appointment_date),
      time: apt.appointment_time,
      type: apt.service_type,
      location: "Ambassade de Guinée-Bissau, Lisbon",
      status: apt.status === "scheduled" ? "confirmed" : apt.status === "completed" ? "confirmed" : "pending",
    }));
  }

  return (
    <div className="space-y-6">
      <SectionHeading title="Mes rendez-vous" />

      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white border rounded-[var(--radius-card)] p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--color-gb-dark)]">
                      {apt.type}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {apt.status === "confirmed" ? "Confirmé" : "En attente"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Référence: {apt.reference}
                  </p>

                  <div className="space-y-1 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="size-4 text-[var(--color-gb-red)]" />
                      <span>
                        {apt.date.toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="size-4 text-[var(--color-gb-red)]" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-4 text-[var(--color-gb-red)]" />
                      <span>{apt.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              {result.success
                ? "Aucun rendez-vous trouvé."
                : `Erreur: ${result.error || "Impossible de charger les rendez-vous."}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
