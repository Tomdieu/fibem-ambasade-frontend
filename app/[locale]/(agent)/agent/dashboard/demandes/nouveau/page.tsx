import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AgentCreateVisaRequestForm } from "@/components/agent/agent-create-visa-form";

export default async function CreateVisaRequestPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("gb-user");
  const roleCookie = cookieStore.get("gb-role");

  // Verify user is authenticated and is an agent
  if (!userCookie || roleCookie?.value !== "agent") {
    redirect("/auth/login");
  }

  return (
    <div className="container max-w-3xl mx-auto py-6 p-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Créer une demande de visa</h1>
          <p className="text-gray-500">
            Créez une nouvelle demande de visa pour un citoyen.
          </p>
        </div>

        <AgentCreateVisaRequestForm />
      </div>
    </div>
  );
}
