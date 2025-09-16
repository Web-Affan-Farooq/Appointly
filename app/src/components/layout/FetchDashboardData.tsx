"use client";

import { useEffect } from "react";
import { FetchProviderDashboardDataAction } from "@/actions";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const FetchDashboardData = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const getData = async () => {
      const session = await authClient.getSession();
      if (session.error) {
        toast(session.error.message);
      } else if (session.data && !session.error) {
        const response = FetchProviderDashboardDataAction(session.data.user.id);
        console.log("Results : ", response);
      }
    };
    getData();
  }, []);
  return <>{children}</>;
};
export default FetchDashboardData;
