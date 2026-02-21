import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";

import db from "@/db";
import { nextCookies } from "better-auth/next-js";
import * as Schema from "@/db/schemas/tables/users";
import { sendEmail } from "./send-email";

export const auth = betterAuth({
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "USER",
      },
      stripe_account_id: {
        type: "string",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: Schema,
  }),
  plugins: [
    nextCookies(),
    emailOTP({
      expiresIn: 300, // OTP valid for 5 minutes
      allowedAttempts: 3,
      disableSignUp: true, // Only allow existing users (providers)
      async sendVerificationOTP({ email, otp }) {
        // Use your custom sendEmail function
        const result = await sendEmail({
          to: email,
          subject: "Appointly OTP code verification",
          text: `Your login OTP is: ${otp} .`,
        });
        if (!result.success) {
          throw new Error(`Failed to send OTP: ${result.error}`);
        }
      },
    }),
  ],
});
