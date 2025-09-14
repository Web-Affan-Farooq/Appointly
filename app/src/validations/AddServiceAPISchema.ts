import { z } from "zod";
import { days } from "@/constants";
import type {Service} from "@/db/schemas/tables/services";

const weekDayEnum = z.enum(days);

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

    price: z
      .number("Price is required")
      .nonnegative("Price cannot be negative"),

    currency: z
      .string("Currency is required")
      .length(3, "Currency must be a 3-letter code (e.g., USD, PKR)"),

        working_days: z
      .array(weekDayEnum)
      .nonempty("At least one day required"),

    start_time: z
      .string("Start time is required")
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
        "Invalid time format (HH:MM or HH:MM:SS)"
      ),

    end_time: z
      .string("End time is required")
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
        "Invalid time format (HH:MM or HH:MM:SS)"
      ),

    duration: z
      .number("Duration is required")
      .positive("Duration must be positive"),

    max_appointments_per_day: z
      .number("Must be a number")
      .positive("Must be positive")
      .optional(),      
  })
  .strict();

const AddServiceAPIResponse = z
  .object({
    success: z.boolean(),
    message: z.string(),
    service:z.custom<Service>(),
  })
  .strict();

export { AddServiceAPIRequest, AddServiceAPIResponse };
