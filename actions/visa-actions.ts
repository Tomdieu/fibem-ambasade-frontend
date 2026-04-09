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
    // Map French visa types to backend enum values
    const visaTypeMap: Record<string, string> = {
      "Tourisme": "short_stay",
      "Affaires": "business",
      "Transit": "transit",
      "Famille": "short_stay",
      "Étudiant": "long_stay",
      "Traitement médical": "treatment",
    };

    const mappedVisaType = visaTypeMap[data.visaType] || data.visaType;

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
      visa_type: mappedVisaType,
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
      has_proof_accommodation: data.hasProofOfAccommodation,
      has_proof_funds: data.hasProofOfFunds,
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
      console.error("Backend visa submission error:", errorData);
      return {
        success: false,
        error: errorData.error || JSON.stringify(errorData) || "Erreur lors de la soumission de la demande.",
      };
    }

    const result_data = await response.json();

    if (!result_data.reference) {
      console.error("Missing reference in response:", result_data);
      return {
        success: false,
        error: "Erreur: Aucun numéro de référence retourné par le serveur.",
      };
    }

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

export async function updateVisaRequestStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/visa-requests/${id}/update_status/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Erreur lors de la mise à jour du statut." };
    }

    return { success: true };
  } catch (error) {
    console.error("Update visa request status error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function submitVisaRequestAsAgent(
  data: VisaFormData,
  userId?: number
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

    // Map French visa types to backend enum values
    const visaTypeMap: Record<string, string> = {
      "Tourisme": "short_stay",
      "Affaires": "business",
      "Transit": "transit",
      "Famille": "short_stay",
      "Étudiant": "long_stay",
      "Traitement médical": "treatment",
    };

    const mappedVisaType = visaTypeMap[data.visaType] || data.visaType;

    const apiData: any = {
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
      email: data.email,
      visa_type: mappedVisaType,
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
      has_proof_accommodation: data.hasProofOfAccommodation,
      has_proof_funds: data.hasProofOfFunds,
      additional_notes: data.additionalNotes || null,
    };

    if (userId) {
      apiData.user = userId;
    }

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
      console.error("Backend visa submission error:", errorData);
      return {
        success: false,
        error: errorData.error || JSON.stringify(errorData) || "Erreur lors de la soumission de la demande.",
      };
    }

    const result_data = await response.json();

    if (!result_data.reference) {
      console.error("Missing reference in response:", result_data);
      return {
        success: false,
        error: "Erreur: Aucun numéro de référence retourné par le serveur.",
      };
    }

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
