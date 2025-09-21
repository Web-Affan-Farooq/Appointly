import { AppSidebar } from "@/components/pages/Dashboard/app-sidebar";
// import { ChartAreaInteractive } from "@/components/pages/Dashboard/chart-area-interactive";
// import DashboardCard from "@/components/pages/Dashboard/DashboardCard";
// import { IconPlus } from "@tabler/icons-react";
import { Separator } from "@/components/common";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Table from "./DataTable";

const SiteHeader = () => {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex justify-between items-center">
          <h1 className="text-base font-medium">Appointments</h1>
        </div>
      </div>
    </header>
  );
};

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
              {/* <DashboardCard /> */}
              <div className="px-4 lg:px-6">
                <Table />
              </div>
              {/** data table */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
