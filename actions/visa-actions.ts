"use server";

import { visaFormSchema, type VisaFormData } from "@/types/visa";

export async function submitVisaApplication(
  data: VisaFormData
): Promise<{ success: boolean; reference?: string; error?: string }> {
  const result = visaFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Données invalides. Veuillez vérifier le formulaire." };
  }

  const reference =
    "REF-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  return { success: true, reference };
}
