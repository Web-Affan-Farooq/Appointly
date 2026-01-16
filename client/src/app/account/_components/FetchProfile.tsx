"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAppointments } from "../_actions/get-appointments";
import { toast } from "sonner";
import { useProfile } from "../_hooks/use-profile";

export const FetchUserProfileData = ({ children }: { children: React.ReactNode }) => {
  const { setAppointments } = useProfile();
  const router = useRouter();
  const data = authClient.useSession();

  useEffect(() => {
    const getData = async () => {
      const userData = data.data
      if (userData) {
        const userEmail = userData.user.email;
        const { message, statusCode, appointments } =
          await getAppointments(userEmail);
        if (appointments) {
          setAppointments(appointments);
        } else if (statusCode === 500) {
          toast.error(message);
        }
      }
    };

    getData();
  }, [router,data, setAppointments]);
  return <>{children}</>;
};