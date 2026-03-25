"use client";

import { Controller, type Control, type UseFormWatch } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { VisaFormData } from "@/types/visa";
import { useI18n } from "@/locales/client";

interface StepTravelDetailsProps {
  control: Control<VisaFormData>;
  watch: UseFormWatch<VisaFormData>;
}

export function StepTravelDetails({ control, watch }: StepTravelDetailsProps) {
  const accommodationType = watch("accommodationType");
  const t = useI18n();

  return (
    <div className="flex flex-col gap-4">
      {/* Departure + return dates */}
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="departureDate"
          render={({ field, fieldState }) => (
            <div>
              <Label htmlFor="departureDate" className="mb-1 block">
                {t("visa_form.departure_date_label")} <span className="text-red-500">*</span>
              </Label>
              <Input id="departureDate" type="date" {...field} />
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="returnDate"
          render={({ field, fieldState }) => (
            <div>
              <Label htmlFor="returnDate" className="mb-1 block">
                {t("visa_form.return_date_label")} <span className="text-red-500">*</span>
              </Label>
              <Input id="returnDate" type="date" {...field} />
              {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Purpose of visit */}
      <Controller
        control={control}
        name="purposeOfVisit"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="purposeOfVisit" className="mb-1 block">
              {t("visa_form.purpose_label")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="purposeOfVisit"
              placeholder={t("visa_form.purpose_placeholder")}
              {...field}
            />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Destination city */}
      <Controller
        control={control}
        name="destinationCity"
        render={({ field, fieldState }) => (
          <div>
            <Label htmlFor="destinationCity" className="mb-1 block">
              {t("visa_form.destination_city_label")} <span className="text-red-500">*</span>
            </Label>
            <Input id="destinationCity" placeholder="Bissau" {...field} />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Accommodation type */}
      <Controller
        control={control}
        name="accommodationType"
        render={({ field, fieldState }) => (
          <div>
            <Label className="mb-1 block">
              {t("visa_form.accommodation_label")} <span className="text-red-500">*</span>
            </Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("visa_form.select_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hôtel">{t("visa_form.accommodation_hotel")}</SelectItem>
                <SelectItem value="Chez l'habitant">{t("visa_form.accommodation_family")}</SelectItem>
                <SelectItem value="Airbnb">{t("visa_form.accommodation_airbnb")}</SelectItem>
                <SelectItem value="Autre">{t("visa_form.accommodation_other")}</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Conditional: inviting person details */}
      {accommodationType === "Chez l'habitant" && (
        <>
          <Controller
            control={control}
            name="invitingPersonName"
            render={({ field, fieldState }) => (
              <div>
                <Label htmlFor="invitingPersonName" className="mb-1 block">
                  {t("visa_form.inviting_person_name_label")}
                </Label>
                <Input
                  id="invitingPersonName"
                  placeholder={t("visa_form.inviting_person_name_placeholder")}
                  {...field}
                  value={field.value ?? ""}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="invitingPersonAddress"
            render={({ field, fieldState }) => (
              <div>
                <Label htmlFor="invitingPersonAddress" className="mb-1 block">
                  {t("visa_form.inviting_person_address_label")}
                </Label>
                <Input
                  id="invitingPersonAddress"
                  placeholder={t("visa_form.inviting_person_address_placeholder")}
                  {...field}
                  value={field.value ?? ""}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </>
      )}
    </div>
  );
}
