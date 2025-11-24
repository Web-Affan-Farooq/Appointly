"use server";
import db from "@/db";
import { service, appointment, user } from "@/db/schemas";

// _____ Libraries ...
import { z } from "zod";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

// _____ Types and schemas ...
import { AddServiceAPIRequest } from "@/validations/AddServiceAPISchema";
import { ServiceData } from "@/@types/types";

// ____ Utils ...
import CreateSlots from "@/utils/CreateSlots";

const addServiceAction = async (
  formData: z.infer<typeof AddServiceAPIRequest>
): Promise<{
  message: string;
  success: boolean;
  service?: ServiceData;
}> => {
  console.log(
    "--------------------- Running addServiceAction () ... -------------------------"
  );
  try {
    const [newService] = await db
      .insert(service)
      .values({
        ...formData,
        maxCapacity: formData.max_capacity,
        user_id: formData.user_id,
      })
      .returning();

    console.log("Inserted a new service  : ", newService);
    console.log("Generating slots  : ", "-------------");
    const slots = CreateSlots({
      maxAppointments:formData.max_appointments_per_day, 
      service_id:newService.id,
  durationMinutes:newService.duration,
  workingDays:newService.working_days,
  startTime:newService.start_time,
  endTime:newService.end_time,
    })

    await db.insert(appointment).values(slots)
    console.log("Generated slots  : ",slots);

    console.log(
      "----------------------------Operation completed successfully-----------------------------"
    );
    return {
      success: true,
      message: "Added a new service",
      service: {
        ...newService,
        appointments: [],
      },
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const getCountry = async (
  userId: string
): Promise<{
  success: boolean;
  message: string;
  country?: string;
  redirect?: string;
}> => {
  console.log("Running getCountry() server action  ...");
  try {
    const [requiredUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));
    if (!requiredUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    if (!requiredUser.stripe_account_id) {
      return {
        success: false,
        redirect: "/dashboard",
        message:
          "Please complete stripe onboarding before creating any service",
      };
    }
    const { country } = await stripe.accounts.retrieve(
      requiredUser.stripe_account_id
    );

    return {
      success: true,
      country: country,
      message: "Got info successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occured",
    };
  }
};
export { addServiceAction, getCountry };
