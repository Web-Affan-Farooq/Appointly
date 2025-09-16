import {z} from  "zod";
import type { Service } from "@/db/schemas";

const ServicesAPISchema = z.object(
    {
      id: z.uuid(),
      created_at: z.date(),
      user_id: z.string(),
      name: z.string(),
      provider_name: z.string(),
      category: z.string(),
      description: z.string(),
      price: z.int(),
      currency:z.string(),
      working_days: z.string().array(),
      start_time: z.string(),
      end_time: z.string(),
      duration: z.int(),
      max_appointments_per_day: z.int(),
      ratings:z.int().array(),
      appointmentsCount: z.int(),
      remainingAppointments: z.int(),
    }
).strict();

export {
    ServicesAPISchema,
}