"use client";

import { Controller, type Control } from "react-hook-form";
import { Shield } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { VisaFormData } from "@/types/visa";
import { useI18n } from "@/locales/client";

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
  const t = useI18n();

  return (
    <div className="flex flex-col gap-6">
      {/* Identity section */}
      <div>
        <h3 className="text-sm font-semibold text-(--color-gb-dark) mb-3">
          {t("visa_form.section_identity")}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <SummaryRow label={t("visa_form.last_name_label")} value={formData.lastName} />
          <SummaryRow label={t("visa_form.first_name_label")} value={formData.firstName} />
          <SummaryRow label={t("visa_form.birth_date_label")} value={formData.birthDate} />
          <SummaryRow label={t("visa_form.birth_place_label")} value={formData.birthPlace} />
          <SummaryRow label={t("visa_form.nationality_label")} value={formData.nationality} />
          <SummaryRow label={t("visa_form.passport_number_label")} value={formData.passportNumber} />
          <SummaryRow label={t("visa_form.passport_expiry_label")} value={formData.passportExpiry} />
          <SummaryRow label={t("visa_form.visa_type_label")} value={formData.visaType} />
          <SummaryRow
            label={t("visa_form.address_label")}
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
          {t("visa_form.section_travel")}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <SummaryRow label={t("visa_form.departure_date_label")} value={formData.departureDate} />
          <SummaryRow label={t("visa_form.return_date_label")} value={formData.returnDate} />
          <SummaryRow label={t("visa_form.destination_city_label")} value={formData.destinationCity} />
          <SummaryRow label={t("visa_form.accommodation_label")} value={formData.accommodationType} />
          <SummaryRow label={t("visa_form.purpose_label")} value={formData.purposeOfVisit} />
          {formData.invitingPersonName && (
            <SummaryRow label={t("visa_form.inviting_person_name_label")} value={formData.invitingPersonName} />
          )}
        </div>
      </div>

      {/* Documents section */}
      <div>
        <h3 className="text-sm font-semibold text-(--color-gb-dark) mb-3">
          {t("visa_form.section_documents")}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <SummaryRow
            label={t("visa_form.passport_required")}
            value={formData.hasPassportScan ? t("visa_form.yes") : t("visa_form.no")}
          />
          <SummaryRow
            label={t("visa_form.photos_required")}
            value={formData.hasPhoto ? t("visa_form.yes") : t("visa_form.no")}
          />
          <SummaryRow
            label={t("visa_form.invitation_required")}
            value={formData.hasInvitationLetter ? t("visa_form.yes") : t("visa_form.no")}
          />
          <SummaryRow
            label={t("visa_form.accommodation_proof")}
            value={formData.hasProofOfAccommodation ? t("visa_form.yes") : t("visa_form.no")}
          />
          <SummaryRow
            label={t("visa_form.funds_proof")}
            value={formData.hasProofOfFunds ? t("visa_form.yes") : t("visa_form.no")}
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
                {t("visa_form.certify_info")}
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
          {t("visa_form.privacy_notice")}
        </p>
      </div>
    </div>
  );
}
