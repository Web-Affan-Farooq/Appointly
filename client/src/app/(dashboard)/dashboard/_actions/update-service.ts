"use server";
import db from "@/db";
import { InferSelectModel } from "drizzle-orm";
import { service } from "@/db/schemas";

type UpdateServiceResponse = {
	message: string;
	success: boolean;
};

export const updateServiceAction = async (
	values: Partial<InferSelectModel<typeof service>>,
): Promise<UpdateServiceResponse> => {
	console.log("Data recieved : ", values);
	try {
		await db.update(service).set(values);
		return {
			message: "Details updated successfully",
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
