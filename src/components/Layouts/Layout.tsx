import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import { NavigationTabs } from "../Tabs";
import {
  SecondarySidebarTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import { AppSidebar } from "../Sidebars/Sidebar";
import {
  CalendarDotIcon,
  FileMagnifyingGlassIcon,
  GraphIcon,
} from "@phosphor-icons/react";
import { Calendar } from "../Calendar";
import { useState } from "react";
import { ServiceSidebar } from "../Sidebars/ServiceSidebar";
import { AuthProvider } from "../Context";

type LayoutProps = {
  children: React.ReactNode;
};

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

const item: SidebarItem[] = [
  {
    title: "Inbox",
    url: "#",
    icon: GraphIcon,
  },
  {
    title: "Calendar",
    url: "#",
    icon: CalendarDotIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: FileMagnifyingGlassIcon,
  },
];

export const Layout = ({ children }: LayoutProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <AuthProvider>
      <Tabs.Root defaultValue="new-tab">
        <ServiceSidebar />
        <Tooltip.Provider>
          <SidebarProvider>
            <AppSidebar
              item={
                <>
                  {item.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              }
              sidebarGroupLabelText="Application"
            />
            <div className="w-full bg-zinc-900 h-screen flex flex-col gap-4">
              <div className="flex justify-between px-2 pt-1">
                <div className="flex items-center gap-2">
                  <SidebarTrigger />
                  <NavigationTabs />
                </div>
                <SecondarySidebarTrigger />
              </div>
              <main className="flex-1 p-4 overflow-y-auto">{children}</main>
            </div>
            <AppSidebar
              item={
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow-sm w-full"
                  captionLayout="dropdown"
                />
              }
              sidebarGroupLabelText="Application"
              sidebarSide="right"
            />
            <SidebarTrigger />
          </SidebarProvider>
        </Tooltip.Provider>
      </Tabs.Root>
    </AuthProvider>
  );
};
