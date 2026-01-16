"use server"
import db from "@/db";
import { appointment } from "@/db/schemas";
import { and, eq, gt , not} from "drizzle-orm";
import dayjs from "dayjs";
import { AppointmentClient } from "@/@types/types";

const GetSlots = async (service_id: string):Promise<
AppointmentClient[]
> => {
  const today = dayjs().format("YYYY-MM-DD");

  const slots = await db.query.appointment.findMany({
    where: and(
        eq(appointment.service_id, service_id), // - Select all slots where service id matches 
        gt(appointment.slot_date, today),// - and date should be future 
        not(appointment.booked) //  - and not booked yet ..
      ),
      columns: {
        customer_name:false,
        customer_email:false,
        booked:false,
        transfer_group:false,
        updated_at:false,
        created_at:false,
      }
  })
  
  return slots as AppointmentClient[]; // ok because postgres is infering type of status as string while type should be mentioned "PENDING" | "COMPLETED" | "CANCELLED" | "REQUESTED-RESCHEDULE" (see @/db/schema/tables/appointment.ts)
};

export default GetSlots