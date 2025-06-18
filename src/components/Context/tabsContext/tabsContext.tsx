import { createContext, useContext, useState, ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";

type Tab = {
  id: string;
  label: string;
};

type TabsContextType = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  addTab: (id: string, label: string) => void;
  closeTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "new-tab", label: "Nova aba" },
  ]);
  const [activeTab, setActiveTab] = useState("new-tab");

  const addTab = (id: string, label: string) => {
    setTabs((prev) =>
      prev.some((tab) => tab.id === id) ? prev : [...prev, { id, label }]
    );
    setActiveTab(id);
  };

  const closeTab = (id: string) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== id);

      if (updatedTabs.length === 0) {
        const newId = `tab-${Date.now()}`;
        setActiveTab(newId);
        return [{ id: newId, label: "Nova aba" }];
      }

      if (activeTab === id) {
        setActiveTab(updatedTabs[0].id);
      }

      return updatedTabs;
    });
  };

  return (
    <TabsContext.Provider
      value={{ tabs, activeTab, setActiveTab, addTab, closeTab }}
    >
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        {children}
      </Tabs.Root>
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("useTabs must be used within a TabsProvider");
  return context;
};
