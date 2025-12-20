"use client";
// _____ Hooks ....

import React, { useEffect, useMemo, useState } from "react";
import { useSlot } from "../_hooks/use-slots";

// _____ Slots ....
import GetSlots  from "../_actions/get-slots";

// _____ Libraries ....
import dayjs from "dayjs";
import z from "zod";

// _____ Types and schemas ....
import { AppointmentObjectSecured } from "@/@types/types";
import { ServicesAPISchema } from "../../_validations/services-api-schema";
import { Appointment } from "@/db/schemas";

// _____ Components ....
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import BookingForm from "./booking-form";

const ChoosedSlot = ({
  appointment,
}: {
  appointment?: AppointmentObjectSecured;
}) => {
  const start_time = useMemo(() => {
    return appointment && dayjs(appointment.start_time).format("HH:mm:ss");
  }, [appointment]);

  const end_time = useMemo(() => {
    return appointment && dayjs(appointment.end_time).format("HH:mm:ss");
  }, [appointment]);

  if (!appointment) return <></>;

  return (
    <div>
      <h1 className="font-bold">
        From {start_time} to {end_time}
      </h1>
      <p className="text-sm">Date : {appointment.slot_date}</p>
    </div>
  );
};

const BookingCalender = ({
  service,
}: {
  service: z.infer<typeof ServicesAPISchema>;
}) => {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState<Appointment[]>([]);
  const { selectedSlot, setSelectedSlot } = useSlot();

  useEffect(() => {
    const getSlots = async () => {
      const data = await GetSlots(service.id);
      setSlots(data);
    };
    getSlots();
  }, [service.id]);

  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => dayjs(slot.slot_date).isSame(date, "day"));
  }, [date, slots]);

  return (
    <aside className="lg:col-span-1 lg:border-l lg:pl-10 border-gray-200 mt-8 lg:mt-0 sticky top-20 self-start">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🗓️ Choose an Available Slot
      </h2>

      <div className="flex flex-row justify-start items-center gap-[20px] flex-wrap max-sm:flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm max-sm:w-full"
          captionLayout="dropdown"
          required
        />
        <div className="w-full flex flex-col gap-[10px]">
          {filteredSlots.length <= 0 ? (
            <p className="p-2">No slots available ...</p>
          ) : (
            <select
              name="slots"
              id="slots"
              className="w-[200px] px-4 py-2 my-2 rounded-lg border border-black"
              value={selectedSlot?.id ?? ""}
              onChange={(e) => {
                const found = filteredSlots.find(
                  (slot) => slot.id === e.target.value
                );
                if (found) {
                  setSelectedSlot(found);
                }
              }}
            >
              <option value="" disabled>
                Select a slot
              </option>
              {filteredSlots.map((slot: AppointmentObjectSecured) => {
                const start_time = dayjs(slot.start_time).format("HH:mm");
                const end_time = dayjs(slot.end_time).format("HH:mm");
                return (
                  <option value={slot.id} key={slot.id}>
                    {start_time} - {end_time}
                  </option>
                );
              })}
            </select>
          )}
          <ChoosedSlot appointment={selectedSlot} />
          <BookingForm service={service} />
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/contact"
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Have questions? Contact the Provider
        </Link>
      </div>
    </aside>
  );
};

export default BookingCalender;
