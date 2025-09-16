"use server";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import { eq, sql } from "drizzle-orm";
import {z} from "zod";
import { ServicesAPISchema } from "@/validations/ServicesAPISchema";

type Data = z.infer<typeof ServicesAPISchema>[];

const getServices = async () :Promise<Data>=> {
    const servicesData = await db.select({
            id:service.id,
            created_at:service.created_at,
            user_id:service.user_id,
            name:service.name,
            provider_name:service.provider_name,
            category:service.category,
            description:service.description,
            price:service.price,
            currency:service.currency,
            working_days:service.working_days,
            start_time:service.start_time,
            end_time:service.end_time,
            duration:service.duration,
            max_appointments_per_day:service.max_appointments_per_day,
            ratings:service.ratings,
            appointmentsCount: sql<number>`count(${appointment.id})`.as("appointments_count"),  // ---- this field must be converted to number , it's returning string of number
    }).from(service)
      .leftJoin(appointment, eq(appointment.service_id, service.id))
    .where(eq(service.is_active, true))
  .groupBy(service.id);

  const services = servicesData.map((serviceData) => (
    {
        ...serviceData,
        remainingAppointments:serviceData.max_appointments_per_day - Number(serviceData.appointmentsCount)  // ------ converted to number
    }
  ))
    return services
}
export default getServices;