"use server";

import { visaFormSchema, type VisaFormData } from "@/types/visa";
import { getCurrentUser, getAuthToken } from "@/actions/user-actions";

export async function submitVisaApplication(
  data: VisaFormData
): Promise<{ success: boolean; reference?: string; error?: string }> {
  try {
    const result = visaFormSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: "Données invalides. Veuillez vérifier le formulaire." };
    }

    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    // Get authenticated user's email
    const user = await getCurrentUser();
    const userEmail = user?.email || "unknown@example.com";

    // Format data for API
    const apiData = {
      first_name: data.firstName,
      last_name: data.lastName,
      birth_date: data.birthDate,
      birth_place: data.birthPlace,
      nationality: data.nationality,
      passport_number: data.passportNumber,
      passport_expiry: data.passportExpiry,
      address_france: data.addressFrance,
      postal_code: data.postalCode,
      city: data.city,
      email: userEmail,
      visa_type: data.visaType,
      departure_date: data.departureDate,
      return_date: data.returnDate,
      purpose_of_visit: data.purposeOfVisit,
      destination_city: data.destinationCity,
      inviting_person_name: data.invitingPersonName || null,
      inviting_person_address: data.invitingPersonAddress || null,
      accommodation_type: data.accommodationType,
      has_passport_scan: data.hasPassportScan,
      has_photo: data.hasPhoto,
      has_invitation_letter: data.hasInvitationLetter,
      has_proof_accommodation: data.hasProofAccommodation,
      has_proof_funds: data.hasProofFunds,
      additional_notes: data.additionalNotes || null,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/visa-requests/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Erreur lors de la soumission de la demande.",
      };
    }

    const result_data = await response.json();

    return {
      success: true,
      reference: result_data.reference,
    };
  } catch (error) {
    console.error("Visa submission error:", error);
    return {
      success: false,
      error: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
}

export async function getVisaRequests() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/visa-requests/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, error: "Erreur lors de la récupération des demandes." };
    }

    const data = await response.json();
    return { success: true, data: data.results || data };
  } catch (error) {
    console.error("Get visa requests error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function getVisaRequest(id: string) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/visa-requests/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, error: "Demande non trouvée." };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Get visa request error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}
