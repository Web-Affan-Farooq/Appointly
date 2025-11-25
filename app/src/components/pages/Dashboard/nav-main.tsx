"use client";

import {
  // IconCirclePlusFilled,
  IconPlus,
  // IconMail,
  type Icon,
} from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useDashboard } from "@/stores/dashboard";

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) => {
  const { services, selectService } = useDashboard();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <Link href={"/add-service"} className="cursor-pointer">
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              >
                <IconPlus />
                <span>Add service</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>

        <SidebarMenu>
          <select
            name="services"
            id="services"
            className="py-[6px] px-[10px] bg-pink rounded-md"
            onChange={(e) => {
              const selected = services.find(
                (service) => service.name === e.target.value
              );
              if (selected) selectService(selected);
            }}
          >
            {services.map((service, idx) => (
              <option key={idx} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item, idx) => (
            <Link href={item.url} key={idx}>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default NavMain;
