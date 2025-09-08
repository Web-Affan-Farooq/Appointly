import { z } from "zod";

const weekDayEnum = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

const AddServiceAPIRequest = z
  .object({
    name: z
      .string("Name is required")
      .min(3, "Minimum 3 characters required")
      .max(100, "Maximum 100 characters allowed"),

    description: z
      .string("Description is required")
      .min(50, "Minimum 50 characters required")
      .max(300, "Maximum 300 characters allowed"),

    start_time: z
      .string("Start time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Invalid time format (HH:MM or HH:MM:SS)"),

    end_time: z
      .string("End time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Invalid time format (HH:MM or HH:MM:SS)"),

    duration: z
      .number("Duration is required")
      .positive("Duration must be positive"),

    price: z
      .number("Price is required")
      .nonnegative("Price cannot be negative"),

    currency: z
      .string("Currency is required" )
      .length(3, "Currency must be a 3-letter code (e.g., USD, PKR)"),

    max_appointments_per_day: z
      .number("Must be a number")
      .positive("Must be positive")
      .optional(),

    days_of_availability: z.array(weekDayEnum).nonempty("At least one day required"),
  })
  .strict();

const AddServiceAPIResponse = z
  .object({
    success: z.boolean(),
    message: z.string(),
    serviceId: z.string().uuid().optional(),
  })
  .strict();

export { AddServiceAPIRequest, AddServiceAPIResponse };
