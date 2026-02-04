"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useDashboard } from "../../_hooks/use-dashboard";
import axios from "axios";
import { useCredentials } from "@/shared/hooks/use-creds";

export const FetchDashboardData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setServices, selectService, setUser, setLoading } = useDashboard();

  useCredentials();

  useEffect(() => {
    console.log("Running fetches ....");
    const getData = async () => {
      setLoading(true);
      const session = await authClient.getSession();
      if (session.error) {
        toast.error(session.error.message);
      } else if (session.data && !session.error) {
        setUser({
          name: session.data.user.name,
          email: session.data.user.email,
          id: session.data.user.id,
          image: session.data.user.image,
        });
        const { data } = await axios.post("/api/dashboard/data", {
          userId: session.data.user.id,
        });
        const { services } = data;
        console.log(services);
        setServices(services);
        selectService(services[0]);
        setLoading(false);
      }
    };
    getData();
    console.log("Fetch completed ....");
    setInterval(() => {
      console.log("Running fetches ....");
      getData();
      console.log("Fetch complete ....");
    }, 180000);
  }, [selectService, setServices, setLoading, setUser]);

  return <>{children}</>;
};
