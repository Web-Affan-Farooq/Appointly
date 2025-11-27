"use client";
import { Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/stores/dashboard";
import Link from "next/link";

const NoServiceFallback = () => {
  const { loading } = useDashboard();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-[10px] justify-center items-center w-full h-full">
      <h1 className="text-3xl font-bold">No services found</h1>
      <Link href="/add-service">
        <Button>Create Your first service</Button>
      </Link>
    </div>
  );
};
export default NoServiceFallback;
