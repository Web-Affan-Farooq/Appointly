import { z} from "zod";

const BookingFormAPIRequest  = z
  .object({
    customer_name: z.string().min(1, { message: "Customer name is required." }),
    customer_email: z.email({ message: "Invalid email address." }),
    service_id: z.string(),
    price:z.int(),
    currency:z.string(),
//     started_on: z
//       .string()
//       .datetime({ message: "Start date and time is required." }),
//     ended_on: z
//       .string()
//       .datetime({ message: "End date and time is required." }),
  })

//   .superRefine((data, ctx) => {
//     if (
//       data.started_on &&
//       data.ended_on &&
//       new Date(data.ended_on) <= new Date(data.started_on)
//     ) {
//       ctx.addIssue({
//         path: ["ended_on"],
//         message: "End time must be after start time.",
//         code: z.ZodIssueCode.custom,
//       });
//     }
//   });

  const BookingFormAPIResponse = z.object({
    success:z.boolean(),
    message:z.string(),
  }).strict();

export {
    BookingFormAPIRequest,
    BookingFormAPIResponse  
}