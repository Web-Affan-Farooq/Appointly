// _____ Libraries ...
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import Stripe from "stripe";
import type { z } from "zod";

import { auth } from "@/lib/auth";

import { ProviderSignupAPIRequestSchema } from "@/app/(provider)/(Auth)/create-account/_validations";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    console.log(
      "--------------------  Running /api/create-account   -------------------",
    );
    // ____ Get the data and sanitize it ...
    const body: z.infer<typeof ProviderSignupAPIRequestSchema> =
      await req.json();
    const parsed = ProviderSignupAPIRequestSchema.parse(body);

    console.log("body : ", body);
    console.log("Parsed body : ", parsed);

    // 1️⃣ Create a Stripe account
    const account = await stripe.accounts.create({
      type: "express",
      country: parsed.country,
      email: parsed.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    console.log("Created account : ", account);
    // 2️⃣ Generate account link (redirect URL for onboarding)
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: new URL("/create-account", req.url).toString(),
      return_url: new URL("/dashboard", req.url).toString(),
      type: "account_onboarding",
    });

    console.log("account link : ", accountLink);
    // _____ Create user account using better auth ...
    await auth.api.signUpEmail({
      body: {
        name: body.name,
        email: body.email,
        role: "PROVIDER",
        password: body.password,
        stripe_account_id: account.id,
      },
    });

    console.log("Process completed ....");
    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    console.log(err);
    // ignore this error
    return NextResponse.json({ error: "An error occured" }, { status: 400 });
  }
}
