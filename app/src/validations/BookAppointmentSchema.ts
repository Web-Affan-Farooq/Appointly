import { z } from "zod";

export const BookingFormAPIRequest = z
  .object({
    customer_name: z
      .string()
      .min(1, { message: "Customer name is required." }),

    customer_email: z
      .string()
      .email({ message: "Invalid email address." }),

    service_id: z.string(),

    price: z.number().int({ message: "Price must be an integer." }),

    currency: z.string(),

    appointment_id: z.string().uuid({ message: "Invalid appointment ID." }),

    token: z
      .number({ error: "Token must be a number." })
      .positive("Token number must be positive"),

    started_on: z
      .string()
      .datetime({ message: "Start date and time is required." }),

    ended_on: z
      .string()
      .datetime({ message: "End date and time is required." }),
  })
  .superRefine((data, ctx) => {
    if (
      data.started_on &&
      data.ended_on &&
      new Date(data.ended_on) <= new Date(data.started_on)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ended_on"],
        message: "End time must be after start time.",
      });
    }
  });

export const BookingFormAPIResponse = z
  .object({
    success: z.boolean(),
    message: z.string(),
  })
  .strict();
