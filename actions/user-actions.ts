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
