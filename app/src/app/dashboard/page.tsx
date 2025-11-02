"use client";

import { AppSidebar } from "@/components/pages/Dashboard/app-sidebar";
import { ChartAreaInteractive } from "@/components/pages/Dashboard/chart-area-interactive";
import DashboardCard from "@/components/pages/Dashboard/DashboardCard";
import { SiteHeader } from "@/components/pages/Dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ServiceDetails from "@/components/pages/Dashboard/ServiceDetails/ServiceDetails";

export default function Page() {
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
      </SidebarInset>
    </SidebarProvider>
  );
}
