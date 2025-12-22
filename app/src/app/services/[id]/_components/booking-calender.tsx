"use client";
// _____ Hooks ....
import React, { useEffect, useMemo, useState } from "react";

// _____ Slots ....
import GetSlots  from "../_actions/get-slots";

// _____ Libraries ....
import dayjs from "dayjs";
import z from "zod";

// _____ Types and schemas ....
import { AppointmentClient,  } from "@/@types/types";
import { ServicesAPISchema } from "../../_validations/services-api-schema";

// _____ Components ....
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import BookingConfirmation from "./booking-confirmation";

const BookingCalender = ({
  service,
}: {
  service: z.infer<typeof ServicesAPISchema>;
}) => {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState<AppointmentClient[]>([]);

  useEffect(() => {
    const getSlots = async () => {
      const data = await GetSlots(service.id);
      setSlots(data);
    };
    getSlots();
  }, [service.id]);

  const [selectedSlot , setSelectedSlot] = useState<AppointmentClient | null>(null);
  const filteredSlots = useMemo(() => {
        const newList =  slots.filter((slot) => dayjs(slot.slot_date).isSame(date, "day"));
        setSelectedSlot(newList[0])
        return newList
      }, [date, slots]);

  const updateSelectedSlotWithKeyboard = (e:React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.target)
  }

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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start items-center" onKeyDown={updateSelectedSlotWithKeyboard}>
                      {filteredSlots.map((slot: AppointmentClient) => {
                const start_time = dayjs(slot.start_time).format("HH:mm");
                const end_time = dayjs(slot.end_time).format("HH:mm");
                return (
                  <div onClick={() => setSelectedSlot(slot)} key={slot.id} className={`p-[10px] cursor-pointer rounded-lg flex flex-row gap-[5px] flex-nowrap justify-start items-center ${selectedSlot && slot.id === selectedSlot.id ? "border-3 border-gray-300" : ""}`}>
                    <div className="w-2 h-[40px] bg-yellow rounded-2xl"></div>
                    <span className="font-bold"> From </span> {start_time} <span className="font-bold"> to</span>{end_time}
                  </div>
                );
              })}
        </div>
        
         {selectedSlot ?  <BookingConfirmation slot={selectedSlot} price={service.price} currency={service.currency} duration={service.duration} /> : <></>}
       
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
