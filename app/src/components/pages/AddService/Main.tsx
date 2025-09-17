"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input, Label, Button, Checkbox } from "@/components/common";
import { IconPlus, IconX } from "@tabler/icons-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { AddServiceAPIRequest } from "@/validations/AddServiceAPISchema";
import { days, serviceCategories } from "@/constants";
import { getCountry, addServiceAction } from "./action";
import CountriesData from "@/data/countries.json";

export function AddServiceForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof AddServiceAPIRequest>>({
    resolver: zodResolver(AddServiceAPIRequest),
    mode: "onChange",
    defaultValues: {
      working_days: [],
      details: [],
      user_id: "",
      currency: "",
    },
  });

  const [detailValue, setDetailValue] = useState("");

  const onSubmit = async (formData: z.infer<typeof AddServiceAPIRequest>) => {
    const { message, success, service } = await addServiceAction(formData);
    if (!success || !service) {
      toast(message);
    } else {
      toast(message);
      router.push("/dashboard/services");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, error } = await authClient.getSession();
        if (error || !data) {
          toast(error?.message || "User not authenticated.");
          router.push("/login");
          return;
        }

        setValue("user_id", data.user.id);

        const { country, success } = await getCountry(data.user.id);
        if (!success || !country) {
          toast("Could not retrieve country information.");
          return;
        }

        const requiredCurrency = CountriesData.find(
          (countryData) => countryData.code === country
        );

        if (requiredCurrency) {
          setValue("currency", requiredCurrency.currency, {
            shouldValidate: true,
          });
        }
      } catch (error) {
        toast("An unexpected error occurred.");
        console.error(error);
      }
    };
    getData();
  }, [router, setValue]);

  return (
    <form
      className={cn(
        "flex flex-col gap-10 max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-md",
        className
      )}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Add a New Service</h1>
        <p className="text-gray-500 text-sm">
          Provide details to create your service offering
        </p>
      </div>

      {/* Basic Info */}
      <section className="space-y-6">
        <h2 className="font-semibold text-lg text-gray-800 border-b pb-2">
          Basic Information
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="mb-1">
              Service Name
            </Label>
            <Input
              id="name"
              placeholder="Ex: Haircut, Web Design..."
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1">Highlights</Label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: Free consultation"
                  value={detailValue}
                  onChange={(e) => setDetailValue(e.target.value)}
                />
                <Button
                  type="button"
                  className="px-3"
                  onClick={() => {
                    if (detailValue.trim()) {
                      setValue("details", [
                        ...getValues().details,
                        detailValue,
                      ]);
                      setDetailValue("");
                    }
                  }}
                >
                  <IconPlus size={18} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {getValues().details.map((value, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full"
                  >
                    {value}
                    <IconX
                      size={14}
                      className="cursor-pointer"
                      onClick={() =>
                        setValue(
                          "details",
                          getValues().details.filter((_, i) => i !== idx)
                        )
                      }
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="mb-1">
              Category
            </Label>
            <select
              {...register("category")}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            >
              {serviceCategories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="provider_name" className="mb-1">
              Provider / Organization
            </Label>
            <Input
              id="provider_name"
              placeholder="Your business or name"
              {...register("provider_name")}
            />
            {errors.provider_name && (
              <p className="text-sm text-red-500">
                {errors.provider_name.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description" className="mb-1">
              Description
            </Label>
            <textarea
              id="description"
              placeholder="Write a detailed description of your service..."
              className="w-full border rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-indigo-500"
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
      <section className="space-y-6">
        <h2 className="font-semibold text-lg text-gray-800 border-b pb-2">
          Schedule
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="start_time" className="mb-1">
              Start Time
            </Label>
            <Input id="start_time" type="time" {...register("start_time")} />
          </div>
          <div>
            <Label htmlFor="end_time" className="mb-1">
              End Time
            </Label>
            <Input id="end_time" type="time" {...register("end_time")} />
          </div>
          <div className="md:col-span-2">
            <Label className="mb-1">Working Days</Label>
            <Controller
              name="working_days"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {days.map((day) => (
                    <label
                      key={day}
                      className={cn(
                        "flex items-center gap-2 border rounded-lg p-2 cursor-pointer transition",
                        field.value.includes(day)
                          ? "bg-indigo-100 border-indigo-500"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <Checkbox
                        checked={field.value.includes(day)}
                        onCheckedChange={(checked) =>
                          field.onChange(
                            checked
                              ? [...field.value, day]
                              : field.value.filter((d) => d !== day)
                          )
                        }
                      />
                      {day}
                    </label>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-6">
        <h2 className="font-semibold text-lg text-gray-800 border-b pb-2">
          Pricing & Limits
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label className="mb-1" htmlFor="duration">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              {...register("duration", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label className="mb-1" htmlFor="price">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label className="mb-1" htmlFor="currency">
              Currency
            </Label>
            <Input id="currency" disabled {...register("currency")} />
          </div>
          <div>
            <Label className="mb-1" htmlFor="max_appointments_per_day">
              Max Appointments / Day
            </Label>
            <Input
              id="max_appointments_per_day"
              type="number"
              {...register("max_appointments_per_day", { valueAsNumber: true })}
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className={`w-full md:w-auto px-10 py-2 rounded-lg ${isSubmitting ? "cursor-not-allowed bg-pink/80" : ""} text-white font-medium shadow`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Service"}
        </Button>
      </div>
    </form>
  );
}

export default AddServiceForm;
