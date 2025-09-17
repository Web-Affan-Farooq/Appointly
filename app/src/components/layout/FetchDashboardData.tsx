"use client";

import { useEffect } from "react";
import { FetchProviderDashboardDataAction } from "@/actions";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useDashboard } from "@/stores/dashboard";

const FetchDashboardData = ({ children }: { children: React.ReactNode }) => {
  const { setServices, selectService, selectedService } = useDashboard();
  useEffect(() => {
    const getData = async () => {
      const session = await authClient.getSession();
      if (session.error) {
        toast(session.error.message);
      } else if (session.data && !session.error) {
        const response = await FetchProviderDashboardDataAction(
          session.data.user.id
        );
        setServices(response.services);
        selectService(response.services[0]);
      }
    };
    getData();
    setInterval(() => {
      getData();
    }, 180000);

    console.log(selectedService);
    console.log(selectService);
  }, []);
  return <>{children}</>;
};
export default FetchDashboardData;
