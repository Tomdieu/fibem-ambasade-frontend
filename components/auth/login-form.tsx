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
import { useI18n } from "@/locales/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function LoginForm() {
  const t = useI18n();

  const loginSchema = z.object({
    email: z.string().email(t("auth.email_invalid")),
    password: z.string().min(1, t("auth.password_required")),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

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
        "max-w-sm w-full mx-auto bg-white border rounded-card p-8",
      )}
    >
      {/* Logo + Heading */}
      <div className="flex flex-col items-center">
        <Image
          src="/web-app-manifest-192x192.png"
          alt="Logo de l'Ambassade de Guinée-Bissau en France"
          className="h-10 w-10 rounded object-contain"
          width={40}
          height={40}
        />
        <h1 className="text-xl font-medium text-center mt-4">
          {t("auth.secure_access_title")}
        </h1>
        <p className="text-(--color-text-muted) text-sm text-center mt-1">
          {t("auth.secure_access_subtitle")}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {/* Email field */}
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("auth.email_label")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("auth.email_placeholder")}
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
          <Label htmlFor="password">{t("auth.password_label")}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t("auth.password_placeholder")}
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
            <Label
              htmlFor="remember"
              className="text-xs font-normal cursor-pointer"
            >
              {t("auth.remember_me")}
            </Label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-(--color-gb-red) text-sm ml-auto hover:underline"
          >
            {t("auth.forgot_password")}
          </Link>
        </div>

        {/* Server error */}
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-(--color-gb-red) text-white hover:bg-gb-red/90 rounded-card"
        >
          {isPending ? (
            <>
              <Spinner className="mr-2" />
              {t("auth.connecting")}
            </>
          ) : (
            t("auth.login_btn")
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 mt-6">
        <div className="flex-1 border-t border-border" />
        <span className="text-(--color-text-muted) text-xs">
          {t("common.or")}
        </span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Citizen link */}
      <p className="text-center mt-4 text-sm text-(--color-text-muted)">
        {t("auth.are_citizen")}{" "}
        <Link
          href="/auth/register"
          className="text-(--color-gb-red) text-sm hover:underline"
        >
          {t("auth.create_account_link")}
        </Link>
      </p>

      {/* Security notice */}
      <p className="flex items-center gap-1 justify-center mt-4 text-xs text-(--color-text-muted)">
        <Lock className="size-3" />
        {t("auth.secure_https")}
      </p>
    </div>
  );
}
