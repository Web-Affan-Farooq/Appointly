"use client";

// _____ Hooks ...
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// _____ utils...
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

// _____ Components ...
import { Label, Button } from "@/components/common";

// _____ Libraries...
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormProvider } from "react-hook-form";

// _____ Types and schemas ...
import { AddServiceAPIRequest } from "@/validations/AddServiceAPISchema";

// _____ Constants ...
import { serviceCategories } from "@/constants";
import CountriesData from "@/data/countries.json";

// _____ Actions ...
import { getCountry } from "./action";
import { DaySelect, HighlightsInput, InputWithLabel } from "./Components";
import { useDashboard } from "@/stores/dashboard";

export function AddServiceForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	// _____ For controlling navigation ...
	const router = useRouter();

	// _____ For adding a new service ...
	const { addService } = useDashboard();

	// _____ react hook form ...
	const formMethods = useForm<z.infer<typeof AddServiceAPIRequest>>({
		resolver: zodResolver(AddServiceAPIRequest),
		mode: "onChange",
		defaultValues: {
			working_days: [],
			details: [],
			user_id: "",
			currency: "",
			max_capacity: 1,
		},
	});

	// _____ For parsing submission status...
	const isSubmitting = useMemo(() => {
		return formMethods.formState.isSubmitting;
	}, [formMethods.formState.isSubmitting]);

	// _____ useEffect for fetching country and currency name accordig to service providers info ...
	useEffect(() => {
		const getData = async () => {
			try {
				const { data, error } = await authClient.getSession();
				if (error || !data) {
					toast(error?.message || "User not authenticated.");
					router.push("/login");
					return;
				}

				formMethods.setValue("user_id", data.user.id);

				const { country, success, message, redirect } = await getCountry(
					data.user.id,
				);
				if (!success || !country) {
					toast.error(message);
					return;
				} else if (redirect) {
					toast.error("message");
					router.push(redirect);
				}

				const requiredCurrency = CountriesData.find(
					(countryData) => countryData.code === country,
				);

				if (requiredCurrency) {
					formMethods.setValue("currency", requiredCurrency.currency, {
						shouldValidate: true,
					});
				}
			} catch (error) {
				toast.error("An unexpected error occurred.");
				console.error(error);
			}
		};
		getData();
	}, [router, formMethods]);

	useEffect(() => {
		console.log(formMethods.formState.errors);
	}, [formMethods.formState.errors]);

	return (
		<FormProvider {...formMethods}>
			<form
				className={cn(
					"flex flex-col gap-10 max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-md",
					className,
				)}
				{...props}
				onSubmit={formMethods.handleSubmit((formData) => addService(formData))}
			>
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-gray-900">
						Add a New Service
					</h1>
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
						<InputWithLabel
							id="service-name"
							name={"name"}
							label="Service name"
						/>
						<HighlightsInput />

						<div>
							<Label htmlFor="category" className="mb-1">
								Category
							</Label>
							<select
								{...formMethods.register("category")}
								className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
							>
								{serviceCategories.slice(1).map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
							{formMethods.formState.errors.category && (
								<p className="text-sm text-red-500">
									{formMethods.formState.errors.category.message}
								</p>
							)}
						</div>

						<InputWithLabel
							id="provider-name"
							name={"provider_name"}
							type="text"
							label="Provider / Organization"
						/>

						<div className="md:col-span-2">
							<Label htmlFor="description" className="mb-1">
								Description
							</Label>
							<textarea
								id="description"
								placeholder="Write a detailed description of your service..."
								className="w-full border rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-indigo-500"
								{...formMethods.register("description")}
							/>
							{formMethods.formState.errors.description && (
								<p className="text-sm text-red-500">
									{formMethods.formState.errors.description.message}
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
						<InputWithLabel
							id="start-time"
							name={"start_time"}
							type="time"
							label="Start time"
							onChange={(e) => console.log(e.target.value)}
						/>
						<InputWithLabel
							id="end-time"
							name={"end_time"}
							type="time"
							label="End time"
							onChange={(e) => console.log(e.target.value)}
						/>
						<DaySelect />
					</div>
				</section>

				{/* Pricing */}
				<section className="space-y-6">
					<h2 className="font-semibold text-lg text-gray-800 border-b pb-2">
						Pricing & Limits
					</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<InputWithLabel
							id="duration"
							name={"duration"}
							type="number"
							label="Duration"
						/>
						<InputWithLabel
							id="price"
							name={"price"}
							type="number"
							label="Price"
						/>
						<InputWithLabel
							name={"currency"}
							disabled
							type="text"
							label="Currency"
							id="currency"
						/>
						<InputWithLabel
							id="max-appointments-per-day"
							name={"max_appointments_per_day"}
							type="number"
							label="Max Appointments / Day"
						/>
						<InputWithLabel
							id="max-capacity"
							name={"max_capacity"}
							type="number"
							label="Max Capacity"
						/>
					</div>
				</section>

				{/* Submit */}
				<div className="flex justify-center">
					<Button
						id="submit"
						type="submit"
						className={`w-full md:w-auto px-10 py-2 rounded-lg ${
							isSubmitting ? "cursor-not-allowed bg-pink/80" : ""
						} text-white font-medium shadow`}
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Add Service"}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
}

export default AddServiceForm;
