"use client";
// ____ Hooks ...
import { useEffect } from "react";
import { useProfile } from "../_hooks/use-profile";

// ____ Libraries...
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import axios from "axios";

export const FetchUserProfileData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setAppointments } = useProfile();
  const { data } = authClient.useSession();

  useEffect(() => {
    if (data) {
      const getData = async (email: string) => {
        const { data, status } = await axios.post(
          "/api/user/account/get-appointments",
          {
            email,
          },
        );
        if (status === 500) {
          return toast.error(data);
        }
        const { appointments } = data;
        setAppointments(appointments);
      };
      getData(data.user.email);
    }
  }, [data, setAppointments]);
  return <>{children}</>;
};
