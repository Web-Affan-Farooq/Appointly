import Stripe from "stripe";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";
import type { AppointmentClient } from "@shared/types";
import { NextResponse, type NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const urls = {
  success: `${process.env.BETTER_AUTH_URL}/checkout/success`,
  failed: `${process.env.BETTER_AUTH_URL}/checkout/failed`,
};

// ____ Function for getting service name ...
const GetServiceDetails = async (service_id: string) => {
  const [requiredService] = await db
    .select({
      id: service.id,
      name: service.name,
      currency: service.currency,
      price: service.price,
    })
    .from(service)
    .where(eq(service.id, service_id));
  return {
    service_name: requiredService.name,
    service_id: requiredService.id,
    service_currency: requiredService.currency,
    service_price: requiredService.price,
  };
};

interface PivotObject {
  transfer_group: string;
  service_name: string;
  service_id: string;
  service_currency: string;
  service_price: number;
}

type FormData = AppointmentClient & {
  customer_name: string;
  customer_email: string;
};

export const POST = async (req: NextRequest) => {
  const formData: FormData = await req.json();
  /*
  Attached multiple trycatch blocks for effective error handling ...
  */
  console.log("-------------- Get formData -------------- : ");
  console.log(formData);
  // ____ For storing data from different blocks ...
  const pivot: PivotObject = {
    service_name: "",
    transfer_group: "",
    service_currency: "",
    service_id: "",
    service_price: 0,
  };
  console.log("-------------- Iniatlized pivot -------------- : ");
  console.log(pivot);
  try {
    console.log("-------------- allocating slot -------------- : ");
    const [requiredSlot] = await db
      .update(appointment)
      .set({
        booked: true,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        transfer_group: `appointment_${v4()}`,
      })
      .where(eq(appointment.id, formData.id))
      .returning();

    console.log("-------------- Allocated successfully -------------- : ");
    console.log(requiredSlot);

    console.log("-------------- Fetching service name -------------- : ");
    const serviceDetails = await GetServiceDetails(formData.service_id);
    console.log("-------------- service details -------------- : ");
    console.log(serviceDetails);
    // ____ Manipulate globally ...
    pivot.transfer_group = requiredSlot.transfer_group || "";
    pivot.service_name = serviceDetails.service_name;
    pivot.service_currency = serviceDetails.service_currency;
    pivot.service_price = serviceDetails.service_price;
    pivot.service_id = serviceDetails.service_id;
    console.log("-------------- Updated pivot -------------- : ");
    console.log(pivot);
  } catch (err) {
    console.log("-------------- An error occured -------------- : ");
    console.log(err);
    return NextResponse.json(
      {
        message: "Error while booking appointment",
      },
      { status: 500 },
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
      customer_email: formData.customer_email,
      line_items: [
        {
          price_data: {
            currency: pivot.service_currency.toLowerCase(),
            product_data: {
              name: `Appointment for ${pivot.service_name}`,
            },
            unit_amount: pivot.service_price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: urls.success,
      cancel_url: urls.failed,
      metadata: {
        appointment_id: formData.id,
        transfer_group: pivot.transfer_group,
      },
    });
    console.log("-------------- Checkout completed -------------- : ");
    console.log(session);
    return NextResponse.json({
      url: session.url || "",
      message: "Redirecting to checkout",
    });
  } catch (err) {
    console.log("-------------- An error occured -------------- : ");
    console.log(err);
    return NextResponse.json(
      {
        message: "Error in creating payment",
      },
      { status: 500 },
    );
  }
};
