"use client";

import { useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useDashboard } from "../../_hooks/use-dashboard";
import axios from "axios";
// import { useCredentials } from "@/shared/hooks/use-creds";

export const FetchDashboardData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setServices, selectService, setUser, setLoading } = useDashboard();

  // useCredentials();

  const getData = useCallback(async () => {
    try {
      setLoading(true);

      const session = await authClient.getSession();

      if (session.error) {
        toast.error(session.error.message);
        return;
      }

      if (!session.data) return;

      const user = session.data.user;

      setUser({
        name: user.name,
        email: user.email,
        id: user.id,
        image: user.image,
      });

      const response = await axios.post("/api/dashboard/data", {
        userId: user.id,
      });

      const services = response.data?.services ?? [];

      setServices(services);

      if (services.length > 0) {
        selectService(services[0]);
      }
    } catch (error: any) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser, setServices, selectService]);

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, [getData]);

  return <>{children}</>;
};
