"use client";
// ____ Components ...
import { Button, Input } from "@/components/common";
// ____ Lib ...
import { z } from "zod";
import { toast } from "sonner";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { zodResolver } from "@hookform/resolvers/zod";
// ____ Actions ...
import bookAppointmentAction from "@/actions/BookAppointment";
// ____ Types and schemas ...
import {
  BookingFormAPIRequest,
  BookingFormAPIResponse,
} from "@/validations/BookAppointmentSchema";
// ____ Hooks ...
import { useService } from "@/stores/service";
import { useForm } from "react-hook-form";
import axios from "axios";

const Form = () => {
  const { selectedService } = useService();
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof BookingFormAPIRequest>>({
    resolver: zodResolver(BookingFormAPIRequest),
    mode: "onChange",
    defaultValues: {
      service_id: selectedService.id,
      price: selectedService.price,
      currency: selectedService.currency,
    },
  });

  const onSubmit = async (data: z.infer<typeof BookingFormAPIRequest>) => {
    console.log("Form data:", data);
    try {
      // const response = await axios.post("/api/payment/intent");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <br />
      {/* Customer Name */}
      <div className="sm:w-[300px]">
        <label
          htmlFor="customer_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Your Name
        </label>
        <Input
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
      <div className="sm:w-[300px]">
        <label
          htmlFor="customer_email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email Address
        </label>
        <Input
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

      {/* Price */}
      <div className="sm:w-[300px]">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Price
        </label>
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-[10px] py-[5px] rounded-full">
          {selectedService.price}
        </span>
      </div>
      {/* Currency */}
      <div className="sm:w-[300px]">
        <label
          htmlFor="currency"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Currency
        </label>
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-[10px] py-[5px] rounded-full">
          <span className="text-green-500">
            {selectedService.currency} &nbsp;
          </span>
        </span>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${isSubmitting ? "bg-pink/80 cursor-not-allowed" : "bg-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}`}
      >
        {isSubmitting ? "Booking..." : "Book Appointment"}
      </Button>
    </form>
  );
};
export default Form;
