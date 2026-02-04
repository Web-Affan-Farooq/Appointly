import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import db from "@/db";
import { user } from "@/db/schemas";

import Stripe from "stripe";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const getCountry = async (req: NextRequest) => {
  const userId = await req.json();
  console.log("Running getCountry() server action  ...");
  try {
    const [requiredUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    // ______ If user not found return error ...
    if (!requiredUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // ____ missing stripe_account_id means user have'nt completed the onboarding , return error ...
    if (!requiredUser.stripe_account_id) {
      return NextResponse.json(
        {
          message:
            "Please complete stripe onboarding before creating any service",
        },
        {
          status: 403,
        },
      );
    }

    // ____ Successfully return country...

    const { country } = await stripe.accounts.retrieve(
      requiredUser.stripe_account_id,
    );

    return NextResponse.json(
      {
        country: country,
        message: "Success",
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "An error occured",
      },
      {
        status: 500,
      },
    );
  }
};
