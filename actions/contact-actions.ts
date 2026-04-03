"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
  privacyConsent: z.literal(true, "Vous devez accepter la politique de confidentialité."),
})

export async function sendContactMessage(
  data: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) return { success: false, error: "Données invalides." }

    const apiData = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject,
      message: parsed.data.message,
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/contact-messages/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return { success: false, error: errorData.error || "Erreur lors de l'envoi du message." }
    }

    return { success: true }
  } catch (error) {
    console.error("Contact message error:", error)
    return { success: false, error: "Une erreur est survenue. Veuillez réessayer." }
  }
}
