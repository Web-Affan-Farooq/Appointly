"use client";

import { useService } from "../_hooks/use-service";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export const FetchServices = ({ children }: { children: React.ReactNode }) => {
  const { setService, setLoading } = useService();

  /* _____ Short polling implementation ... */
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      console.log("______ Running data fetches ...");
      const { data, status } = await axios.get("/api/services");
      const response = data;
      if (status !== 200) {
        toast.error(response);
      }
      setService(response);
      setLoading(false);
      console.log("______ Fetch Completed ...");
    };

    getData();
    setInterval(() => {
      getData();
    }, 180000);
  }, [setLoading, setService]);
  return <>{children}</>;
};
