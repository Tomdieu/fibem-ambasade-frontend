import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getVisaRequest } from "@/actions/visa-actions";
import { AgentRequestDetail } from "@/components/agent/agent-request-detail";

export default async function AgentRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("gb-user");
  const roleCookie = cookieStore.get("gb-role");

  // Verify user is authenticated and is an agent
  if (!userCookie || roleCookie?.value !== "agent") {
    redirect(`/${locale}/auth/login`);
  }

  // Fetch visa request details
  const result = await getVisaRequest(id);

  if (!result.success || !result.data) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Erreur</h1>
        <p className="text-gray-600">{result.error || "Demande non trouvée."}</p>
      </div>
    );
  }

  return <AgentRequestDetail request={result.data} />;
}
