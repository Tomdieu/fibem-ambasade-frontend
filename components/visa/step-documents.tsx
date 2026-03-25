"use client";

import { Controller, type Control } from "react-hook-form";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import type { VisaFormData } from "@/types/visa";

interface StepDocumentsProps {
  control: Control<VisaFormData>;
}

const DOCUMENTS = [
  {
    field: "hasPassportScan" as const,
    name: "Scan du passeport",
    description: "Pages d'identité et pages des visas précédents",
  },
  {
    field: "hasPhoto" as const,
    name: "Photo d'identité",
    description: "Photo récente (moins de 6 mois), fond blanc, 35×45 mm",
  },
  {
    field: "hasInvitationLetter" as const,
    name: "Lettre d'invitation",
    description: "Si applicable, lettre officielle de l'invitant",
  },
  {
    field: "hasProofOfAccommodation" as const,
    name: "Justificatif d'hébergement",
    description: "Réservation d'hôtel ou attestation d'hébergement",
  },
  {
    field: "hasProofOfFunds" as const,
    name: "Justificatif de ressources",
    description: "Relevé bancaire ou tout document attestant vos moyens financiers",
  },
] as const;

export function StepDocuments({ control }: StepDocumentsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <AlertDescription>
          Les documents originaux seront vérifiés lors du rendez-vous.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-3">
        {DOCUMENTS.map((doc) => (
          <Controller
            key={doc.field}
            control={control}
            name={doc.field}
            render={({ field }) => (
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <FileText className="size-5 text-(--color-gb-dark) shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">{doc.name}</p>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    {doc.description}
                  </p>
                </div>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                {field.value ? (
                  <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="size-4 text-amber-500 shrink-0" />
                )}
              </div>
            )}
          />
        ))}
      </div>
    </div>
  );
}
