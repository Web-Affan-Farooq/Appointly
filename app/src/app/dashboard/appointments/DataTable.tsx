"use client";

// import { useDashboard } from "@/stores/dashboard";
import { IconCalendarEvent } from "@tabler/icons-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Badge = ({
  status,
}: {
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}) => {
  if (status === "CANCELLED") {
    return (
      <div className="text-[10px] bg-red-500/30 text-red-400 rounded-full px-2 py-1 w-auto">
        Cancelled
      </div>
    );
  } else if (status === "PENDING") {
    return (
      <div className="text-[10px] bg-red-500/30 text-red-400 rounded-full px-2 py-1 w-auto">
        Pending
      </div>
    );
  }
};
const Table = () => {
  return (
    <div className="rounded-md">
      <div className="py-[9px] bg-pink/50 rounded-[20px,20px,0,0]">
        <h1>Appointments</h1>
      </div>
      <Sheet>
        <SheetTrigger>
          <div className="flex flex-col flex-nowrap gap-0">
            <div className="flex flex-row flex-nowrap justify-between items-center border border-gray-400 py-2">
              <div className="">
                <h2 className="text-sm font-bold">nejhjfh udfu dsyfuy</h2>
                <span className="text-sm text-gray-400">example@gmail.com</span>
              </div>

              <div className="">
                <Badge status={"PENDING"} />
                <div className="text-sm text-gray-400 flex flex-row flex-nowrap gap-[5px] justify-center items-center">
                  <IconCalendarEvent size={15} />
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Table;
