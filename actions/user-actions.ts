"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userJson = cookieStore.get("gb-user")?.value;

    if (!userJson) {
      return null;
    }

    const user = JSON.parse(userJson);
    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("gb-session")?.value || null;
}

export async function updateUserProfile(profileData: {
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, error: "No authentication token found" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile/update_profile/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(profileData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.detail || "Failed to update profile",
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Update profile error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, error: "No authentication token found" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile/change_password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.error || "Failed to change password",
      };
    }

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to change password",
    };
  }
}

export async function getCitizens() {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, error: "Authentification requise.", data: [] };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/users/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, error: "Erreur lors de la récupération des citoyens.", data: [] };
    }

    const data = await response.json();
    // Filter to only citizens
    const citizens = (Array.isArray(data) ? data : data.results || []).filter(
      (user: any) => user.profile?.role === 'citizen'
    );
    
    return { success: true, data: citizens };
  } catch (error) {
    console.error("Get citizens error:", error);
    return { success: false, error: "Une erreur est survenue.", data: [] };
  }
}
