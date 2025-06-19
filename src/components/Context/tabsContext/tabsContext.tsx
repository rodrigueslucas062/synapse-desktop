import * as Tabs from "@radix-ui/react-tabs";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type TabType = "new-tab" | "notion" | "tasks" | "notepad" | "jamboard";

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
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  const addTab = (id: string, label: string, type: TabType = "new-tab") => {
    const isUniqueType = type !== "new-tab";
    const existingIndex = tabs.findIndex((tab) => tab.type === type);

    const isInFirstTab = activeTab === tabs[0]?.id;

    if (isUniqueType && existingIndex !== -1) {
      setActiveTab(tabs[existingIndex].id);
      return;
    }

    if (isInFirstTab && tabs.length === 1 && tabs[0].type === "new-tab") {
      const newTab = { id, label, type };
      setTabs([newTab]);
      setActiveTab(id);
    } else {
      setTabs((prev) => [...prev, { id, label, type }]);
      setActiveTab(id);
    }
  };

  const closeTab = (id: string) => {
    setTabs((prevTabs) => {
      const index = prevTabs.findIndex((tab) => tab.id === id);
      const updatedTabs = prevTabs.filter((tab) => tab.id !== id);

      if (updatedTabs.length === 0) {
        const newId = crypto.randomUUID();
        setActiveTab(newId);
        return [{ id: newId, label: "Nova aba", type: "new-tab" }];
      }

      if (id === activeTab) {
        const fallbackTab = updatedTabs[index - 1] ?? updatedTabs[0];
        setActiveTab(fallbackTab.id);
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
