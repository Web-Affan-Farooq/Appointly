"use server"
import db from "@/db";
import {z} from "zod";
import {BookingFormAPIRequest, BookingFormAPIResponse} from "@/validations/BookAppointmentSchema";

const bookAppointmentAction = async (body:z.infer<typeof BookingFormAPIRequest>):Promise<z.infer<typeof BookingFormAPIResponse>> => {
    console.log(body);
    
    return {
        success:true,
        message:"Appointment booked successfully"
    }
}
export default bookAppointmentAction