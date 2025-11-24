"use client";

import { useService } from "@/stores/service";
import { useEffect } from "react";
import { FetchServicesAction } from "@/actions";
import { toast } from "sonner";

const FetchServices = ({ children }: { children: React.ReactNode }) => {
  const { setService, setLoading } = useService();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      console.log("______ Running data fetches ...");
      try {
        const servicesData = await FetchServicesAction();
        setService(servicesData);
      } catch (err) {
        console.log(err);
        toast.error("An error occured");
      }

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
export default FetchServices;
