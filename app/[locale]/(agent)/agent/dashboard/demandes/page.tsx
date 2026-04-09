import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AgentRequestsTable } from "@/components/agent/agent-requests-table";
import { getVisaRequests } from "@/actions/visa-actions";
import { VisaRequest } from "@/types";

export default async function AgentDemandesPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("gb-user");
  const roleCookie = cookieStore.get("gb-role");

  // Verify user is authenticated and is an agent
  if (!userCookie || roleCookie?.value !== "agent") {
    redirect("/auth/login");
  }

  // Fetch visa requests visible to agent
  const visaResult = await getVisaRequests();
  let visaRequests: VisaRequest[] = [];

  if (visaResult.success && visaResult.data) {
    const requestData = Array.isArray(visaResult.data)
      ? visaResult.data
      : [visaResult.data];
    visaRequests = requestData;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Demandes de visa</h1>
          <p className="text-gray-500">
            Gérez les demandes de visa assignées et nouvelles demandes en attente.
          </p>
        </div>
        <Link href="/agent/dashboard/demandes/nouveau">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Créer une demande
          </Button>
        </Link>
      </div>

      <AgentRequestsTable initialRequests={visaRequests} />
    </div>
  );
}
