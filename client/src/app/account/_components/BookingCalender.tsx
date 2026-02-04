"use client";
// _____ Hooks and Actions ....
import { useEffect, useMemo, useState } from "react";
import { useSlotReschedule } from "../_hooks/use-reschedule-slot";

// _____ Libraries and utils  ....
import dayjs from "@/lib/dayjs";
import { formatDate } from "@/shared/utils/format-date";

// _____ Types and schemas ....
import type { AppointmentProfile } from "../_types";

// _____ Components ....
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { toast } from "sonner";

// _____ For representing slot in calender bottom ...
const AppointmentSlotRepr = ({ slot }: { slot: AppointmentProfile }) => {
  const timing = useMemo(() => {
    const start = slot.start_time;
    const end = slot.end_time;

    const time_1 = formatDate(start, "hh:mm A");
    const time_2 = formatDate(end, "hh:mm A");
    return `${dayjs(start).format("DD-MM-YYYY")} from ${time_1} to ${time_2}`;
  }, [slot]);

  return (
    <div>
      <p className="text-sm text-gray-600">{timing}</p>
      <p className="text-sm text-gray-600">
        Appointment number{" "}
        <span className="font-bold text-black">{slot.token}</span>
      </p>
    </div>
  );
};

export const BookingCalender = ({
  appointment,
}: {
  appointment: AppointmentProfile;
}) => {
  const service = appointment.service;

  const [date, setDate] = useState(dayjs().toDate());
  const [slots, setSlots] = useState<AppointmentProfile[]>([]);

  // _____ get global state to set required appointment ...
  const { setReq } = useSlotReschedule();

  /* ___ Fetch slots for selection ... */
  useEffect(() => {
    const getSlots = async () => {
      const { data, status } = await axios.post("/api/services/get-slots", {
        serviceId: service.id,
        columns: {
          transfer_group: false,
          updated_at: false,
          customer_name: false,
          customer_email: false,
          booked: false,
        },
      });
      if (status !== 200) {
        toast.error("An error occured");
      }
      const { slots }: { slots: AppointmentProfile[] } = data;
      setSlots(slots);
    };
    getSlots();
  }, [service.id]);

  /* ___ Stores selected slot ... */
  const [selectedSlot, setSelectedSlot] = useState<AppointmentProfile | null>(
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
    <aside>
      <div className="flex flex-row justify-start items-start gap-[20px] flex-nowrap max-sm:flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm max-sm:w-full"
          captionLayout="dropdown"
          required
        />
        <div className="w-full bg-gray-200 h-[300px] overflow-y-scroll overflow-x-hidden flex justify-center items-center flex-col">
          {filteredSlots.length === 0 ? (
            <p>No slots available</p>
          ) : (
            filteredSlots.map((slot: AppointmentProfile) => {
              const start_time = formatDate(
                dayjs(appointment.start_time).toDate(),
                "hh:mm A",
              );
              const end_time = formatDate(
                dayjs(appointment.end_time).toDate(),
                "hh:mm A",
              );
              return (
                <button
                  type="button"
                  role="button"
                  onClick={() => {
                    setSelectedSlot(slot);
                    setReq(slot.id);
                  }}
                  key={slot.id}
                  className={`w-full group transition-all duration-[0.3s] ease-in-out px-0 hover:scale-[1.01] py-[5px] cursor-pointer flex flex-row gap-[5px] flex-nowrap justify-start items-center ${selectedSlot && slot.id === selectedSlot.id ? "border-1 border-gray-300 font-bold" : ""}`}
                >
                  <div className="group-hover:opacity-100 opacity-0 w-1 h-[40px] bg-yellow rounded-2xl"></div>
                  {start_time} - {end_time}
                </button>
              );
            })
          )}
        </div>
      </div>

      {selectedSlot && <AppointmentSlotRepr slot={selectedSlot} />}
    </aside>
  );
};
