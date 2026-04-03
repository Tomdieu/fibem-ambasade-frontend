"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
};

export async function loginAction(
  formData: LoginCredentials
): Promise<{ error: string } | never> {
  const { email, password } = formData;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || "Identifiants incorrects." };
    }

    const data = await response.json();
    const cookieStore = await cookies();

    // Store auth token
    cookieStore.set("gb-session", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400 * 30, // 30 days
      path: "/",
    });

    // Store user info
    cookieStore.set("gb-user", JSON.stringify(data.user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
    });

    // Store role
    cookieStore.set("gb-role", data.profile?.role || "citizen", {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
    });

    // Determine redirect path based on role
    const roleRedirectMap: { [key: string]: string } = {
      admin: "/admin",
      agent: "/dashboard",
      citizen: "/dashboard",
    };

    const redirectPath = roleRedirectMap[data.profile?.role] || "/dashboard";
    redirect(redirectPath);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }
}

export async function registerAction(
  formData: RegisterCredentials
): Promise<{ error: string } | { success: true }> {
  const { email, password, first_name, last_name } = formData;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        first_name: first_name || '',
        last_name: last_name || '',
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || "Erreur lors de l'inscription." };
    }

    return { success: true };
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer." };
  }
}

export async function logoutAction(): Promise<never> {
  const cookieStore = await cookies();
  
  try {
    const token = cookieStore.get("gb-session")?.value;
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  cookieStore.delete("gb-session");
  cookieStore.delete("gb-user");
  cookieStore.delete("gb-role");
  redirect("/");
}
