"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  FileCheck,
  FileText,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { bookAppointment } from "@/actions/booking-actions";
import { bookingSchema, type BookingFormData } from "@/types/appointment";
import type { ServiceType } from "@/types";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
] as const;

const SERVICES: {
  value: ServiceType;
  label: string;
  icon: React.ReactNode;
  duration: string;
}[] = [
  {
    value: "visa",
    label: "Demande de visa",
    icon: <FileText className="size-4 shrink-0" />,
    duration: "45 min",
  },
  {
    value: "passeport",
    label: "Passeport",
    icon: <BookOpen className="size-4 shrink-0" />,
    duration: "30 min",
  },
  {
    value: "legalisation",
    label: "Légalisation",
    icon: <FileCheck className="size-4 shrink-0" />,
    duration: "20 min",
  },
  {
    value: "rendezvous",
    label: "Rendez-vous général",
    icon: <Calendar className="size-4 shrink-0" />,
    duration: "15 min",
  },
];

export function BookingWizard() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceType>("visa");
  const [confirmationNumber, setConfirmationNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: "visa",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const handleStepOneNext = () => {
    if (!selectedDate || !selectedTime) return;
    setStep(2);
  };

  const onSubmitAttendee = () => {
    setStep(3);
  };

  const onConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const values = getValues();
      const data: BookingFormData = {
        ...values,
        serviceType: selectedService,
        date: selectedDate,
        time: selectedTime,
      };
      const result = await bookAppointment(data);
      if (result.success && result.confirmationNumber) {
        setConfirmationNumber(result.confirmationNumber);
      } else {
        setSubmitError(result.error ?? "Une erreur est survenue.");
      }
    } catch {
      setSubmitError("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formValues = getValues();

  return (
    <div className="max-w-5xl mx-auto border rounded-card overflow-hidden lg:flex mt-8">
      {/* Left panel */}
      <div className="lg:w-[38%] bg-(--color-surface-page) border-r p-6 flex flex-col gap-4">
        <h2 className="text-xl font-medium text-(--color-gb-dark)">
          Prise de rendez-vous
        </h2>

        <RadioGroup
          value={selectedService}
          onValueChange={(v) => setSelectedService(v as ServiceType)}
          className="flex flex-col gap-2"
        >
          {SERVICES.map((service) => (
            <label
              key={service.value}
              className={cn(
                "flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors",
                selectedService === service.value
                  ? "border-(--color-gb-red) bg-(--color-gb-red)/5"
                  : "border-border bg-white hover:bg-gray-50"
              )}
            >
              <RadioGroupItem value={service.value} />
              <div className="flex items-start gap-2 flex-1">
                {service.icon}
                <div>
                  <p className="text-xs font-medium">{service.label}</p>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    {service.duration}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </RadioGroup>

        <Separator />

        <div className="flex items-start gap-2 text-sm text-(--color-text-muted)">
          <MapPin className="size-4 shrink-0 mt-0.5 text-(--color-gb-red)" />
          <span>24 Rue de la Pompe, 75116 Paris</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="lg:w-[62%] bg-white p-6">
        {confirmationNumber ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center gap-4">
            <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="size-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-(--color-gb-dark)">
              Rendez-vous confirmé
            </h3>
            <p className="text-sm text-(--color-text-muted)">
              Votre rendez-vous a été enregistré avec succès.
            </p>
            <div className="inline-flex items-center gap-2 bg-(--color-surface-page) rounded-lg px-6 py-3">
              <span className="text-xs text-(--color-text-muted)">
                Numéro de confirmation
              </span>
              <span className="text-sm font-mono font-semibold text-(--color-gb-dark)">
                {confirmationNumber}
              </span>
            </div>
            <p className="text-xs text-(--color-text-muted)">
              Un email de confirmation vous a été envoyé.
            </p>
          </div>
        ) : step === 1 ? (
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-(--color-gb-dark)">
              Étape 1 — Choisissez une date et une heure
            </h3>

            <div>
              <Label htmlFor="booking-date" className="mb-1 block">
                Date souhaitée
              </Label>
              <Input
                id="booking-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="max-w-xs"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-(--color-gb-dark) mb-2">
                Créneaux disponibles
              </p>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-xs font-medium transition-colors",
                      selectedTime === time
                        ? "bg-(--color-gb-red) text-white border-(--color-gb-red)"
                        : "border-border hover:border-(--color-gb-green) hover:text-(--color-gb-green)"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <Button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={handleStepOneNext}
                className="bg-(--color-gb-red) text-white hover:bg-gb-red/90"
              >
                Suivant →
              </Button>
            </div>
          </div>
        ) : step === 2 ? (
          <form onSubmit={handleSubmit(onSubmitAttendee)} className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-(--color-gb-dark)">
              Étape 2 — Vos coordonnées
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="b-firstName" className="mb-1 block">
                      Prénom <span className="text-red-500">*</span>
                    </Label>
                    <Input id="b-firstName" placeholder="Jean" {...field} />
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <div>
                    <Label htmlFor="b-lastName" className="mb-1 block">
                      Nom <span className="text-red-500">*</span>
                    </Label>
                    <Input id="b-lastName" placeholder="Dupont" {...field} />
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <div>
                  <Label htmlFor="b-email" className="mb-1 block">
                    Adresse email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="b-email"
                    type="email"
                    placeholder="jean.dupont@email.fr"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState }) => (
                <div>
                  <Label htmlFor="b-phone" className="mb-1 block">
                    Téléphone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="b-phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <div>
                  <Label htmlFor="b-notes" className="mb-1 block">
                    Notes{" "}
                    <span className="text-xs text-(--color-text-muted)">(optionnel)</span>
                  </Label>
                  <Textarea
                    id="b-notes"
                    placeholder="Informations complémentaires..."
                    {...field}
                  />
                </div>
              )}
            />

            <div className="flex justify-between mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
              >
                Retour
              </Button>
              <Button
                type="submit"
                className="bg-(--color-gb-red) text-white hover:bg-gb-red/90"
              >
                Suivant →
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-(--color-gb-dark)">
              Étape 3 — Confirmation
            </h3>

            <div className="bg-(--color-surface-page) rounded-lg p-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-(--color-text-muted)">Service</p>
                  <p className="text-xs font-medium mt-0.5">
                    {SERVICES.find((s) => s.value === selectedService)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-(--color-text-muted)">Date</p>
                  <p className="text-xs font-medium mt-0.5">{selectedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-(--color-text-muted)">Heure</p>
                  <p className="text-xs font-medium mt-0.5">{selectedTime}</p>
                </div>
                <div>
                  <p className="text-xs text-(--color-text-muted)">Nom</p>
                  <p className="text-xs font-medium mt-0.5">
                    {formValues.firstName} {formValues.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-(--color-text-muted)">Email</p>
                  <p className="text-xs font-medium mt-0.5">{formValues.email}</p>
                </div>
                <div>
                  <p className="text-xs text-(--color-text-muted)">Téléphone</p>
                  <p className="text-xs font-medium mt-0.5">{formValues.phone}</p>
                </div>
              </div>
            </div>

            {submitError && (
              <p className="text-red-500 text-xs">{submitError}</p>
            )}

            <div className="flex justify-between mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(2)}
              >
                Modifier
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={onConfirm}
                className="bg-(--color-gb-red) text-white hover:bg-gb-red/90"
              >
                {isSubmitting ? "Confirmation..." : "Confirmer le rendez-vous"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
