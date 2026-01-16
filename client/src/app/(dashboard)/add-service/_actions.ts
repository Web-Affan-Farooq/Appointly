"use server";
import db from "@/db";
import { service, user } from "@/db/schemas";

// _____ Libraries ...
import { z } from "zod";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

// _____ Types and schemas ...
import { AddServiceAPISchema } from "./_validations/add-service-api-schema";
import { ServiceDashboard } from "../dashboard/_types";
// ____ Utils ...
import GenerateSlots from "@/utils/generate-slots";

const addServiceAction = async (
  formData: z.infer<typeof AddServiceAPISchema>
): Promise<{
  message: string;
  success: boolean;
  service?: ServiceDashboard;
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
    const slots = GenerateSlots({
      service_id: newService.id,
      durationMinutes: newService.duration,
      workingDays: newService.working_days,
      startTime: newService.start_time,
      endTime: newService.end_time,
    });

    console.log("Generated slots  : ", slots);

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
  status: 200 | 404 | 403 | 500;
  message: string;
  country?: string;
}> => {
  console.log("Running getCountry() server action  ...");
  try {
    const [requiredUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    // ______ If user not found return error ...
    if (!requiredUser) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    // ____ missing stripe_account_id means user have'nt completed the onboarding , return error ...
    if (!requiredUser.stripe_account_id) {
      return {
        status: 403,
        message:
          "Please complete stripe onboarding before creating any service",
      };
    }

    // ____ Successfully return country...

    const { country } = await stripe.accounts.retrieve(
      requiredUser.stripe_account_id
    );

    return {
      status: 200,
      country: country,
      message: "Success",
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "An error occured",
    };
  }
};
export { addServiceAction, getCountry };
