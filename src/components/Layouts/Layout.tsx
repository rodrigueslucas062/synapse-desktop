import { NavigationTabs } from "../Tabs";
import { SecondarySidebarTrigger, SidebarTrigger } from "../ui/sidebar";
import { Calendar } from "../Calendar";
import { useState } from "react";
import { ServiceSidebar } from "../Sidebars/ServiceSidebar";
import { AppSidebar } from "../Sidebars/Sidebar";
import { ProviderLayout } from "./ProviderLayout";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <ProviderLayout>
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
    </ProviderLayout>
  );
};
