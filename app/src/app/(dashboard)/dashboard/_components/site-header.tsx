"use client";
import { Separator } from "@/components/common";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
          <h1 className="text-base font-medium">Dashboard</h1>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
