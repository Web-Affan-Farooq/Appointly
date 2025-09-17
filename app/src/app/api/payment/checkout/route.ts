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
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  try {
    const body = CheckoutAPIRequestSchema.parse(await req.json());

    try {
      const hashPassword:string= await bcrypt.hash(body.password, 10);
      /* ____ Create customer ... */
      const customer = await stripe.customers.create({
        email: body.email,
        name: body.name,
      });

      /* ____ Create payment ... */
  
      const response: z.infer<typeof CheckoutAPIResponseSchema> = {
        message: "Payment completed successfully",
        url: "",
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
          url: "",
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