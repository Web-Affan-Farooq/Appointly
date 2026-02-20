import { z } from "zod";
import CountriesData from "@shared/data/countries.json";

const countryCodes = CountriesData.map((country) => country.code);

export const ProviderSignupAPIRequestSchema = z
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
    country: z.literal(countryCodes, "Invalid country code"),
  })
  .strict();

export const ProviderSignupAPIResponseSchema = z
  .object({
    url: z.string(),
  })
  .strict();
