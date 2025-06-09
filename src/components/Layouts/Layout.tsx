import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from '@radix-ui/react-tooltip';
import { NavigationTabs } from "../Tabs";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Tabs.Root defaultValue="new-tab">
      <Tooltip.Provider>
        <div className="w-full bg-zinc-900 h-screen flex flex-col gap-4">
          <NavigationTabs />
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </div>
      </Tooltip.Provider>
    </Tabs.Root>
  );
};
