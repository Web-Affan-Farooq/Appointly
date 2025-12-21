// "use server";

// import db from "@/db";
// import { Appointment, appointment, Service } from "@/db/schemas";
// import { eq, and } from "drizzle-orm";

// export const GetAppointments = async (
//   email: string
// ): Promise<{
//   message: string;
//   success: boolean;
//   appointments?: Omit<
//     Appointment,
//     | "transfer_group"
//     | "customer_name"
//     | "customer_email"
//     | "booked"
//     | "created_at"
//   >[];
// }> => {
//   try {
//     /*
//     and(eq(appointment.customer_email, email), eq(appointment.booked, true)
//     */
//     const appointments = await db.query.appointment.findMany({
//       where: and(
//         eq(appointment.customer_email, email),
//         eq(appointment.booked, true)
//       ),
//       columns:{
//         transfer_group:false,
//         created_at:false,
//         customer_name:false,
//         customer_email:false,
//         booked:false,
//       },
//       with: {
//         service:{
//           columns: {
//             is_active:false,
//             max_appointments_per_day:false,
//             lastCountReset:false,
//             maxCapacity:false
//           },
//           with: {
//             user:true
//           }
//         }
//       }
//     });

//     return {
//       message: "Success",
//       success: true,
//       appointments,
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       message: "An error occured",
//       success: false,
//     };
//   }
// };


export const GetAppointments = async () => {

}