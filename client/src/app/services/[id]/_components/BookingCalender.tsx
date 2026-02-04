"use client";
// _____ Hooks and Actions ....
import { useEffect, useMemo, useState } from "react";

// _____ Libraries ....
import dayjs from "dayjs";

// _____ Types and schemas ....
import type { AppointmentClient, ClientService } from "@shared/types";

// _____ Components ....
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { BookingConfirmation } from "./BookingConfirmation";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

// state for manipulating date without any lag ...
const useCalenderDate = create<{
  date: Date;
  setDate: (date: Date) => void;
}>()((set) => ({
  date: dayjs().toDate(),
  setDate: (date) => set({ date: date }),
}));

export const BookingCalender = ({ service }: { service: ClientService }) => {
  const { date, setDate } = useCalenderDate();

  const [slots, setSlots] = useState<AppointmentClient[]>([]);

  /* ___ Fetch slots for selection ... */
  useEffect(() => {
    const getSlots = async () => {
      console.log("___Fetching slots ...");
      const { data, status } = await axios.post("/api/services/get-slots", {
        serviceId: service.id,
        columns: {
          transfer_group: false,
          updated_at: false,
          customer_name: false,
          customer_email: false,
          booked: false,
          status: false,
        },
      });
      if (status !== 200) {
        toast.error("An error occured");
      }
      const { slots }: { slots: AppointmentClient[] } = data;
      setSlots(slots);
      console.log("___Fetched slots ...");
    };
    getSlots();
  }, [service.id]);

  /* ___ Stores selected slot ... */
  const [selectedSlot, setSelectedSlot] = useState<AppointmentClient | null>(
    null,
  );

  /* ___ filter slots for today ... */
  const filteredSlots = useMemo(() => {
    const newList = slots.filter((slot) =>
      dayjs(slot.slot_date).isSame(date, "day"),
    );
    setSelectedSlot(newList[0]);
    return newList;
  }, [date, slots]);

  /* _____ For handling slot regeneration logic ... */
  useEffect(() => {
    /* _____ Function for getting new slots and updating state ... */
    const regenerate = async () => {
      const { data, status } = await axios.post(
        "/api/services/regenerate-slots",
        {
          id: service.id,
        },
      );
      if (status !== 200) {
        toast.error("An error occured");
      }
      const { slots } = data;
      setSlots(slots);
    };

    const curr = dayjs(); // __today
    const last = dayjs(service.last_generated); // _date when previous slots generated
    /* ____if 
  - no of days in the month of previous date === no of days in current month -> no of days same ... 
  - If not , then generate slots according to number of days in previous months ...

  **Note : Prevents slot generation with irregular date sequences**
  */
    const days =
      curr.daysInMonth() === last.daysInMonth()
        ? curr.daysInMonth()
        : last.daysInMonth();

    if (curr.diff(last, "days") > days) {
      regenerate();
    }
  }, [service]);

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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start items-center">
          {filteredSlots.length === 0 ? (
            <p>No slots available ...</p>
          ) : (
            filteredSlots.map((slot: AppointmentClient) => {
              const start_time = dayjs(slot.start_time).format("HH:mm");
              const end_time = dayjs(slot.end_time).format("HH:mm");
              return (
                <div
                  role="button"
                  onClick={() => setSelectedSlot(slot)}
                  key={slot.id}
                  className={`p-[10px] cursor-pointer rounded-lg flex flex-row gap-[5px] flex-nowrap justify-start items-center ${selectedSlot && slot.id === selectedSlot.id ? "border-3 border-gray-300" : ""}`}
                >
                  <div className="w-2 h-[40px] bg-yellow rounded-2xl"></div>
                  <span className="font-bold"> From </span> {start_time}{" "}
                  <span className="font-bold"> to</span>
                  {end_time}
                </div>
              );
            })
          )}
        </div>

        {selectedSlot ? (
          <BookingConfirmation
            slot={selectedSlot}
            price={service.price}
            currency={service.currency}
            duration={service.duration}
          />
        ) : null}
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
