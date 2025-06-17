import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import { NavigationTabs } from "../Tabs";
import {
  SecondarySidebarTrigger,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import {
  CalendarDotIcon,
  FileMagnifyingGlassIcon,
  GraphIcon,
} from "@phosphor-icons/react";
import { Calendar } from "../Calendar";
import { useState } from "react";
import { AuthProvider } from "../Context";
import { ServiceSidebar } from "../Sidebars/ServiceSidebar";
import { AppSidebar } from "../Sidebars/Sidebar";

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
        <Tooltip.Provider>
          <SidebarProvider>
            <div className="flex h-screen w-full bg-zinc-900">
              <ServiceSidebar />
              <div className="w-full flex flex-col gap-4">
                <div className="left-2 flex justify-between px-2 pt-1">
                  <div className="left-2 flex items-center gap-2">
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
                sidebarGroupLabelText="Calendário"
                sidebarSide="right"
              />
            </div>
          </SidebarProvider>
        </Tooltip.Provider>
      </Tabs.Root>
    </AuthProvider>
  );
};
