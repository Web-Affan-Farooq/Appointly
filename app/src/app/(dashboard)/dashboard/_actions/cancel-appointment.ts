"use server";

import db from "@/db";
import { appointment } from "@/db/schemas";
import { inArray } from "drizzle-orm";

const CancelAppointmentAction = async (
	appointments: string[],
): Promise<{
	message: string;
	success: boolean;
}> => {
	try {
		await db
			.update(appointment)
			.set({
				status: "CANCELLED",
			})
			.where(inArray(appointment.id, appointments));
		return {
			message: "Appointments cancelled successfully",
			success: true,
		};
	} catch (err) {
		console.log(err);
		return {
			message: "An error occured",
			success: false,
		};
	}
};

export default CancelAppointmentAction;
