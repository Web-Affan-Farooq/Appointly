"use client";

import { useState } from "react";
import { useDashboard } from "@/stores/dashboard";
import { Sheet } from "@/components/ui/sheet";
import { useAppointments } from "./useAppointments";
import { TableRow } from "./TableRow";
import Loading from "@/components/common/Loader";

const Table = () => {
  const {
    selectedAppointments,
    setSelectedAppointments,
    loading,
    toogleLoading,
  } = useAppointments();

  const { selectedService, cancelAppointment } = useDashboard();

  const [open, setOpen] = useState(false);

  const cancel = async () => {
    toogleLoading();
    cancelAppointment(selectedAppointments);
    setSelectedAppointments([]);
    toogleLoading();
  };
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
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {loading ? (
        <div className="flex flex-row flex-nowrap justify-center items-center p-10 w-full">
          <Loading />
        </div>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          {selectedService?.appointments?.map((appointment, idx) => (
            <TableRow appointment={appointment} key={idx} />
          ))}
        </Sheet>
      )}
    </div>
  );
};

export default Table;
