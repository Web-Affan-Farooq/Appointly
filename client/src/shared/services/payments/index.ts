import Stripe from "stripe";

import db from "@/db";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";

type GetCountryResponse = {
  message: string;
  status: 404 | 422 | 200 | 500;
  data: {
    id: string;
    country: string;
    email: string;
    type: string;
  } | null;
};

export class PaymentService {
  stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }

  // ______ Connect user account to stripe ...
  async ConnectProvider() {}

  // ______ Get provider's country  ...
  async GetProviderCountry(
    account_id: string | null,
  ): Promise<GetCountryResponse> {
    let response: GetCountryResponse | null = null;

    if (!account_id) {
      response = {
        message: "Error : Account id not mentioned",
        status: 422,
        data: null,
      };
      return response;
    }

    const account = await this.stripe.accounts.retrieve(account_id);
    console.log("Provider account country: ", account.country); // e.g. "US", "AU"

    response = {
      data: {
        id: account.id,
        email: account.email as string,
        country: account.country as string,
        type: account.type,
      },
      message: "Fetched provider country successfully",
      status: 200,
    };

    return response;
  }

  // ______ Method for disconnecting provider's stripe account ...
  async DisconnectStripeAccount(email: string) {
    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!existingUser) {
      return {
        message: "Provider not found",
        status: 404,
      };
    }

    const stripeAccountId = existingUser.stripe_account_id as string;

    const deleted = await this.stripe.accounts.del(stripeAccountId);
    console.log("Deleted Stripe account:", deleted);

    return { message: "Stripe disconnected successfully", status: 200 };
  }
}
