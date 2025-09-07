import { IconPlus } from "@tabler/icons-react";
import { Button, Separator } from "@/components/common";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
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

          <Button className="flex flex-row flex-nowrap gap-[5px] py-[5px] px-[10px]">
            <IconPlus className="stroke-black" />
            <span className="hidden lg:inline text-black">Add Section</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
