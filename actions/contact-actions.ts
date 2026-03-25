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
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: "Données invalides." }
  console.log("Contact message received:", parsed.data)
  return { success: true }
}
