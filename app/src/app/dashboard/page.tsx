"use client";

import {
  AppSidebar,
  SiteHeader,
  ChartAreaInteractive,
  DashboardCard,
} from "@/components/pages/Dashboard";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ServiceDetails from "@/components/pages/Dashboard/ServiceDetails/ServiceDetails";
import { useDashboard } from "@/stores/dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NoServiceFallback = () => {
  return (
    <div className="flex flex-col gap-[10px] justify-center items-center w-full h-full">
      <h1 className="text-3xl font-bold">No services found</h1>
      <Link href="/add-service">
        <Button>Create Your first service</Button>
      </Link>
    </div>
  );
};
const Page = () => {
  const { services } = useDashboard();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {services.length <= 0 ? (
          <NoServiceFallback />
        ) : (
          <div className="flex flex-1 flex-col selection:text-black selection:bg-pink">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <DashboardCard />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <ServiceDetails />
                {/** data table */}
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};
export default Page;
