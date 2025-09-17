import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import { z } from "zod";
import { BookingFormAPIRequest } from "@/validations/BookAppointmentSchema";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ____ Function for getting service name ...
const findService = async (service_id: string) => {
  const [requiredService] = await db
    .select({ name: service.name })
    .from(service)
    .where(eq(service.id, service_id));
  return requiredService.name;
};

interface PivotObject {
  appointment_id: string;
  transfer_group: string;
  service_name: string;
}

export const POST = async (req: NextRequest) => {
  /*
  Attached multiple trycatch blocks for effective error handling ...
  */
  const body: z.infer<typeof BookingFormAPIRequest> = await req.json();
  console.log("-------------- Get body -------------- : ", body);
  console.log(body);
  // ____ For storing data from different blocks ...
  const pivot: PivotObject = {
    appointment_id: "",
    service_name: "",
    transfer_group: "",
  };
  console.log("-------------- Iniatlized pivot -------------- : ");
  console.log(pivot);
  // ____ Insert appointment in db and make sure to make it globally available ...
  try {
    console.log("-------------- Inserting apointment -------------- : ");
    const [newAppointment] = await db
      .insert(appointment)
      .values({
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        service_id: body.service_id,
        transfer_group: `appointment_${v4()}`,
      })
      .returning();
    console.log("-------------- Inserted successfully -------------- : ");
    console.log(newAppointment);

    console.log("-------------- Fetching service name -------------- : ");
    const serviceName = await findService(body.service_id);
    console.log("-------------- service name -------------- : ");
    console.log(serviceName);
    // ____ Manipulate globally ...
    pivot.appointment_id = newAppointment.id;
    pivot.transfer_group = newAppointment.transfer_group!;
    pivot.service_name = serviceName;
    console.log("-------------- Updated pivot -------------- : ");
    console.log(pivot);
  } catch (err) {
    console.log("-------------- An error occured -------------- : ");
    console.log(err);
    return NextResponse.json(
      {
        message: "Error while creating appointment",
        url: null,
      },
      {
        status: 500,
      }
    );
  }

  // _____ Create Checkout Session (customer pays into platform account) ...
  try {
    console.log("-------------- Creating checkout -------------- : ");
    console.log("-------------- Checking Pivot -------------- : ");
    console.log(pivot);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: body.customer_email,
      line_items: [
        {
          price_data: {
            currency: body.currency.toLowerCase(),
            product_data: {
              name: `Appointment for ${pivot.service_name}`,
            },
            unit_amount: body.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: new URL("/checkout/success", req.url).toString(),
      cancel_url: new URL("/checkout/failed", req.url).toString(),
      metadata: {
        appointment_id: pivot.appointment_id,
        transfer_group: pivot.transfer_group,
      },
    });
    console.log("-------------- Checkout completed -------------- : ");
    console.log(session);
    return NextResponse.json({
      url: session.url!,
      message: "Redirecting to checkout",
    });
  } catch (err) {
    console.log("-------------- An error occured -------------- : ");
    console.log(err);
    return NextResponse.json({
      message: "Error in creating payment",
      url: null,
    },{status:500});
  }
};

/*

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function transferToProvider(appointment: any, providerStripeAccountId: string) {
  const providerAmount = Math.floor(appointment.price * 0.97 * 100); // cents

  const transfer = await stripe.transfers.create({
    amount: providerAmount,
    currency: appointment.currency,
    destination: providerStripeAccountId,
    transfer_group: appointment.transfer_group,
  });

  console.log("Transfer success:", transfer.id);
  return transfer;
}

*/