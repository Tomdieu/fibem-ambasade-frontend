"use client"

import { useState, useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { sendContactMessage } from "@/actions/contact-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  phone: z.string().optional(),
  subject: z.string().min(1, "Veuillez choisir un sujet."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
  privacyConsent: z.literal(true, "Vous devez accepter la politique de confidentialité."),
})

type ContactFormValues = z.infer<typeof contactSchema>

const SUBJECTS = [
  { value: "information", label: "Information" },
  { value: "consulaire", label: "Service consulaire" },
  { value: "presse", label: "Presse" },
  { value: "cooperation", label: "Coopération" },
  { value: "autre", label: "Autre" },
]

export function ContactForm() {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: ContactFormValues) {
    setServerError(null)
    startTransition(async () => {
      const result = await sendContactMessage(data)
      if (result.success) {
        setSuccess(true)
      } else {
        setServerError(result.error ?? "Une erreur est survenue.")
      }
    })
  }

  return (
    <Card className="bg-white border rounded-card p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          <SectionHeading title="Envoyer un message" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {success ? (
          <div className="space-y-2">
            <Alert className="border-(--color-gb-green) bg-gb-green/10">
              <AlertDescription className="text-(--color-gb-green) font-medium">
                Votre message a été envoyé. Nous vous répondrons dans les 3 jours ouvrés.
              </AlertDescription>
            </Alert>
            <p className="text-xs text-muted-foreground mt-2">
              Merci de nous avoir contacté. Notre équipe consulaire traitera votre demande dans les meilleurs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">
                Nom complet <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Jean Dupont"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Adresse email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone">Téléphone (optionnel)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+33 6 XX XX XX XX"
                {...register("phone")}
              />
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <Label htmlFor="subject">
                Sujet <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="subject"
                      className="w-full"
                      aria-invalid={!!errors.subject}
                    >
                      <SelectValue placeholder="Choisir un sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Décrivez l'objet de votre demande…"
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-red-500 text-xs">{errors.message.message}</p>
              )}
            </div>

            {/* Privacy consent */}
            <div className="space-y-1.5">
              <Controller
                name="privacyConsent"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="privacyConsent"
                      checked={field.value === true}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true ? true : undefined)
                      }
                      aria-invalid={!!errors.privacyConsent}
                    />
                    <Label
                      htmlFor="privacyConsent"
                      className={cn(
                        "text-xs font-normal cursor-pointer",
                        errors.privacyConsent && "text-red-500"
                      )}
                    >
                      J&apos;accepte la politique de confidentialité{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>
                )}
              />
              {errors.privacyConsent && (
                <p className="text-red-500 text-xs">
                  {errors.privacyConsent.message}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <p className="text-red-500 text-sm">{serverError}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-(--color-gb-red) text-white hover:bg-gb-red/90"
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2" />
                  Envoi en cours…
                </>
              ) : (
                "Envoyer le message"
              )}
            </Button>

            <p className="text-xs text-muted-foreground mt-2 text-center">
              Délai de réponse habituel : 3 jours ouvrés
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
