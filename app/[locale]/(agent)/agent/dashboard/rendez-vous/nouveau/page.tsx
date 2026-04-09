import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AgentCreateAppointmentForm } from "@/components/agent/agent-create-appointment-form";

export default async function CreateAppointmentPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("gb-user");
  const roleCookie = cookieStore.get("gb-role");

  // Verify user is authenticated and is an agent
  if (!userCookie || roleCookie?.value !== "agent") {
    redirect("/auth/login");
  }

  return (
    <div className="container max-w-2xl mx-auto py-6 p-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Créer un rendez-vous</h1>
          <p className="text-gray-500">
            Créez un nouveau rendez-vous pour un citoyen.
          </p>
        </div>

        <AgentCreateAppointmentForm />
      </div>
    </div>
  );
}
