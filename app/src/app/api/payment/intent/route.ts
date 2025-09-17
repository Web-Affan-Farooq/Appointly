import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/db";
import { appointment } from "@/db/schemas";
import {z} from "zod";
import { BookingFormAPIRequest } from "@/validations/BookAppointmentSchema";
import {v4} from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// - create a new entry in appointments
// - Create payment intent
// - send the client secret returned by the payment intent
export const POST = async (req:NextRequest) => {
    const {customer_email, customer_name,service_id}:z.infer<typeof BookingFormAPIRequest> = await req.json();
    try {
        const newAppointment = await db.insert(appointment).values(
            {
                customer_name:customer_name,
                customer_email:customer_email,
                service_id:service_id,
                transfer_group:`appointment_${v4()}`,
            }
        )             
    } catch (err) {
        
    }
}
/**
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { v4 as uuid } from "uuid";

export async function createAppointmentAndPayment(amount: number, customer: { name: string; email: string }) {
  const appointmentId = uuid(); // or auto increment from DB
  const transferGroup = `appointment_${appointmentId}`;

  // 1️⃣ Insert into DB
  await db.insert(appointments).values({
    id: appointmentId,
    customer_name: customer.name,
    customer_email: customer.email,
    amount,
    status: "PENDING",
    transfer_group: transferGroup,
  });

  // 2️⃣ Create PaymentIntent in Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    receipt_email: customer.email,
    payment_method_types: ["card"],
    transfer_group: transferGroup, // tie to appointment
  });

  return { clientSecret: paymentIntent.client_secret, appointmentId };
}

 */

/*
await stripe.transfers.create({
  amount: Math.floor(amount * 0.97 * 100), // 97% to provider
  currency: "usd",
  destination: provider.stripe_account_id,
  transfer_group: appointment.transfer_group, // use the same one you stored
});
*/