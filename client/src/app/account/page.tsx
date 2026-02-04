"use client";

import { useState } from "react";
import { AppointmentsList } from "./_components/AppointmentList";
import { useTab } from "./_hooks/use-tab";

type Tab = {
  text: "Booked" | "Cancelled" | "Rescheduled";
  value: "PENDING" | "CANCELLED" | "REQUESTED-RESCHEDULE";
};

export default function AccountPage() {
  const [tabs] = useState<Tab[]>([
    {
      text: "Booked",
      value: "PENDING",
    },
    {
      text: "Cancelled",
      value: "CANCELLED",
    },
    {
      text: "Rescheduled",
      value: "REQUESTED-RESCHEDULE",
    },
  ]);

  const { tab, setTab } = useTab();

  return (
    <main className="flex gap-[20px]">
      <div>
        <h1 className="font-bold text-2xl mt-10 mb-5">Account</h1>
        <div className="flex justify-start items-center gap-[30px]">
          {tabs.map((t) => (
            <div
              key={t.value}
              role="button"
              className={`rounded-xl cursor-pointer ${tab === t.value ? "bg-pink" : ""} px-[15px] py-[1px]`}
              onClick={() => setTab(t.value)}
            >
              {t.text}
            </div>
          ))}
        </div>
        <AppointmentsList />
      </div>
    </main>
  );
}
