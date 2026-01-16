"use server";
// ____ Utils ...
import GenerateSlots from "@/utils/generate-slots";

type Payload = {
    service_id: string;
    durationMinutes: number;
    workingDays: string[];
    startTime: string;
    endTime: string;
    daysAhead?: number;
};
export const RegenerateSlots = async (payload: Payload) => {
    const slots = await GenerateSlots(payload);
    const filteredFields = slots.filter((slot) => ({
        id: slot.id,
        service_id: slot.service_id,
        // scheduling
        start_time: slot.start_time,
        end_time: slot.end_time,
        token: slot.token,
        slot_date: slot.slot_date,
        booked: slot.booked,
    }))
    return filteredFields;
};
