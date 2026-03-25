"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginCredentials = {
  email: string;
  password: string;
};

type MockUser = {
  email: string;
  password: string;
  role: "admin" | "agent" | "citizen";
  redirectPath: string;
};

const MOCK_USERS: MockUser[] = [
  {
    email: "admin@ambassade.gw",
    password: "admin",
    role: "admin",
    redirectPath: "/admin",
  },
  {
    email: "agent@ambassade.gw",
    password: "agent",
    role: "agent",
    redirectPath: "/dashboard",
  },
  {
    email: "citoyen@test.fr",
    password: "citoyen",
    role: "citizen",
    redirectPath: "/dashboard",
  },
];

export async function loginAction(
  formData: LoginCredentials
): Promise<{ error: string } | never> {
  const { email, password } = formData;

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { error: "Identifiants incorrects." };
  }

  const cookieStore = await cookies();

  cookieStore.set("gb-session", user.email, {
    httpOnly: true,
    secure: true,
    maxAge: 86400,
    path: "/",
  });

  cookieStore.set("gb-role", user.role, {
    httpOnly: true,
    path: "/",
  });

  redirect(user.redirectPath);
}

export async function logoutAction(): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.delete("gb-session");
  cookieStore.delete("gb-role");
  redirect("/");
}
