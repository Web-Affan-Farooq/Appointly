// _____ Libraries ...
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { z } from "zod";
import { auth } from "@/lib/auth";

import { ProviderSignupAPIRequestSchema } from "@/app/(provider)/(Auth)/create-account/_validations";
import { PaymentService } from "@/shared/services";

const validate = async (
  data: z.infer<typeof ProviderSignupAPIRequestSchema>,
): Promise<string[] | null> => {
  try {
    ProviderSignupAPIRequestSchema.parse(data);
    return null;
  } catch (err: any) {
    return err.issues.map((issue: any) => issue.message);
  }
};

export async function POST(req: NextRequest) {
  console.log(
    "--------------------  Running /api/create-account   -------------------",
  );
  // ____ Get the data and sanitize it ...
  const body = await req.json();
  const errors = await validate(body);

  // ____ Return error messages if any ...
  if (errors) {
    return NextResponse.json(
      {
        message: errors[0],
      },
      { status: 422 },
    );
  }

  // ____ Instantiate payment service ...
  const payments = new PaymentService();
  const accountResponse = await payments.CreateProviderAccount({
    email: body.email,
    country: body.country,
  });

  if (accountResponse.status !== 200) {
    return NextResponse.json(
      { message: accountResponse.message },
      { status: accountResponse.status },
    );
  }

  const { message, url } = await payments.GenerateOnboardingLink({
    stripeAccountId: accountResponse.account_id as string,
    baseUrl: req.url,
  });

  if (!url) {
    return NextResponse.json({ message }, { status: 500 });
  }

  // _____ Create user account using better auth ...
  await auth.api.signUpEmail({
    body: {
      name: body.name,
      email: body.email,
      role: "PROVIDER",
      password: body.password,
      stripe_account_id: accountResponse.account_id,
    },
  });

  console.log("Redirected user to :", url);
  return NextResponse.redirect(url, { status: 302 });
}
