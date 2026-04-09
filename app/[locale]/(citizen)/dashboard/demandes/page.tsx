import { cookies } from "next/headers";
import { SectionHeading } from "@/components/ui/section-heading";
import { RequestsTable } from "@/components/citizen/requests-table";
import { VisaRequest } from "@/types";
import { getVisaRequests } from "@/actions/visa-actions";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export default async function RequestsPage() {
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

  // Fetch real visa requests from backend
  const result = await getVisaRequests();
  let requests: VisaRequest[] = [];

  if (result.success && result.data) {
    // Convert backend API response to VisaRequest format
    requests = Array.isArray(result.data) ? result.data : [result.data];
    requests = requests.map((req: any) => ({
      id: req.id,
      reference: req.reference,
      applicantName: req.applicant_name || `${req.first_name} ${req.last_name}`,
      nationality: req.nationality,
      visaType: req.visa_type,
      submittedAt: new Date(req.submitted_at),
      status: req.status,
    }));
  }

  return (
    <div className="space-y-6">
      <SectionHeading title="Mes demandes de visa" />
      <div className="bg-white border rounded-[var(--radius-card)] p-4">
        {requests.length > 0 ? (
          <RequestsTable requests={requests} />
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              {result.success
                ? "Aucune demande de visa trouvée."
                : `Erreur: ${result.error || "Impossible de charger les demandes."}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
