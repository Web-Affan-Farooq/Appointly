"use client";
import { useMemo } from "react";
import type { AppointmentProfile } from "../_types";
import dayjs from "dayjs";
import { RescheduleButton } from "./RescheduleButton";
import { formatDate } from "@/shared/utils/format-date";

export function AppointmentCard({
  appointment,
}: {
  appointment: AppointmentProfile;
}) {
  //  ______ Replace formats of start time and end time ...
  const start_time = useMemo(() => {
    return formatDate(dayjs(appointment.start_time).toDate(), "hh:mm A");
  }, [appointment]);

  const end_time = useMemo(() => {
    return formatDate(dayjs(appointment.end_time).toDate(), "hh:mm A");
  }, [appointment]);
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
          <RescheduleButton appointment={appointment} />
        )}
      </div>
    </div>
  );
}
