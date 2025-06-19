import * as Tabs from "@radix-ui/react-tabs";
import { createContext, useContext, useState, ReactNode } from "react";

export type TabType =
  | "new-tab"
  | "home"
  | "notion"
  | "notepad"
  | "jamboard";

export type Tab = {
  id: string;
  label: string;
  type: TabType;
};

type TabsContextType = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  addTab: (id: string, label: string, type?: TabType) => void;
  closeTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: crypto.randomUUID(), label: "Nova aba", type: "new-tab" },
  ]);
  const [activeTab, setActiveTab] = useState<string>("new-tab");

  console.log("Tabs initialized:", tabs);
  const addTab = (id: string, label: string, type: TabType = "new-tab") => {
    setTabs((prev) => {
      const isUniqueType = type !== "new-tab";
      const alreadyExists = prev.some((tab) => tab.type === type);
      if (isUniqueType && alreadyExists) return prev;

      return [...prev, { id, label, type }];
    });
    setActiveTab(id);
  };

  const closeTab = (id: string) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== id);

      if (updatedTabs.length === 0) {
        const newId = crypto.randomUUID();
        setActiveTab(newId);
        return [{ id: newId, label: "Nova aba", type: "new-tab" }];
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
