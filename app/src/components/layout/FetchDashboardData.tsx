"use client";

import { useEffect } from "react";
import { FetchProviderDashboardDataAction } from "@/actions";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useDashboard } from "@/stores/dashboard";

const FetchDashboardData = ({ children }: { children: React.ReactNode }) => {
  const { setServices, selectService } = useDashboard();
  useEffect(() => {
    console.log("Running fetches ....");
    const getData = async () => {
      const session = await authClient.getSession();
      if (session.error) {
        toast(session.error.message);
      } else if (session.data && !session.error) {
        const response = await FetchProviderDashboardDataAction(
          session.data.user.id
        );
        console.log(response.services);
        setServices(response.services);
        selectService(response.services[0]);
      }
    };
    getData();
    console.log("Fetch completed ....");
    setInterval(() => {
      console.log("Running fetches ....");
      getData();
      console.log("Fetch complete ....");
    }, 180000);
  }, [selectService, setServices]);

  return <>{children}</>;
};
export default FetchDashboardData;
