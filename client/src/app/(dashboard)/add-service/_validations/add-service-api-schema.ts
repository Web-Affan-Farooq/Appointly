import { z } from "zod";
import { days } from "@/shared/constants/constants";

const AddServiceAPISchema = z
  .object({
    name: z
      .string("Name is required")
      .min(3, "Minimum 3 characters required")
      .max(100, "Maximum 100 characters allowed"),
    user_id: z.string(),
    category: z.string(),
    provider_name: z.string(),
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
      .array(z.enum(days))
      .nonempty("At least one day is required")
      .refine((arr) => new Set(arr).size === arr.length, {
        message: "Days must be unique",
      }),

    start_time: z
      .string("Start time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Invalid time format"),

    details: z.array(z.string()).nonempty("Please provide at least one detail"),

    end_time: z
      .string("End time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Invalid time format"),

    duration: z
      .number("Duration is required")
      .positive("Duration must be positive"),

    max_appointments_per_day: z
      .number("Must be a number")
      .positive("Must be positive"),

    max_capacity: z.number("Must be a number").positive("Must be positive"),
  })
  .strict()
  .superRefine((data, ctx) => {
    // parse start/end time into minutes
    const [startHour, startMin] = data.start_time.split(":").map(Number);
    const [endHour, endMin] = data.end_time.split(":").map(Number);

    const totalAvailableMinutes =
      endHour * 60 + endMin - (startHour * 60 + startMin);

    if (totalAvailableMinutes <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be after start time",
        path: ["end_time"],
      });
      return;
    }

    // total possible appointments in a day (if capacity is 1)
    const maxPossibleAppointments =
      Math.floor(totalAvailableMinutes / data.duration) * data.max_capacity;

    if (data.max_appointments_per_day > maxPossibleAppointments) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `With ${data.max_capacity} capacity and ${data.duration} min per appointment, only ${maxPossibleAppointments} appointments fit in the available time. Please adjust your values.`,
        path: ["max_appointments_per_day"],
      });
    }
  });

export { AddServiceAPISchema };
