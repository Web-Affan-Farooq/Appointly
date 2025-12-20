"use client";
// ____ Hooks ...
import { useEffect } from "react";
import { useSlot } from "../_hooks/use-slots";

// ____ Components ...
import { Button, Input, Loader } from "@/components/common";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconArrowNarrowRight } from "@tabler/icons-react";

// ____ Libraries ...
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// ____ Schema and types  ...
import { BookingFormAPIRequest } from "../_validations/book-appointment-schema";
import { ClientService } from "@/@types/types";

// ____ Actions ...
import BookAppointmentAction from "../_actions/book-appointment"

const BookingForm = ({ service }: { service: ClientService }) => {
  // _____ get selected slot from global state...
  const { selectedSlot } = useSlot();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof BookingFormAPIRequest>>({
    resolver: zodResolver(BookingFormAPIRequest),
    mode: "onChange",
    defaultValues: {
      token: service.appointmentsCount + 1,
      service_id: service.id,
      price: service.price,
      currency: service.currency,
      appointment_id: selectedSlot && selectedSlot.id,
    },
  });

  // _____ Change value when selectedSlot changed ...
  useEffect(() => {
    reset({
      token: service.appointmentsCount + 1,
      service_id: service.id,
      price: service.price,
      currency: service.currency,
      appointment_id: selectedSlot?.id,
    });
  }, [selectedSlot, reset, service]);

  const onSubmit = async () => {
    const formData = getValues();
    console.log("Form data : ", formData);
    const { message, success, url } = await BookAppointmentAction(formData);

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success(message);
    if (url) window.location.href = url;
  };

  if (!selectedSlot) {
    return <></>;
  }
  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="w-full py-3 text-lg font-semibold flex flex-row justify-center items-center">
          <p>Book Appointment</p>
          <IconArrowNarrowRight className="w-5 h-5 ml-2" />
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="my-4">
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription hidden>
            Please fill in the required details.
          </DialogDescription>
        </DialogHeader>

        {/* Actual Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer Name */}
          <div className="flex gap-[8px] flex-col">
            <label className="block text-sm font-medium">Your Name</label>
            <Input {...register("customer_name")} placeholder="John Doe" />
            {errors.customer_name && (
              <p className="text-sm text-red-600">
                {errors.customer_name.message}
              </p>
            )}
          </div>

          {/* Customer Email */}
          <div className="flex gap-[8px] flex-col">
            <label className="block text-sm font-medium">Email Address</label>
            <Input
              type="email"
              {...register("customer_email")}
              placeholder="you@example.com"
            />
            {errors.customer_email && (
              <p className="text-sm text-red-600">
                {errors.customer_email.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium">Price</label>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {service.price}
            </span>
          </div>

          {/* Currency */}
          <div>
            <label className="block mb-2 text-sm font-medium">Currency</label>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {service.currency}
            </span>
          </div>

          {/* Submit Button */}
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center gap-2 text-white ${
              isSubmitting ? "bg-pink/70 cursor-not-allowed" : "bg-pink"
            }`}
          >
            {isSubmitting ? <Loader /> : "Book Appointment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
