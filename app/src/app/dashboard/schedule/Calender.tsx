"use client";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppointments } from "@/components/pages/Appointments/useAppointments";
import { useEffect } from "react";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const { appointments } = useAppointments();
  useEffect(() => {
    console.log(appointments);
  }, [appointments]);
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start_time"
        endAccessor="end_time"
        style={{ height: 600 }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: "var(--pink)",
            border: "none",
            borderRadius: "10px",
            color: "var(--black)",
            fontWeight: 600,
          },
        })}
      />
    </div>
  );
};

export default MyCalendar;
