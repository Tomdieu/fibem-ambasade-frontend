"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import Link from "next/link";

import { loginAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  password: z.string().min(1, "Le mot de passe est requis."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormValues) {
    setServerError(null);
    startTransition(async () => {
      const result = await loginAction(data);
      if (result?.error) {
        setServerError(result.error);
      }
    });
  }

  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto bg-white border rounded-[var(--radius-card)] p-8"
      )}
    >
      {/* Logo + Heading */}
      <div className="flex flex-col items-center">
        <div className="size-12 rounded-lg bg-[var(--color-gb-green)] text-white flex items-center justify-center font-bold text-sm">
          GB
        </div>
        <h1 className="text-xl font-medium text-center mt-4">
          Accès sécurisé
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm text-center mt-1">
          Connectez-vous à votre espace
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {/* Email field */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            placeholder="vous@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-xs font-normal cursor-pointer">
              Se souvenir de moi
            </Label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-[var(--color-gb-red)] text-sm ml-auto hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Server error */}
        {serverError && (
          <p className="text-red-500 text-sm">{serverError}</p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-[var(--color-gb-red)] text-white hover:bg-[var(--color-gb-red)]/90 rounded-[var(--radius-card)]"
        >
          {isPending ? (
            <>
              <Spinner className="mr-2" />
              Connexion en cours…
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 mt-6">
        <div className="flex-1 border-t border-border" />
        <span className="text-[var(--color-text-muted)] text-xs">ou</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Citizen link */}
      <p className="text-center mt-4 text-sm text-[var(--color-text-muted)]">
        Vous êtes citoyen ?{" "}
        <Link
          href="/auth/register"
          className="text-[var(--color-gb-red)] text-sm hover:underline"
        >
          Créer un compte
        </Link>
      </p>

      {/* Security notice */}
      <p className="flex items-center gap-1 justify-center mt-4 text-xs text-[var(--color-text-muted)]">
        <Lock className="size-3" />
        Connexion sécurisée HTTPS
      </p>
    </div>
  );
}
