"use client";

import { useState } from "react";
import { useDashboard } from "../../_hooks/use-dashboard";
import { Sheet } from "@/components/ui/sheet";
import { useAppointments } from "../../_hooks/use-appointments";
import { TableRow } from "./TableRow";
import Loading from "@/components/common/Loader";

export const DataTable = () => {
  const {
    selectedAppointments,
    setSelectedAppointments,
    loading,
    toogleLoading,
    appointments,
  } = useAppointments();

  const { cancelAppointment } = useDashboard();

  const [open, setOpen] = useState(false);

  const cancel = async () => {
    toogleLoading();
    cancelAppointment(selectedAppointments);
    setSelectedAppointments([]);
    toogleLoading();
  };
  // const schedule = async () => {
  // 	toogleLoading();
  // 	scheduleAppointment(selectedAppointments);
  // 	setSelectedAppointments([]);
  // 	toogleLoading();
  // };
  return (
    <div className="rounded-md overflow-hidden h-screen">
      {/* Header */}
      <div className="py-[9px] px-[10px] bg-pink/50">
        <h1 className="font-bold">Appointments</h1>
      </div>

      <div className="text-sm py-[9px] px-[10px]">
        {selectedAppointments.length > 0 ? (
          <div className="flex flex-row flex-nowrap justify-between items-center gap-[20px]">
            <p>
              <span className="text-blue-400">
                {selectedAppointments.length}
              </span>
              selected
            </p>
            <div className="flex flex-row flex-nowrap gap-[10px]">
              <button
                type="button"
                className="cursor-pointer bg-red-600 text-white px-[10px] py-[2px] rounded-xl"
                onClick={cancel}
              >
                Cancel
              </button>
              {/* <button
								type="button"
								className="cursor-pointer bg-green-600 text-white px-[10px] py-[2px] rounded-xl"
								onClick={schedule}
							>
								Schedule
							</button> */}
            </div>
          </div>
        ) : null}
      </div>

      {loading ? (
        <div className="flex flex-row flex-nowrap justify-center items-center p-10 w-full">
          <Loading />
        </div>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          {appointments.length <= 0 ? (
            <p className="text-md p-3">No appointments found ...</p>
          ) : (
            appointments.map((appointment) => (
              <TableRow appointment={appointment} key={appointment.token} />
            ))
          )}
        </Sheet>
      )}
    </div>
  );
};
