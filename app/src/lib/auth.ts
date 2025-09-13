import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import { nextCookies } from "better-auth/next-js";
import * as Schema from "@/db/schemas/tables/users";
import { Resend } from "resend";
import AccountVerificationEmail from "@/components/emails/VerifyAccount";

const resendAPIKey = process.env.RESEND_TOKEN!;

const resend = new Resend(resendAPIKey);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [user.email],
        subject: "Hello world",
        react: AccountVerificationEmail({
          username:user.name,
          verifyUrl:url
        }),
      });
    },
    sendOnSignUp: true,
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
  plugins: [nextCookies()],
});
