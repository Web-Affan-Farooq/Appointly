"use client";
// _____ Hooks ...
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
// _____ Utils ...
import { cn } from "@/lib/utils";
// _____ Components ...
import { Input, Label, Button, Checkbox } from "@/components/common";
// import { useToast } from "@/components/ui/use-toast"; // assuming you're using a toast component
// _____ Libraries ...
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
// _____ Types and schemas ...
import {
  AddServiceAPIRequest,
  AddServiceAPIResponse,
} from "@/validations/AddServiceAPISchema";
// _____ Constants ...
import { days, serviceCategories } from "@/constants";
// _____ Actions ...
import { getCountry, addServiceAction } from "./action";
// _____ Placeholder data ...
import CountriesData from "@/data/countries.json";

export function AddServiceForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  // const { toast } = useToast(); // Assuming you have a toast provider
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof AddServiceAPIRequest>>({
    resolver: zodResolver(AddServiceAPIRequest),
    mode: "onChange",
    defaultValues: {
      working_days: [],
      user_id: "",
      currency: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof AddServiceAPIRequest>) => {
    console.log(formData);
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
          router.push("/login");
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
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [router, setValue, toast]);

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
          Basic Information
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name of your service</Label>
            <Input id="name" placeholder="ABC Service" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Select category</Label>
            <select
              {...register("category")}
              className="w-full border rounded p-2"
            >
              {serviceCategories
                .slice(1, serviceCategories.length)
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider_name">Organization or provider name</Label>
            <Input
              id="provider_name"
              placeholder="Haircut etc..."
              {...register("provider_name")}
            />
            {errors.provider_name && (
              <p className="text-sm text-red-500">
                {errors.provider_name.message}
              </p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
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
            <Label htmlFor="start_time">Start Time</Label>
            <Input id="start_time" type="time" {...register("start_time")} />
            {errors.start_time && (
              <p className="text-sm text-red-500">
                {errors.start_time.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_time">End Time</Label>
            <Input id="end_time" type="time" {...register("end_time")} />
            {errors.end_time && (
              <p className="text-sm text-red-500">{errors.end_time.message}</p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Select Working Days</Label>
            <Controller
              name="working_days"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {days.map((day) => (
                    <label
                      key={day}
                      htmlFor={`day-${day}`}
                      className="flex items-center gap-2 border rounded p-2 cursor-pointer"
                    >
                      <Checkbox
                        id={`day-${day}`}
                        checked={field.value.includes(day)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked
                              ? [...field.value, day]
                              : field.value.filter((d) => d !== day)
                          );
                        }}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.working_days && (
              <p className="text-sm text-red-500">
                {errors.working_days.message}
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
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              {...register("duration", { valueAsNumber: true })}
            />
            {errors.duration && (
              <p className="text-sm text-red-500">{errors.duration.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" {...register("currency")} disabled />
            {errors.currency && (
              <p className="text-sm text-red-500">{errors.currency.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="max_appointments_per_day">
              Max Appointments per Day
            </Label>
            <Input
              id="max_appointments_per_day"
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
        className="w-full md:w-auto self-center px-10"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Service"}
      </Button>
    </form>
  );
}

export default AddServiceForm;
// "use client";
// // _____ Hooks ...
// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useRouter } from "next/navigation";
// // _____ Utils ...
// import { cn } from "@/lib/utils";
// // _____ Components ...
// import { Input, Label, Button, Checkbox } from "@/components/common";
// // _____ Libraries ...
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { authClient } from "@/lib/auth-client";
// // _____ Types and schemas ...
// import {
//   AddServiceAPIRequest,
//   AddServiceAPIResponse,
// } from "@/validations/AddServiceAPISchema";
// // _____ Constants ...
// import { days, serviceCategories } from "@/constants";
// // _____ Actions ...
// import { getCountry, addServiceAction } from "./action";
// // _____ Placeholder data ...
// import CountriesData from "@/data/countries.json";

// export function AddServiceForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm<z.infer<typeof AddServiceAPIRequest>>({
//     resolver: zodResolver(AddServiceAPIRequest),
//     mode: "onChange",
//     defaultValues: { working_days: [], user_id: "", currency: "" },
//   });

//   const [loading, setLoading] = useState(false);
//   // const [currency, setCurrency] = useState("");

//   const onSubmit = async (formData: z.infer<typeof AddServiceAPIRequest>) => {
//     setLoading(true);
//     const { message, success, service } = await addServiceAction(formData);
//     if (!success && !service) {
//       alert(message);
//     }
//     alert(message);
//     setLoading(false);
//   };
//   useEffect(() => {
//     const getData = async () => {
//       const { data, error } = await authClient.getSession();
//       if (!data && error) {
//         alert(error.message);
//       }
//       if (data) {
//         const { country, success } = await getCountry(data.user.id);
//         setValue("user_id", data.user.id);
//         if (!success && !country) {
//           router.push("/login");
//         }
//         if (country) {
//           const [requiredCurrency] = CountriesData.filter(
//             (countryData) => countryData.code === country
//           );
//           setValue("currency", requiredCurrency.currency, {
//             shouldValidate: true,
//           });
//         }
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <form
//       className={cn("flex flex-col gap-8 max-w-3xl mx-auto p-6", className)}
//       {...props}
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       {/* Header */}
//       <div className="text-center space-y-2">
//         <h1 className="text-2xl font-bold">Add a New Service</h1>
//         <p className="text-muted-foreground text-sm">
//           Fill out the details below to create your service
//         </p>
//       </div>

//       {/* Basic Info */}
//       <section className="space-y-4">
//         <h2 className="font-semibold text-lg border-b pb-1">
//           Basic Information
//           <svg
//             className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium ItemButtonIcon css-140r284"
//             focusable="false"
//             aria-hidden="true"
//             viewBox="0 0 24 24"
//           >
//             <path d="M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42"></path>
//           </svg>
//         </h2>
//         <div className="grid gap-6 md:grid-cols-2">
//           <div className="space-y-2">
//             <Label>Name of your service</Label>
//             <Input placeholder="ABC Service" {...register("name")} />
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name.message}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label>Select category</Label>
//             <select name="category" id="category" >
//               {serviceCategories.map((category, idx) => (
//                 <option value={category} key={idx}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//             <Input
//               placeholder="Haircut etc... "
//               {...register("provider_name")}
//             />
//             {errors.provider_name && (
//               <p className="text-sm text-red-500">
//                 {errors.provider_name.message}
//               </p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label>Organization or provider name </Label>
//             <Input
//               placeholder="Haircut etc... "
//               {...register("provider_name")}
//             />
//             {errors.provider_name && (
//               <p className="text-sm text-red-500">
//                 {errors.provider_name.message}
//               </p>
//             )}
//           </div>
//           <div className="space-y-2 md:col-span-2">
//             <Label>Description</Label>
//             <textarea
//               placeholder="Write about your service..."
//               className="w-full border rounded p-2 min-h-[100px]"
//               {...register("description")}
//             />
//             {errors.description && (
//               <p className="text-sm text-red-500">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Schedule */}
//       <section className="space-y-4">
//         <h2 className="font-semibold text-lg border-b pb-1">Schedule</h2>
//         <div className="grid gap-6 md:grid-cols-2">
//           <div className="space-y-2">
//             <Label>Start Time</Label>
//             <Input type="time" {...register("start_time")} />
//             {errors.start_time && (
//               <p className="text-sm text-red-500">
//                 {errors.start_time.message}
//               </p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label>End Time</Label>
//             <Input type="time" {...register("end_time")} />
//             {errors.end_time && (
//               <p className="text-sm text-red-500">{errors.end_time.message}</p>
//             )}
//           </div>
//           <div className="space-y-2 md:col-span-2">
//             <Label>Select Working Days</Label>
//             <Controller
//               control={control}
//               name="working_days"
//               render={({ field }) => (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   {days.map((day) => (
//                     <label
//                       key={day}
//                       className="flex items-center gap-2 border rounded p-2 cursor-pointer"
//                     >
//                       <Checkbox
//                         checked={field.value.includes(day)}
//                         onCheckedChange={(checked) => {
//                           if (checked) {
//                             field.onChange([...field.value, day]);
//                           } else {
//                             field.onChange(
//                               field.value.filter((d: string) => d !== day)
//                             );
//                           }
//                         }}
//                       />
//                       {day}
//                     </label>
//                   ))}
//                 </div>
//               )}
//             />
//             {errors.working_days && (
//               <p className="text-sm text-red-500">
//                 {errors.working_days.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Pricing */}
//       <section className="space-y-4">
//         <h2 className="font-semibold text-lg border-b pb-1">
//           Pricing & Limits
//         </h2>
//         <div className="grid gap-6 md:grid-cols-2">
//           <div className="space-y-2">
//             <Label>Duration (minutes)</Label>
//             <Input
//               type="number"
//               {...register("duration", { valueAsNumber: true })}
//             />
//             {errors.duration && (
//               <p className="text-sm text-red-500">{errors.duration.message}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label>Price</Label>
//             <Input
//               type="number"
//               {...register("price", { valueAsNumber: true })}
//             />
//             {errors.price && (
//               <p className="text-sm text-red-500">{errors.price.message}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label>Currency</Label>
//             <Input {...register("currency")} disabled />
//             {errors.currency && (
//               <p className="text-sm text-red-500">{errors.currency.message}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <Label>Max Appointments per Day</Label>
//             <Input
//               type="number"
//               {...register("max_appointments_per_day", { valueAsNumber: true })}
//             />
//             {errors.max_appointments_per_day && (
//               <p className="text-sm text-red-500">
//                 {errors.max_appointments_per_day.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Submit */}
//       <Button
//         type="submit"
//         className={`w-full md:w-auto self-center px-10 ${
//           loading ? "cursor-not-allowed" : "cursor-pointer"
//         }`}
//       >
//         {loading ? "Submitting..." : "Add Service"}
//       </Button>
//     </form>
//   );
// }

// export default AddServiceForm;
