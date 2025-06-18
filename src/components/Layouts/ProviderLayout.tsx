import { TooltipProvider } from "@radix-ui/react-tooltip";
import { AuthProvider } from "../Context";
import { TabsProvider } from "../Context/tabsContext/tabsContext";
import { SidebarProvider } from "../ui/sidebar";

export const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <TabsProvider>
        <TooltipProvider delayDuration={50}>
          <SidebarProvider>{children}</SidebarProvider>
        </TooltipProvider>
      </TabsProvider>
    </AuthProvider>
  );
};
