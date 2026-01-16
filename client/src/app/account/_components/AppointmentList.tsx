"use client"
import {useMemo} from "react";
import { useProfile } from "../_hooks/use-profile";
import { AppointmentCard } from "./Card";
import { useTab } from "../_hooks/use-tab";

export function AppointmentsList() {
  // ____ Apointments fetched ...
  const {appointments} = useProfile();

  // ____ Tab controller state ...
  const {tab} = useTab()

  // ____ Filters appointments on the basis of tabs ...
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => (
      app.status === tab
    ))
  },[tab , appointments])

  return (
    <div className="space-y-4 mt-4">
      {filteredAppointments.map((item) => (
        <AppointmentCard
          key={item.id}
          appointment={item}
        />
      ))}
    </div>
  );
}
