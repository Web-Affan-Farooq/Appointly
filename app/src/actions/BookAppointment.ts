"use server";
import Stripe from "stripe";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import { z } from "zod";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";
import { BookingFormAPIRequest } from "@/validations/BookAppointmentSchema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const urls = {
  success: process.env.BETTER_AUTH_URL + "/checkout/success",
  failure: process.env.BETTER_AUTH_URL + "/checkout/failed",
};

// ____ Function for getting service name ...
const findService = async (service_id: string) => {
  const [requiredService] = await db
    .select({ name: service.name })
    .from(service)
    .where(eq(service.id, service_id));
  return requiredService.name;
};

interface PivotObject {
  transfer_group: string;
  service_name: string;
}

const BookAppointmentAction = async (
  formData: z.infer<typeof BookingFormAPIRequest>
): Promise<{
  message: string;
  success: boolean;
  url?: string;
}> => {
  /*
  Attached multiple trycatch blocks for effective error handling ...
  */
  console.log("-------------- Get formData -------------- : ", formData);
  console.log(formData);
  // ____ For storing data from different blocks ...
  const pivot: PivotObject = {
    service_name: "",
    transfer_group: "",
  };
  console.log("-------------- Iniatlized pivot -------------- : ");
  console.log(pivot);
  // ____ Insert appointment in db and make sure to make it globally available ...
  try {
    console.log("-------------- allocating slot -------------- : ");
    const [requiredSlot] = await db.update(appointment).set({
      booked:true,
      customer_name:formData.customer_name,
      customer_email:formData.customer_email,
      transfer_group: `appointment_${v4()}`,
    }).where(eq(appointment.id , formData.appointment_id)).returning()

    console.log("-------------- Allocated successfully -------------- : ");
    console.log(requiredSlot);

    console.log("-------------- Fetching service name -------------- : ");
    const serviceName = await findService(formData.service_id);
    console.log("-------------- service name -------------- : ");
    console.log(serviceName);
    // ____ Manipulate globally ...
    pivot.transfer_group = requiredSlot.transfer_group!;
    pivot.service_name = serviceName;
    console.log("-------------- Updated pivot -------------- : ");
    console.log(pivot);
  } catch (err) {
    console.log("-------------- An error occured -------------- : ");
    console.log(err);
    return {
      message: "Error while creating appointment",
      success: false,
    };
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
            currency: formData.currency.toLowerCase(),
            product_data: {
              name: `Appointment for ${pivot.service_name}`,
            },
            unit_amount: formData.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: urls.success,
      cancel_url: urls.failure,
      metadata: {
        appointment_id: formData.appointment_id,
        transfer_group: pivot.transfer_group,
      },
    });
    console.log("-------------- Checkout completed -------------- : ");
    console.log(session);
    return {
      url: session.url!,
      success: true,
      message: "Redirecting to checkout",
    };
  } catch (err) {
    console.log("-------------- An error occured -------------- : ");
    console.log(err);
    return {
      message: "Error in creating payment",
      success: false,
    };
  }
};

export default BookAppointmentAction;
