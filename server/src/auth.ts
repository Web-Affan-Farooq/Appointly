import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { emailOTP } from "better-auth/plugins";

import db from "./db";

import * as Schema from "./db/schemas/tables/users";
import { sendEmail } from "./services/email.service";
import { googleCreds, clientURL } from "./env";

export const auth = betterAuth({
    user: {
        enabled: true,
        changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true,
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
            clientId: googleCreds.clientId,
            clientSecret: googleCreds.clientSecret,
        },
    },
    trustedOrigins: [clientURL],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: Schema,
    }),
    plugins: [
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
        // nextCookies(),
    ],
});