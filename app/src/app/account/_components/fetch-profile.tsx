"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { GetAppointments } from "../_actions/get-appointments";
// import { toast } from "sonner";
import { useProfile } from "../_hooks/use-profile";

const FetchUserProfileData = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line    @typescript-eslint/no-unused-vars
  const {setAppointments} = useProfile()
  const router = useRouter();
  useEffect(() => {

  // eslint-disable-next-line    @typescript-eslint/no-unused-vars 
    const getData = async () => {
      const data = authClient.useSession().data;
      if (data) {
  // eslint-disable-next-line   @typescript-eslint/no-unused-vars
        const userEmail = data.user.email;
        // const {message , success ,appointments} =await  GetAppointments(userEmail);
        // if(!success) {
        //     toast.error(message)
        // }
        // else if (appointments) {
            
        // }
      } 
      else {
        router.push("/login-user");
      }
    };
  }, [router]);
  return <>{children}</>;
};

export default FetchUserProfileData