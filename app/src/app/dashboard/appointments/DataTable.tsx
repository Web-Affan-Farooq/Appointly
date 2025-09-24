"use client";

import { IconCalendarEvent } from "@tabler/icons-react";
import { useState } from "react";
import { useDashboard } from "@/stores/dashboard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

const Badge = ({ status }: { status: AppointmentStatus }) => {
  const baseClasses =
    "text-[10px] rounded-full px-[9px] py-[2px] w-auto border";

  switch (status) {
    case "CANCELLED":
      return (
        <div
          className={`${baseClasses} border-red-500/30 bg-red-500/30 text-red-400`}
        >
          Cancelled
        </div>
      );
    case "PENDING":
      return (
        <div
          className={`${baseClasses} border-yellow-500/30 bg-yellow-500/30 text-yellow-700`}
        >
          Pending
        </div>
      );
    case "CONFIRMED":
      return (
        <div
          className={`${baseClasses} border-blue-500/30 bg-blue-500/30 text-blue-600`}
        >
          Confirmed
        </div>
      );
    case "COMPLETED":
      return (
        <div
          className={`${baseClasses} border-green-500/30 bg-green-500/30 text-green-600`}
        >
          Completed
        </div>
      );
    default:
      return null;
  }
};

const Table = () => {
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>(
    []
  );
  const { selectedService } = useDashboard();
  const [open, setOpen] = useState(false);
  const [selectedCheckboxesCount, setSelectedCheckboxesCount] = useState(0);

  return (
    <div className="rounded-md overflow-hidden">
      {/* Header */}
      <div className="py-[9px] px-[10px] bg-pink/50">
        <h1 className="font-bold">Appointments</h1>
      </div>

      <div className="text-sm py-[9px] px-[10px]">
        {selectedCheckboxesCount > 0 ? (
          <div className="flex flex-row flex-nowrap justify-between items-center gap-[20px]">
            <p>
              <span className="text-blue-400">
                {selectedAppointments.length}{" "}
              </span>
              selected
            </p>
            <div className="flex flex-row flex-nowrap gap-[10px]">
              <button
                type="button"
                className="bg-red-600 text-white px-[10px] py-[2px] rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        {selectedService?.appointments?.map((appointment, idx) => (
          <div key={idx} className="relative">
            <input
              type="checkbox"
              className="absolute top-7 left-[7px]"
              value={appointment.id}
              checked={selectedAppointments.includes(appointment.id)}
              onChange={(e) => {
                const { checked, value } = e.target;
                if (checked) {
                  setSelectedCheckboxesCount(selectedCheckboxesCount + 1);
                  setSelectedAppointments([...selectedAppointments, value]);
                } else if (!checked) {
                  setSelectedCheckboxesCount(selectedCheckboxesCount - 1);
                  const filtered = selectedAppointments.filter(
                    (id) => id !== value
                  );
                  setSelectedAppointments(filtered);
                }
              }}
            />

            {/* Row trigger */}
            <SheetTrigger className="w-full px-7 sm:px-9 py-4 flex flex-row flex-nowrap justify-between items-center ring ring-gray-400">
              <div>
                <h2 className="text-sm font-bold">
                  {appointment.customer_name}
                </h2>
                <span className="text-sm text-gray-400">
                  {appointment.customer_email}
                </span>
              </div>

              <div className="flex flex-col items-end gap-[4px]">
                <div className="w-[80px] text-center">
                  <Badge status={appointment.status} />
                </div>
                <div className="text-sm text-gray-400 flex flex-row gap-[5px] items-center">
                  <IconCalendarEvent size={15} />
                  <span>
                    {new Date(appointment.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </SheetTrigger>

            {/* Drawer content */}
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex flex-row gap-[20px] items-center">
                  <span>Appointment details</span>
                  <Badge status={appointment.status} />
                </SheetTitle>
                <SheetDescription className="hidden">
                  Appointment details
                </SheetDescription>

                <div className="my-[50px] flex flex-col gap-[40px]">
                  {/* Customer name */}
                  <div>
                    <p className="text-sm text-gray-500">Customer name</p>
                    <p className="ml-5 text-sm">{appointment.customer_name}</p>
                  </div>

                  {/* Customer email */}
                  <div>
                    <p className="text-sm text-gray-500">Customer email</p>
                    <p className="ml-5 text-sm">{appointment.customer_email}</p>
                  </div>

                  {/* Requested date */}
                  <div>
                    <p className="text-sm text-gray-500">Requested on</p>
                    <p className="ml-5 text-sm">
                      {new Date(appointment.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </div>
        ))}
      </Sheet>
    </div>
  );
};

export default Table;
