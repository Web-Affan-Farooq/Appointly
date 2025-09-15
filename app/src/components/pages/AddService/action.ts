"use server";
import db from "@/db";
import { service, user } from "@/db/schemas";
import {
  AddServiceAPIRequest,
  AddServiceAPIResponse,
} from "@/validations/AddServiceAPISchema";
import { z } from "zod";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

const addServiceAction = async (
  formData: z.infer<typeof AddServiceAPIRequest>
): Promise<z.infer<typeof AddServiceAPIResponse>> => {
  console.log(
    "--------------------- Running addServiceAction () ... -------------------------"
  );
  try {
    const [newService] = await db
      .insert(service)
      .values({
        ...formData,
        user_id: formData.user_id,
      })
      .returning();

    console.log("Inserted a new service  : ", newService);
    console.log(
      "----------------------------Operation completed successfully-----------------------------"
    );
    return {
      success: true,
      message: "Added a new service",
      service: newService,
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

const getCountry = async (userId:string): Promise<{
  success: boolean;
  message: string;
  country?: string;
}>  => {
  try {
    const [requiredUser] = await db.select().from(user).where(eq(user.id, userId));

    if (!requiredUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    if(!requiredUser.stripe_account_id) {
        return {
            success:false,
            message:"Please complete stripe onboarding before creating any service"
        }
    }
    const {country} = await stripe.accounts.retrieve(requiredUser.stripe_account_id);

    return {
      success: true,
      message: "Got info successfully",
      country: country,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occured",
    };
  }
};
export { addServiceAction ,getCountry};
