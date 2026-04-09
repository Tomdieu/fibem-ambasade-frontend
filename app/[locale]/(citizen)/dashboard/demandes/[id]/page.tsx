import { cookies } from "next/headers";
import { ArrowLeft, FileText, Calendar, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getVisaRequest } from "@/actions/visa-actions";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface VisaRequestDetail {
  id: number;
  reference: string;
  visa_type: string;
  status: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  nationality: string;
  passport_number: string;
  passport_expiry: string;
  address_france: string;
  postal_code: string;
  city: string;
  email: string;
  purpose_of_visit: string;
  submitted_at: string;
  updated_at: string;
}

export default async function VisaRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;

  console.log(id, locale);

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

  // Fetch real visa request details
  const result = await getVisaRequest(id);

  if (!result.success || !result.data) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/demandes"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-gb-red)] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Retour aux demandes
        </Link>

        <div className="text-center py-8">
          <p className="text-red-600 font-medium">
            {result.error || "Demande non trouvée"}
          </p>
        </div>
      </div>
    );
  }

  const req: VisaRequestDetail = result.data;

  // Status mapping
  const statusMap: Record<string, { label: string; color: string }> = {
    new: { label: "Nouveau", color: "bg-blue-100 text-blue-700" },
    pending: { label: "En attente", color: "bg-amber-100 text-amber-700" },
    approved: { label: "Approuvé", color: "bg-green-100 text-green-700" },
    rejected: { label: "Rejeté", color: "bg-red-100 text-red-700" },
    completed: { label: "Complété", color: "bg-green-100 text-green-700" },
  };

  const statusInfo = statusMap[req.status] || statusMap.new;

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/demandes"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-gb-red)] hover:underline"
          >
            <ArrowLeft className="size-4" />
            Retour
          </Link>
          <div>
            <h1 className="text-2xl font-medium text-[var(--color-gb-dark)]">
              Détails de la demande
            </h1>
            <p className="text-sm text-muted-foreground">{req.reference}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Main details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Request Information */}
          <div className="bg-white border rounded-[var(--radius-card)] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
              Informations de la demande
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Type de visa
                </label>
                <p className="text-sm font-medium">{req.visa_type}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Référence
                </label>
                <p className="text-sm font-mono font-medium">{req.reference}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Date de soumission
                </label>
                <p className="text-sm">
                  {new Date(req.submitted_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Objectif du visa
                </label>
                <p className="text-sm">{req.purpose_of_visit || "Non spécifié"}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border rounded-[var(--radius-card)] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Prénom
                </label>
                <p className="text-sm">{req.first_name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Nom
                </label>
                <p className="text-sm">{req.last_name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Date de naissance
                </label>
                <p className="text-sm">
                  {new Date(req.birth_date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Lieu de naissance
                </label>
                <p className="text-sm">{req.birth_place}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Nationalité
                </label>
                <p className="text-sm">{req.nationality}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Email
                </label>
                <p className="text-sm">{req.email}</p>
              </div>
            </div>
          </div>

          {/* Passport Information */}
          <div className="bg-white border rounded-[var(--radius-card)] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
              Informations du passeport
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Numéro du passeport
                </label>
                <p className="text-sm font-mono">{req.passport_number}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Expiration du passeport
                </label>
                <p className="text-sm">
                  {new Date(req.passport_expiry).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white border rounded-[var(--radius-card)] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
              Adresse en France
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Adresse
                </label>
                <p className="text-sm">{req.address_france}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Code postal
                  </label>
                  <p className="text-sm">{req.postal_code}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Ville
                  </label>
                  <p className="text-sm">{req.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Summary */}
        <div className="space-y-4">
          {/* Status card */}
          <div className="bg-white border rounded-[var(--radius-card)] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
              Statut actuel
            </h3>
            <div className={`p-4 rounded-lg ${statusInfo.color} text-center font-medium`}>
              {statusInfo.label}
            </div>

            <div className="mt-4 space-y-2 border-t pt-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block">
                  Soumise le
                </label>
                <p className="text-xs text-muted-foreground">
                  {new Date(req.submitted_at).toLocaleString("fr-FR")}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block">
                  Mise à jour
                </label>
                <p className="text-xs text-muted-foreground">
                  {new Date(req.updated_at).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border rounded-[var(--radius-card)] p-6 space-y-2">
            <h3 className="text-lg font-semibold text-[var(--color-gb-dark)] mb-4">
              Actions
            </h3>
            <Button className="w-full bg-[var(--color-gb-red)] text-white hover:bg-[var(--color-gb-red)]/90" disabled>
              <FileText className="size-4 mr-2" />
              Télécharger le fichier
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Contacter un agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
