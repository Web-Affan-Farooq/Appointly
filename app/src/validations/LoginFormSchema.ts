import { z } from "zod";

const LoginAPIRequestSchema = z
	.object({
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
	})
	.strict();

const LoginAPIResponseSchema = z
	.object({
		message: z.string(),
		redirect: z.string().optional(),
		success: z.boolean(),
	})
	.strict();

export { LoginAPIRequestSchema, LoginAPIResponseSchema };
