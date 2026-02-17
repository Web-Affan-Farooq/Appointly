"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import type { AppointmentClient, ClientService } from "@shared/types";

import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { BookingConfirmation } from "./BookingConfirmation";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

/* Local date store (kept as in original design) */
const useCalenderDate = create<{
  date: Date;
  setDate: (date: Date) => void;
}>()((set) => ({
  date: dayjs().toDate(),
  setDate: (date) => set({ date }),
}));

export const BookingCalender = ({ service }: { service: ClientService }) => {
  const { date, setDate } = useCalenderDate();

  const [slots, setSlots] = useState<AppointmentClient[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AppointmentClient | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  /* Fetch slots */
  useEffect(() => {
    const getSlots = async () => {
      try {
        setLoading(true);
        const payload = {
          id: service.id,
          duration: service.duration,
          working_days: service.working_days,
          start_time: service.start_time,
          end_time: service.end_time,

          columns: {
            transfer_group: false,
            updated_at: false,
            customer_name: false,
            customer_email: false,
            booked: false,
            status: false,
          },
        };
        console.log("Line : 52 :::: sending payload", payload);
        const { data } = await axios.post("/api/services/get-slots", payload);

        setSlots(data.slots ?? []);
      } catch (_error) {
        toast.error("Failed to fetch slots");
      } finally {
        setLoading(false);
      }
    };

    getSlots();
  }, [service]);

  /* Filter slots (pure memo) */
  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => dayjs(slot.slot_date).isSame(date, "day"));
  }, [slots, date]);

  /* Handle selection when date/slots change */
  useEffect(() => {
    if (filteredSlots.length > 0) {
      setSelectedSlot(filteredSlots[0]);
    } else {
      setSelectedSlot(null);
    }
  }, [filteredSlots]);

  return (
    <aside className="lg:col-span-1 lg:border-l lg:pl-10 border-gray-200 mt-8 lg:mt-0 sticky top-20 self-start">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🗓️ Choose an Available Slot
      </h2>

      <div className="flex flex-row justify-start items-center gap-[20px] flex-wrap max-sm:flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && setDate(d)}
          className="rounded-md border shadow-sm max-sm:w-full"
          captionLayout="dropdown"
          required
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {loading ? (
            <p>Loading slots...</p>
          ) : filteredSlots.length === 0 ? (
            <p>No slots available...</p>
          ) : (
            filteredSlots.map((slot) => {
              const start_time = dayjs(slot.start_time).format("HH:mm");
              const end_time = dayjs(slot.end_time).format("HH:mm");

              return (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-[10px] cursor-pointer rounded-lg flex gap-[5px] items-center border ${
                    selectedSlot?.id === slot.id
                      ? "border-2 border-gray-400"
                      : "border-gray-200"
                  }`}
                >
                  <div className="w-2 h-[40px] bg-yellow-400 rounded-2xl" />
                  <span className="font-bold">From</span>
                  {start_time}
                  <span className="font-bold">to</span>
                  {end_time}
                </button>
              );
            })
          )}
        </div>

        {selectedSlot && (
          <BookingConfirmation
            slot={selectedSlot}
            price={service.price}
            currency={service.currency}
            duration={service.duration}
          />
        )}
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
