"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input, Label, Button, Checkbox } from "@/components/common";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddServiceAPIRequest } from "@/validations/AddServiceAPISchema";
import { days } from "@/constants";

export function AddServiceForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof AddServiceAPIRequest>>({
    resolver: zodResolver(AddServiceAPIRequest),
    mode: "onChange",
    defaultValues: { days_of_availability: [] },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: z.infer<typeof AddServiceAPIRequest>) => {
    setLoading(true);
    console.log("Service Data:", formData);
    setLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-8 max-w-3xl mx-auto p-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Add a New Service</h1>
        <p className="text-muted-foreground text-sm">
          Fill out the details below to create your service
        </p>
      </div>

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg border-b pb-1">
          Basic Information{" "}
          <svg
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium ItemButtonIcon css-140r284"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42"></path>
          </svg>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="ABC Service" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <textarea
              placeholder="Write about your service..."
              className="w-full border rounded p-2 min-h-[100px]"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg border-b pb-1">Schedule</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Start Time</Label>
            <Input type="time" {...register("start_time")} />
            {errors.start_time && (
              <p className="text-sm text-red-500">
                {errors.start_time.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>End Time</Label>
            <Input type="time" {...register("end_time")} />
            {errors.end_time && (
              <p className="text-sm text-red-500">{errors.end_time.message}</p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Select Working Days</Label>
            <Controller
              control={control}
              name="days_of_availability"
              render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {days.map((day) => (
                    <label
                      key={day}
                      className="flex items-center gap-2 border rounded p-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={field.value.includes(day)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, day]);
                          } else {
                            field.onChange(
                              field.value.filter((d: string) => d !== day)
                            );
                          }
                        }}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.days_of_availability && (
              <p className="text-sm text-red-500">
                {errors.days_of_availability.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg border-b pb-1">
          Pricing & Limits
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              {...register("duration", { valueAsNumber: true })}
            />
            {errors.duration && (
              <p className="text-sm text-red-500">{errors.duration.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Input placeholder="PKR" {...register("currency")} />
            {errors.currency && (
              <p className="text-sm text-red-500">{errors.currency.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Max Appointments per Day</Label>
            <Input
              type="number"
              {...register("max_appointments_per_day", { valueAsNumber: true })}
            />
            {errors.max_appointments_per_day && (
              <p className="text-sm text-red-500">
                {errors.max_appointments_per_day.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Submit */}
      <Button
        type="submit"
        className={`w-full md:w-auto self-center px-10 ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loading ? "Submitting..." : "Add Service"}
      </Button>
    </form>
  );
}

export default AddServiceForm;
