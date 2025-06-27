import { NavigationTabs } from "../Tabs";
import { SecondarySidebarTrigger, SidebarTrigger } from "../ui/sidebar";
import { ServiceSidebar } from "../Sidebars/ServiceSidebar";
import { ProviderLayout } from "./ProviderLayout";
import { IntegrationSidebar } from "../Sidebars/IntegrationSidebar";
import { useAutoUpdate } from "@/utils/UpdateChecker";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  useAutoUpdate();

  return (
    <ProviderLayout>
      <ServiceSidebar />
      <div className="w-full flex flex-col gap-4 select-none">
        <div className="left-2 flex justify-between px-2 pt-1">
          <div className="left-2 flex items-center gap-2">
            <SidebarTrigger />
            <NavigationTabs />
          </div>
          <SecondarySidebarTrigger />
        </div>
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
      <IntegrationSidebar />
    </ProviderLayout>
  );
};
