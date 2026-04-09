"use server";

import { bookingSchema, type BookingFormData } from "@/types/appointment";
import { getAuthToken } from "@/actions/user-actions";

export async function bookAppointment(
  data: BookingFormData
): Promise<{ success: boolean; confirmationNumber?: string; error?: string }> {
  try {
    const result = bookingSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: "Données invalides. Veuillez vérifier le formulaire." };
    }

    const token = await getAuthToken();

    // Format data for API - appointment_date and appointment_time are required
    const [year, month, day] = data.date.split("-");
    const appointmentDate = `${year}-${month}-${day}`;

    const apiData = {
      service_type: data.serviceType,
      appointment_date: appointmentDate,
      appointment_time: data.time,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      notes: data.notes || null,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Token ${token}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/appointments/`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Erreur lors de la réservation.",
      };
    }

    const result_data = await response.json();

    return {
      success: true,
      confirmationNumber: result_data.confirmation_number,
    };
  } catch (error) {
    console.error("Booking error:", error);
    return {
      success: false,
      error: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
}

export async function getAvailableSlots(serviceType: string, date: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/appointments/available_slots/?service_type=${serviceType}&date=${date}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { success: false, error: "Erreur lors de la récupération des créneaux." };
    }

    const data = await response.json();
    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Get available slots error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function getAppointments() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/appointments/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, error: "Erreur lors de la récupération des rendez-vous." };
    }

    const data = await response.json();
    return { success: true, data: data.results || data };
  } catch (error) {
    console.error("Get appointments error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function getAppointment(id: string) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/appointments/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, error: "Rendez-vous non trouvé." };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Get appointment error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/appointments/${id}/update_status/`,
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
    console.error("Update appointment status error:", error);
    return { success: false, error: "Une erreur est survenue." };
  }
}

export async function createAppointmentAsAgent(
  data: BookingFormData,
  userId?: number
): Promise<{ success: boolean; confirmationNumber?: string; error?: string }> {
  try {
    const result = bookingSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: "Données invalides. Veuillez vérifier le formulaire." };
    }

    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: "Authentification requise." };
    }

    // Format data for API
    const [year, month, day] = data.date.split("-");
    const appointmentDate = `${year}-${month}-${day}`;

    const apiData: any = {
      service_type: data.serviceType,
      appointment_date: appointmentDate,
      appointment_time: data.time,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      notes: data.notes || null,
    };

    // If userId is provided (agent creating on behalf), include it
    if (userId) {
      apiData.user = userId;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/appointments/`,
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
        error: errorData.error || "Erreur lors de la création du rendez-vous.",
      };
    }

    const result_data = await response.json();

    return {
      success: true,
      confirmationNumber: result_data.confirmation_number,
    };
  } catch (error) {
    console.error("Create appointment error:", error);
    return {
      success: false,
      error: "Une erreur est survenue. Veuillez réessayer.",
    };
  }
}
