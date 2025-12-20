"use client";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppointments } from "../_hooks/use-appointments";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const { appointments } = useAppointments();
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={appointments.map((app) => ({
          ...app,
          start_time: new Date(app.start_time),
          end_time: new Date(app.end_time),
        }))}
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
