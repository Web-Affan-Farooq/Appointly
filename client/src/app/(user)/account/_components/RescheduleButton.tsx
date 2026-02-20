"use client";
// ____ Components ...
import { Button } from "@/components/common";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BookingCalender } from "./BookingCalender";

// ____ Libraries...
import axios from "axios";
import { toast } from "sonner";

// ____ Types ...
import type { AppointmentProfile } from "../_types";
import { useSlotReschedule } from "../_hooks/use-reschedule-slot";
import { useEffect } from "react";
import { useProfile } from "../_hooks/use-profile";

export const RescheduleButton = ({
  appointment,
}: {
  appointment: AppointmentProfile;
}) => {
  const { reqSlotId, setPrev } = useSlotReschedule();
  const { setAppointments, appointments } = useProfile();

  const rescheduleAppointment = async () => {
    const { data, status } = await axios.post(
      "/api/user/account/reschedule-request",
      {
        prevSlotId: appointment.id,
        reqSlotId: reqSlotId,
      },
    );
    const { message } = data;

    if (status !== 201) {
      toast.error(message);
    }
    toast.success(message);
    setAppointments(
      appointments.map((app) => {
        return app.id === appointment.id
          ? { ...app, status: "REQUESTED-RESCHEDULE" }
          : app;
      }),
    );
  };

  useEffect(() => {
    setPrev(appointment.id);
  }, [appointment.id, setPrev]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-3 py-1 bg-pink text-black rounded-md text-sm">
          Reschedule
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New slot</AlertDialogTitle>
          <AlertDialogDescription>
            Select a slot to send reschedule request to service provider
          </AlertDialogDescription>
        </AlertDialogHeader>
        <BookingCalender appointment={appointment} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={rescheduleAppointment}>
            Request reschedule
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
