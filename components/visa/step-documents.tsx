"use client";

import { Controller, type Control } from "react-hook-form";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import type { VisaFormData } from "@/types/visa";

import { useI18n } from "@/locales/client";

interface StepDocumentsProps {
  control: Control<VisaFormData>;
}

export function StepDocuments({ control }: StepDocumentsProps) {
  const t = useI18n();

  const DOCUMENTS = [
    {
      field: "hasPassportScan" as const,
      name: t("step_documents.doc_passport"),
      description: t("step_documents.doc_passport_desc"),
    },
    {
      field: "hasPhoto" as const,
      name: t("step_documents.doc_photo"),
      description: t("step_documents.doc_photo_desc"),
    },
    {
      field: "hasInvitationLetter" as const,
      name: t("step_documents.doc_invitation"),
      description: t("step_documents.doc_invitation_desc"),
    },
    {
      field: "hasProofOfAccommodation" as const,
      name: t("step_documents.doc_accommodation"),
      description: t("step_documents.doc_accommodation_desc"),
    },
    {
      field: "hasProofOfFunds" as const,
      name: t("step_documents.doc_funds"),
      description: t("step_documents.doc_funds_desc"),
    },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <AlertDescription>
          {t("step_documents.alert_info")}
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
