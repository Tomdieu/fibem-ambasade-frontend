"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { submitVisaApplication } from "@/actions/visa-actions";
import { visaFormSchema, VISA_STEPS, type VisaFormData } from "@/types/visa";

import { StepPersonalInfo } from "./step-personal-info";
import { StepTravelDetails } from "./step-travel-details";
import { StepDocuments } from "./step-documents";
import { StepConfirmation } from "./step-confirmation";

const STEP_FIELDS: Record<number, (keyof VisaFormData)[]> = {
  1: [
    "lastName",
    "firstName",
    "birthDate",
    "birthPlace",
    "nationality",
    "passportNumber",
    "passportExpiry",
    "addressFrance",
    "postalCode",
    "city",
    "visaType",
  ],
  2: [
    "departureDate",
    "returnDate",
    "purposeOfVisit",
    "destinationCity",
    "accommodationType",
  ],
  3: [],
  4: ["confirmation"],
};

export function VisaFormWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    watch,
    trigger,
    getValues,
    handleSubmit,
  } = useForm<VisaFormData>({
    resolver: zodResolver(visaFormSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      birthDate: "",
      birthPlace: "",
      nationality: "",
      passportNumber: "",
      passportExpiry: "",
      addressFrance: "",
      postalCode: "",
      city: "",
      visaType: "",
      departureDate: "",
      returnDate: "",
      purposeOfVisit: "",
      destinationCity: "",
      invitingPersonName: "",
      invitingPersonAddress: "",
      accommodationType: "",
      hasPassportScan: false,
      hasPhoto: false,
      hasInvitationLetter: false,
      hasProofOfAccommodation: false,
      hasProofOfFunds: false,
      additionalNotes: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      confirmation: false as any,
    },
  });

  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep];
    const valid = await trigger(fields);
    if (valid) {
      setCurrentStep((s) => s + 1);
    }
  };

  const onSubmit = async (data: VisaFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitVisaApplication(data);
      if (result.success && result.reference) {
        setReference(result.reference);
        setSubmitted(true);
      } else {
        setSubmitError(result.error ?? "Une erreur est survenue.");
      }
    } catch {
      setSubmitError("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && reference) {
    return (
      <div className="max-w-2xl mx-auto bg-white border rounded-card p-8 mt-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="size-8 text-emerald-500" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-(--color-gb-dark) mb-2">
          Demande soumise avec succès
        </h2>
        <p className="text-sm text-(--color-text-muted) mb-4">
          Votre demande de visa a été enregistrée. Vous recevrez une confirmation par email.
        </p>
        <div className="inline-flex items-center gap-2 bg-(--color-surface-page) rounded-lg px-6 py-3">
          <span className="text-xs text-(--color-text-muted)">Numéro de référence</span>
          <span className="text-sm font-mono font-semibold text-(--color-gb-dark)">
            {reference}
          </span>
        </div>
        <p className="text-xs text-(--color-text-muted) mt-4">
          Conservez ce numéro pour le suivi de votre dossier.
        </p>
      </div>
    );
  }

  const progressValue = (currentStep / 4) * 100;
  const currentStepData = VISA_STEPS[currentStep - 1];

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-4">
        {VISA_STEPS.map((step, index) => {
          const stepNum = step.id;
          const isCompleted = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                    isCompleted || isCurrent
                      ? "bg-(--color-gb-red) text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? <Check className="size-4" /> : stepNum}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1 text-center hidden md:block max-w-20 leading-tight",
                    isCurrent ? "text-(--color-gb-dark) font-medium" : "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < VISA_STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-2 mb-5",
                    currentStep > stepNum ? "bg-(--color-gb-red)" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <Progress value={progressValue} className="mb-6" />

      {/* Form body */}
      <div className="bg-white border rounded-card p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-(--color-gb-dark)">
            {currentStepData.title}
          </h2>
          <p className="text-xs text-(--color-text-muted) mt-1">
            {currentStepData.description}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && <StepPersonalInfo control={control} />}
          {currentStep === 2 && (
            <StepTravelDetails control={control} watch={watch} />
          )}
          {currentStep === 3 && <StepDocuments control={control} />}
          {currentStep === 4 && (
            <StepConfirmation formData={getValues()} control={control} />
          )}

          {submitError && (
            <p className="text-red-500 text-xs mt-4">{submitError}</p>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Précédent
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-(--color-gb-red) text-white hover:bg-gb-red/90"
              >
                Suivant →
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-(--color-gb-red) text-white hover:bg-gb-red/90"
              >
                {isSubmitting ? "Envoi en cours..." : "Soumettre la demande"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
