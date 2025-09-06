import { z } from "zod";

const CheckoutAPIRequestSchema = z
  .object({
    name: z
      .string("Invalid name")
      .min(7, "Minimum 7 characters required")
      .max(20, "Maximum 20 characters required"),
    email: z.email("Invalid email"),
    password: z
      .string({ message: "Please Enter password" })
      .min(8, "Password must be at least 8 characters long")
      .max(15, "Password must be shorter than 15 characters")

      // _____ Validate lowercase characters
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must include lowercase characters",
      })

      // _____ Validate uppercase characters
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must include uppercase characters",
      })

      // _____ Validate lowercase characters
      .refine((val) => /[@$!%*?&]/.test(val), {
        message: "Password must include special characters",
      }),

    plan: z.union([
      z.literal("FREE"),
      z.literal("PRIMARY"),
      z.literal("PREMIUM"),
    ]),
  })
  .strict();

const CheckoutAPIResponseSchema = z
  .object({
    message: z.string(),
    url: z.string(),
  })
  .strict();

export { CheckoutAPIRequestSchema, CheckoutAPIResponseSchema };
