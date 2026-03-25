"use client";

import { Controller, type Control } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VisaFormData } from "@/types/visa";
import { useI18n } from "@/locales/client";

interface StepPersonalInfoProps {
  control: Control<VisaFormData>;
}

export function StepPersonalInfo({ control }: StepPersonalInfoProps) {
  const t = useI18n();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Last name */}
      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="lastName" className="mb-1 block">
              {t("visa_form.last_name_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="lastName" placeholder={t("visa_form.last_name_placeholder")} {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* First name */}
      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="firstName" className="mb-1 block">
              {t("visa_form.first_name_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="firstName" placeholder={t("visa_form.first_name_placeholder")} {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Birth date */}
      <Controller
        control={control}
        name="birthDate"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="birthDate" className="mb-1 block">
              {t("visa_form.birth_date_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="birthDate" type="date" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Birth place */}
      <Controller
        control={control}
        name="birthPlace"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="birthPlace" className="mb-1 block">
              {t("visa_form.birth_place_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="birthPlace" placeholder={t("visa_form.birth_place_placeholder")} {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Nationality */}
      <Controller
        control={control}
        name="nationality"
        render={({ field, fieldState }) => (
          <div>
            <Label className="mb-1 block">
              {t("visa_form.nationality_label")} <span className="text-red-500">*</span>
            </Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("visa_form.select_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Française">{t("visa_form.nationality_french")}</SelectItem>
                <SelectItem value="Portugaise">{t("visa_form.nationality_portuguese")}</SelectItem>
                <SelectItem value="Sénégalaise">{t("visa_form.nationality_senegalese")}</SelectItem>
                <SelectItem value="Malienne">{t("visa_form.nationality_malian")}</SelectItem>
                <SelectItem value="Guinéenne">{t("visa_form.nationality_guinean")}</SelectItem>
                <SelectItem value="Ivoirienne">{t("visa_form.nationality_ivorian")}</SelectItem>
                <SelectItem value="Camerounaise">{t("visa_form.nationality_cameroonian")}</SelectItem>
                <SelectItem value="Autre">{t("visa_form.nationality_other")}</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Passport number */}
      <Controller
        control={control}
        name="passportNumber"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="passportNumber" className="mb-1 block">
              {t("visa_form.passport_number_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="passportNumber" placeholder="AB123456" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Passport expiry */}
      <Controller
        control={control}
        name="passportExpiry"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="passportExpiry" className="mb-1 block">
              {t("visa_form.passport_expiry_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="passportExpiry" type="date" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Spacer for grid alignment */}
      <div className="hidden md:block" />

      {/* Address France — full width */}
      <Controller
        control={control}
        name="addressFrance"
        render={({ field, fieldState }) => (
          <div className="md:col-span-2">
            <Label htmlFor="addressFrance" className="mb-1 block">
              {t("visa_form.address_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="addressFrance" placeholder="12 rue de la Paix" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Postal code */}
      <Controller
        control={control}
        name="postalCode"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="postalCode" className="mb-1 block">
              {t("visa_form.postal_code_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="postalCode" placeholder="75001" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* City */}
      <Controller
        control={control}
        name="city"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="city" className="mb-1 block">
              {t("visa_form.city_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="city" placeholder="Paris" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Visa type — full width */}
      <Controller
        control={control}
        name="visaType"
        render={({ field, fieldState }) => (
          <div className="md:col-span-2">
            <Label className="mb-1 block">
              {t("visa_form.visa_type_label")} <span className="text-red-500">*</span>
            </Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("visa_form.select_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tourisme">{t("visa_form.purpose_tourism")}</SelectItem>
                <SelectItem value="Affaires">{t("visa_form.purpose_business")}</SelectItem>
                <SelectItem value="Transit">{t("visa_form.purpose_transit")}</SelectItem>
                <SelectItem value="Famille">{t("visa_form.purpose_visit_family")}</SelectItem>
                <SelectItem value="Étudiant">{t("visa_form.purpose_student")}</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
