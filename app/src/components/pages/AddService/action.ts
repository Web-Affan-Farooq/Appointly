"use server";
import db from "@/db";
import { Appointment,Service, service,appointment, user } from "@/db/schemas";
import { AddServiceAPIRequest } from "@/validations/AddServiceAPISchema";
import { z } from "zod";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { ServiceData } from "@/@types/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const createSlots = async (service: Service, daysForward = 30) => {
  const slots: Appointment[] = [];

  for (let day = 0; day < daysForward; day++) {
    const slotDate = dayjs().add(day, "day").startOf("day");
    let currentStart = slotDate
      .hour(dayjs(service.start_time).hour())
      .minute(dayjs(service.start_time).minute());

    const endOfDay = slotDate
      .hour(dayjs(service.end_time).hour())
      .minute(dayjs(service.end_time).minute());

    let token = 1;

    while (currentStart.isBefore(endOfDay)) {
      const currentEnd = currentStart.add(service.duration, "minute");

      // stop if next slot exceeds end_time
      if (currentEnd.isAfter(endOfDay)) break;

      slots.push({
        service_id: service.id,
        customer_name: null,
        customer_email: null,
        status: "PENDING",
        transfer_group: null,
        token: token++,
        slot_date: slotDate.format('YYYY-MM-DD'),
        start_time: currentStart.toDate(),
        end_time: currentEnd.toDate(),
      });

      currentStart = currentEnd;
    }
  }

  await db.insert(appointment).values(slots);
};


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
    console.log(
      "----------------------------Operation completed successfully-----------------------------"
    );
    return {
      success: true,
      message: "Added a new service",
      service: {
        ...newService,
        appointments:[]
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
