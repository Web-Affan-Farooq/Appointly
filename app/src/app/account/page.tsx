"use client";

import { useState } from "react";
import AppointmentsList from "./_components/appointments-list";


export default function AccountPage() {
  const [tabs] = useState(["Booked", "Cancelled", "Rescheduled"]);
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <main className="flex gap-[20px]">
      <div>
        <h1 className="font-bold text-2xl mt-10 mb-5">Account</h1>
        <div className="flex justify-start items-center gap-[30px]">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`rounded-xl cursor-pointer ${currentTab === tab ? "bg-pink" : ""} px-[15px] py-[1px]`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* <div className="flex"></div> */}
        <AppointmentsList/>
      </div>
    </main>
  );
}
