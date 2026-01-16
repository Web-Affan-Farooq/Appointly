"use client";
// ____ Hooks and utils   ...
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

// ____ Components ...
import { Button, Loader } from "@/components/common";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconArrowNarrowRight , IconCircleCheck } from "@tabler/icons-react";

// ____ Libraries ...
import { toast } from "sonner";

// ____ Schema and types  ...
import { AppointmentClient } from "@/@types/types";

// ____ Actions ...
import BookAppointmentAction from "../_actions/book-appointment";

type Props = { slot: AppointmentClient  , price :number , duration : number , currency : string}

export const BookingConfirmation = ({ slot , price , duration , currency }:Props ) => {
  const [loading , setLoading] = useState(false);
  const router = useRouter();
  const { data } = authClient.useSession();

  // _____ function for getting user session  , if not redirects user to login page ...
  const getUserDetails = useCallback(() => {
    if (data) {
      return {
        customer_name: data.user.name,
        customer_email: data.user.email,
      };
    }
    return null;
  },[data])


  const BookAppointment = async () => {
    const session = getUserDetails();
    if(session) {
         const { message, success, url } = await BookAppointmentAction({...slot , ...session});
    if (!success) {
      toast.error(message);
      return;
    }

    toast.success(message);
    if (url) window.location.href = url;
    }
    router.push("/login-user")
  };

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="w-full py-3 text-lg font-semibold flex flex-row justify-center items-center">
          <p>Slot confirmation</p>
          <IconArrowNarrowRight className="w-5 h-5 ml-2" />
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="my-4">
          <DialogTitle>Confirm slot ?</DialogTitle>
          <DialogDescription hidden>
            Please confirm the appointment booking
          </DialogDescription>
        </DialogHeader>
                    <div className="flex flex-row justify-start items-center gap-[10px]">
                       <span className="font-bold">Price : </span> <div className="bg-indigo-100  text-sm font-medium px-3 py-1 rounded-full">
                  <span className="text-green-500">
                    {currency} &nbsp;
                  </span>
                  <span className="text-indigo-800">
                    {price}
                  </span>
                </div>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-[10px]">
                       <span className="font-bold">Duration : </span> <div className="bg-indigo-100  text-sm font-medium px-3 py-1 rounded-full">
                
                  <span className="text-indigo-800">
                    {duration}
                  </span>
                    <span className="text-green-500">
                    &nbsp; Min
                  </span>
                </div>
                    </div>
        {/* Submit Button */}
        <Button
          onClick={
            () => {
              setLoading(true)
              BookAppointment()
              setLoading(false)
            }
          }
          disabled={loading}
          className={`w-full flex justify-center items-center text-white gap-[5px] ${
            loading ? "bg-pink/70 cursor-not-allowed" : "bg-pink"
          }`}
        >
          <IconCircleCheck className="w-6 h-6 text-green-500" /> {loading ? <Loader /> : "Confirm"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};