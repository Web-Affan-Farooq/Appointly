//  /api/payment/create/route.ts ...
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import bcrypt from "bcrypt";
import {
  CheckoutAPIRequestSchema,
  CheckoutAPIResponseSchema,
} from "@/validations/CheckoutAPISchema";
import { z } from "zod";

/* ____ Stripe instance ... */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

/* ___ Stripe pricing ... */
const prices: Record<"PREMIUM" | "PRIMARY" | "FREE", string> = {
  PREMIUM: process.env.STRIPE_PREMIUM!,
  PRIMARY: process.env.STRIPE_PRIMARY!,
  FREE: "",
};

const PaymentHandler = async (req: NextRequest) => {
  try {
    const body = CheckoutAPIRequestSchema.parse(await req.json());

    /* ____ Call the payment handler ... */
    const urls = {
      success: new URL("/payment-success", req.url).toString(),
      failed: new URL("/payment-failed", req.url).toString(),
    };

    try {
      const hashPassword:string= await bcrypt.hash(body.password, 10);
      /* ____ Create customer ... */
      const customer = await stripe.customers.create({
        email: body.email,
        name: body.name,
      });

      /* ____ Create payment ... */
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: customer.id,
        line_items: [
          {
            price: prices[body.plan],
            quantity: 1,
          },
        ],
        metadata: {
          name: body.name,
          email: body.email,
          password: hashPassword,
          plan: body.plan,
        },
        success_url: urls.success,
        cancel_url: urls.failed,
        expand: ["subscription"],
      });

      const response: z.infer<typeof CheckoutAPIResponseSchema> = {
        message: "Payment completed successfully",
        url: session.url!,
      };

      /* ____ return values ... */
      return NextResponse.json(response, {
        status: 200,
      });
    } catch (err) {
      /* ____ return values ... */
      console.log("Error : ", err);
      return NextResponse.json(
        {
          message: "An error occured while creating subscription",
          url: urls.failed,
        },
        {
          status: 402,
        }
      );
    }
  } catch (err) {
    console.log(err);
    const response: z.infer<typeof CheckoutAPIResponseSchema> = {
      message: "An error occured",
      url: "",
    };
    return NextResponse.json(response, { status: 500 });
  }
};
export { PaymentHandler as POST };
