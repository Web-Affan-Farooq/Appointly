"use server";
import db from "@/db";
import { appointment, service } from "@/db/schemas";
import { eq } from "drizzle-orm";
import {ClientService} from "@/@types/types"

export const getServices = async (): Promise<ClientService[]> => {
	const services = await db
		.select({
			id: service.id,
			created_at: service.created_at,
			user_id: service.user_id,
			name: service.name,
			provider_name: service.provider_name,
			category: service.category,
			description: service.description,
			price: service.price,
			currency: service.currency,
			working_days: service.working_days,
			start_time: service.start_time,
			end_time: service.end_time,
			duration: service.duration,
			max_appointments_per_day: service.max_appointments_per_day,
			ratings: service.ratings,
			details: service.details,
			maxCapacity:service.maxCapacity,
			last_generated:service.last_generated,
		})
		.from(service)
		.leftJoin(appointment, eq(appointment.service_id, service.id))
		.where(eq(service.is_active, true))
		.groupBy(service.id);

	return services
};