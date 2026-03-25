"use server";

import { bookingSchema, type BookingFormData } from "@/types/appointment";

export async function bookAppointment(
  data: BookingFormData
): Promise<{ success: boolean; confirmationNumber?: string; error?: string }> {
  const result = bookingSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Données invalides. Veuillez vérifier le formulaire." };
  }

  const confirmationNumber = "RDV-" + Date.now().toString().slice(-6);

  console.log("Email sent to:", data.email);

  return { success: true, confirmationNumber };
}
