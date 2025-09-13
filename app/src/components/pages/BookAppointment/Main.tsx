"use client";
// _____ Hooks ...
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// _____ Libraries ...
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// _____ Actions ...
import bookAppointmentAction from "./action";
// _____ Types and schemas ...
import {
  BookingFormAPIRequest,
  BookingFormAPIResponse,
} from "@/validations/BookAppointmentSchema";
// _____ Components ...
import { Button } from "@/components/common";

// Define the type for a service object
interface Service {
  id: string;
  name: string;
}

// Mock data for services, replace with data from your backend
const services: Service[] = [
  { id: "3448375e-85a0-435b-80a5-f938d172e29c", name: "Standard Cleaning" },
  { id: "1b9e832d-22c6-4d0f-b2e5-4a6c8a7b055d", name: "Deep Cleaning" },
  { id: "8f0a1c1d-1b32-4e4f-9e7c-8b1a2d3e4f5g", name: "Office Cleaning" },
];

// Define the Zod schema for form validation

// Infer the TypeScript type from the Zod schema
type FormData = z.infer<typeof BookingFormAPIRequest>;

// Define the type for the message state
type Message = { success: boolean; message: string } | null;

const BookingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(BookingFormAPIRequest),
    mode: "onChange",
  });

  const [message, setMessage] = useState<Message>(null);

  const onSubmit = async (data: FormData) => {
    setMessage(null);
    console.log("Form data:", data);

    // Simulate API call
    try {
      const response = await bookAppointmentAction(data);
      setMessage(response);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({
        success: false,
        message: "Failed to book appointment. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Book an Appointment
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Fill out the form below to schedule your service.
        </p>

        {message && (
          <div
            className={`p-4 rounded-lg text-center ${message.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {message.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer Name */}
          <div>
            <label
              htmlFor="customer_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Your Name
            </label>
            <input
              id="customer_name"
              type="text"
              {...register("customer_name")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="John Doe"
            />
            {errors.customer_name && (
              <p className="mt-2 text-sm text-red-600">
                {errors.customer_name.message}
              </p>
            )}
          </div>

          {/* Customer Email */}
          <div>
            <label
              htmlFor="customer_email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email Address
            </label>
            <input
              id="customer_email"
              type="email"
              {...register("customer_email")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="you@example.com"
            />
            {errors.customer_email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.customer_email.message}
              </p>
            )}
          </div>

          {/* Service Selection */}
          <div>
            <label
              htmlFor="service_id"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Select a Service
            </label>
            <select
              id="service_id"
              {...register("service_id")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">-- Choose a service --</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service_id && (
              <p className="mt-2 text-sm text-red-600">
                {errors.service_id.message}
              </p>
            )}
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Time */}
            {/* <div>
              <label
                htmlFor="started_on"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Start Time
              </label>
              <input
                id="started_on"
                type="datetime-local"
                {...register("started_on")}
                className="mt-1 cursor-pointer block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.started_on && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.started_on.message}
                </p>
              )}
            </div> */}

            {/* End Time */}
            {/* <div>
              <label
                htmlFor="ended_on"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                End Time
              </label>
              <input
                id="ended_on"
                type="datetime-local"
                {...register("ended_on")}
                className="mt-1 cursor-pointer block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              {errors.ended_on && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.ended_on.message}
                </p>
              )}
            </div>*/}
          </div>

          {/* Submit Button */}

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}`}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
