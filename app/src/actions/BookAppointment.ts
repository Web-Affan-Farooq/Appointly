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
  appointment_id: string;
  transfer_group: string;
  service_name: string;
}

const BookAppointmentAction = async (
  formData: z.infer<typeof BookingFormAPIRequest>
) :Promise<{
    message:string;
    success:boolean;
    url?:string
}>=> {
  /*
  Attached multiple trycatch blocks for effective error handling ...
  */
  console.log("-------------- Get formData -------------- : ", formData);
  console.log(formData);
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
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        service_id: formData.service_id,
        transfer_group: `appointment_${v4()}`,
        token: formData.token,
      })
      .returning();
    console.log("-------------- Inserted successfully -------------- : ");
    console.log(newAppointment);

    console.log("-------------- Fetching service name -------------- : ");
    const serviceName = await findService(formData.service_id);
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
    return {
        message: "Error while creating appointment",
        success:false
      }
  }

  // _____ Create Checkout Session (customer pays into platform account) ...
  try {
    console.log("-------------- Creating checkout -------------- : ");
    console.log("-------------- Checking Pivot -------------- : ");
    console.log(pivot);
    console.log(
      "-------------- Updating service appointment count -------------- : "
    );
    await db
      .update(service)
      .set({
        appointmentsCount: formData.token,
      })
      .where(eq(service.id, formData.service_id));

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
        appointment_id: pivot.appointment_id,
        transfer_group: pivot.transfer_group,
      },
    });
    console.log("-------------- Checkout completed -------------- : ");
    console.log(session);
    return {
      url: session.url!,
      success:true,
      message: "Redirecting to checkout",
    }
  } catch (err) {
    console.log("-------------- An error occured -------------- : ");
    console.log(err);
    return {
        message: "Error in creating payment",
        success:false,
      }
  }
};

export default BookAppointmentAction;
