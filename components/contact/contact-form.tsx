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
import { useI18n } from "@/locales/client"

export function ContactForm() {
  const t = useI18n()
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  
  const contactSchema = z.object({
    name: z.string().min(2, t("contact_form.name_error")),
    email: z.string().email(t("contact_form.email_error")),
    phone: z.string().optional(),
    subject: z.string().min(1, t("contact_form.subject_required")),
    message: z.string().min(10, t("contact_form.message_error")),
    privacyConsent: z.literal(true, t("contact_form.privacy_required")),
  })

  type ContactFormValues = z.infer<typeof contactSchema>

  const SUBJECTS = [
    { value: "information", label: t("contact_form.subject_information") },
    { value: "consulaire", label: t("contact_form.subject_consular") },
    { value: "presse", label: t("contact_form.subject_press") },
    { value: "cooperation", label: t("contact_form.subject_cooperation") },
    { value: "autre", label: t("contact_form.subject_other") },
  ]

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
        setServerError(result.error ?? t("contact_form.error_message"))
      }
    })
  }

  return (
    <Card className="bg-white border rounded-card p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          <SectionHeading title={t("contact_form.send_message")} />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {success ? (
          <div className="space-y-2">
            <Alert className="border-(--color-gb-green) bg-gb-blue/10">
              <AlertDescription className="text-(--color-gb-green) font-medium">
                {t("contact_form.success_message")}
              </AlertDescription>
            </Alert>
            <p className="text-xs text-muted-foreground mt-2">
              {t("contact_form.success_thanks")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">
                {t("contact_form.name_label")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder={t("contact_form.name_label")}
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
                {t("contact_form.email_label")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("contact_form.email_placeholder")}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone">{t("contact_form.phone_label")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("contact_form.phone_placeholder")}
                {...register("phone")}
              />
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <Label htmlFor="subject">
                {t("contact_form.subject_label")} <span className="text-red-500">*</span>
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
                      <SelectValue placeholder={t("contact_form.subject_label")} />
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
                {t("contact_form.message_label")} <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder={t("contact_form.message_placeholder")}
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
                      {t("contact_form.privacy_consent")}{" "}
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
                  {t("contact_form.sending")}
                </>
              ) : (
                t("contact_form.send_btn")
              )}
            </Button>

            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t("contact_form.response_time")}
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
