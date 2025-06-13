import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import { NavigationTabs } from "../Tabs";
import { SecondarySidebarTrigger, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../Sidebar";
import { CalendarDotIcon, FileMagnifyingGlassIcon, GraphIcon } from "@phosphor-icons/react";

type LayoutProps = {
  children: React.ReactNode;
};

const item = [
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
]

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Tabs.Root defaultValue="new-tab">
      <Tooltip.Provider>
        <SidebarProvider>
          <AppSidebar item={item} sidebarGroupLabelText="Application" />
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
           <AppSidebar item={item} sidebarGroupLabelText="Application" sidebarSide="right" />
        </SidebarProvider>
      </Tooltip.Provider>
    </Tabs.Root>
  );
};
