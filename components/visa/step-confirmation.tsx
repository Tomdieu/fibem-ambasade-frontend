"use client";

import { Controller, type Control } from "react-hook-form";
import { Shield } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { VisaFormData } from "@/types/visa";

interface StepConfirmationProps {
  formData: Partial<VisaFormData>;
  control: Control<VisaFormData>;
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs text-(--color-text-muted)">{label}</p>
      <p className="text-xs font-medium mt-0.5">{value || "—"}</p>
    </div>
  );
}

export function StepConfirmation({ formData, control }: StepConfirmationProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Identity section */}
      <div>
        <h3 className="text-sm font-semibold text-(--color-gb-dark) mb-3">
          Identité
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <SummaryRow label="Nom" value={formData.lastName} />
          <SummaryRow label="Prénom" value={formData.firstName} />
          <SummaryRow label="Date de naissance" value={formData.birthDate} />
          <SummaryRow label="Lieu de naissance" value={formData.birthPlace} />
          <SummaryRow label="Nationalité" value={formData.nationality} />
          <SummaryRow label="N° de passeport" value={formData.passportNumber} />
          <SummaryRow label="Expiration passeport" value={formData.passportExpiry} />
          <SummaryRow label="Type de visa" value={formData.visaType} />
          <SummaryRow
            label="Adresse en France"
            value={
              formData.addressFrance
                ? `${formData.addressFrance}, ${formData.postalCode} ${formData.city}`
                : undefined
            }
          />
        </div>
      </div>

      {/* Travel section */}
      <div>
        <h3 className="text-sm font-semibold text-(--color-gb-dark) mb-3">
          Voyage
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <SummaryRow label="Date de départ" value={formData.departureDate} />
          <SummaryRow label="Date de retour" value={formData.returnDate} />
          <SummaryRow label="Ville de destination" value={formData.destinationCity} />
          <SummaryRow label="Hébergement" value={formData.accommodationType} />
          <SummaryRow label="Motif du voyage" value={formData.purposeOfVisit} />
          {formData.invitingPersonName && (
            <SummaryRow label="Personne invitante" value={formData.invitingPersonName} />
          )}
        </div>
      </div>

      {/* Documents section */}
      <div>
        <h3 className="text-sm font-semibold text-(--color-gb-dark) mb-3">
          Documents
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <SummaryRow
            label="Scan passeport"
            value={formData.hasPassportScan ? "Oui" : "Non"}
          />
          <SummaryRow
            label="Photo d'identité"
            value={formData.hasPhoto ? "Oui" : "Non"}
          />
          <SummaryRow
            label="Lettre d'invitation"
            value={formData.hasInvitationLetter ? "Oui" : "Non"}
          />
          <SummaryRow
            label="Justificatif hébergement"
            value={formData.hasProofOfAccommodation ? "Oui" : "Non"}
          />
          <SummaryRow
            label="Justificatif ressources"
            value={formData.hasProofOfFunds ? "Oui" : "Non"}
          />
        </div>
      </div>

      {/* Confirmation checkbox */}
      <Controller
        control={control}
        name="confirmation"
        render={({ field, fieldState }) => (
          <div>
            <div
              className={cn(
                "flex items-start gap-3 p-3 border rounded-lg cursor-pointer",
                fieldState.error && "border-red-400"
              )}
              onClick={() => field.onChange(!field.value)}
            >
              <Checkbox
                checked={field.value === true}
                onCheckedChange={field.onChange}
                className="mt-0.5"
              />
              <Label className="cursor-pointer leading-relaxed">
                Je certifie que les informations fournies sont exactes et complètes.
              </Label>
            </div>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Security notice */}
      <div className="bg-(--color-surface-page) rounded-lg p-4 flex gap-2 text-xs text-(--color-text-muted) mt-4">
        <Shield className="size-4 shrink-0 text-(--color-gb-green) mt-0.5" />
        <p>
          Vos données personnelles sont traitées de manière confidentielle et sécurisée
          conformément au RGPD. Elles ne seront utilisées qu&apos;aux fins du traitement de
          votre demande de visa.
        </p>
      </div>
    </div>
  );
}
