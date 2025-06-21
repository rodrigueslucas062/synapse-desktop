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
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  const ensureDefaultTab = () => {
    const newId = crypto.randomUUID();
    const defaultTab: Tab = {
      id: crypto.randomUUID(),
      label: "Nova aba",
      type: "new-tab",
    };
    setTabs([defaultTab]);
    setActiveTab(newId);
    return { tabs: [defaultTab], activeTab: newId };
  };

  useEffect(() => {
    try {
      const storedTabs = localStorage.getItem("tabs");
      const storedActiveTab = localStorage.getItem("activeTab");

      if (storedTabs) {
        const parsedTabs: Tab[] = JSON.parse(storedTabs);
        if (parsedTabs.length === 0) {
          const fallback = ensureDefaultTab();
          localStorage.setItem("tabs", JSON.stringify(fallback.tabs));
          localStorage.setItem("activeTab", fallback.activeTab);
          return;
        }

        setTabs(parsedTabs);

        const activeId =
          storedActiveTab &&
          parsedTabs.find((tab) => tab.id === storedActiveTab)
            ? storedActiveTab
            : parsedTabs[0].id;

        setActiveTab(activeId);
      } else {
        const fallback = ensureDefaultTab();
        localStorage.setItem("tabs", JSON.stringify(fallback.tabs));
        localStorage.setItem("activeTab", fallback.activeTab);
      }
    } catch (err) {
      console.error("Erro ao restaurar abas:", err);
      ensureDefaultTab();
    }
  }, []);

  useEffect(() => {
    if (tabs.length > 0) {
      localStorage.setItem("tabs", JSON.stringify(tabs));
    }
    if (activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [tabs, activeTab]);

  const addTab = (id: string, label: string, type: TabType = "new-tab") => {
    const isUniqueType = type !== "new-tab";
    const existing = tabs.find((tab) => tab.type === type);

    if (isUniqueType && existing) {
      setActiveTab(existing.id);
      return;
    }

    const onlyOneNewTab = tabs.length === 1 && tabs[0].type === "new-tab";
    if (isUniqueType && onlyOneNewTab) {
      const newTab = { id, label, type };
      setTabs([newTab]);
      setActiveTab(id);
      return;
    }

    setTabs((prev) => [...prev, { id, label, type }]);
    setActiveTab(id);
  };

  const closeTab = (id: string) => {
    setTabs((prevTabs) => {
      const index = prevTabs.findIndex((tab) => tab.id === id);
      const isActive = id === activeTab;

      const updatedTabs = prevTabs.filter((tab) => tab.id !== id);
      if (updatedTabs.length === 0) {
        const newId = crypto.randomUUID();
        const defaultTab: Tab = {
          id: newId,
          label: "Nova aba",
          type: "new-tab",
        };
        setActiveTab(newId);

        return [defaultTab];
      }

      if (isActive) {
        const fallbackTab = index > 0 ? updatedTabs[index - 1] : updatedTabs[0];
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
