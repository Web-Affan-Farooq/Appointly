"use client"
import { useMemo } from "react";
import { AppointmentProfile } from "../_types";
import dayjs from "dayjs";

export function AppointmentCard({
  appointment,
}: {
  appointment: AppointmentProfile;
}) {

  //  ______ Replace formats of start time and end time ...
  const start_time = useMemo(() => {
    return dayjs(appointment.start_time).format("HH:mm:ss");
  }, [appointment]);

  const end_time = useMemo(() => {
   return dayjs(appointment.end_time).format("HH:mm:ss");  }, [appointment]);
   
  return (
    <div className="p-4 shadow-sm shadow-gray-500 rounded-xl flex justify-between items-center">
      <div>
        <h3 className="font-medium text-lg">{appointment.service.name}</h3>
        <p className="text-gray-400 text-sm mt-1">
          {start_time} — {end_time}
        </p>
        <p className="text-xs mt-2 text-blue-400 capitalize">
          {appointment.status}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {appointment.status === "PENDING" && (
          <button className="px-3 py-1 bg-pink text-black rounded-md text-sm">
            Reschedule
          </button>
        )}

        <button className="px-3 py-1 bg-pink text-red-600 rounded-md text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
