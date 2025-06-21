import * as Tabs from "@radix-ui/react-tabs";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { load } from '@tauri-apps/plugin-store';

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

const store = await load('store.json', { autoSave: true });

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  const ensureDefaultTab = () => {
    const newId = crypto.randomUUID();
    const defaultTab: Tab = {
      id: newId,
      label: "Nova aba",
      type: "new-tab",
    };
    setTabs([defaultTab]);
    setActiveTab(newId);
    return { tabs: [defaultTab], activeTab: newId };
  };

  useEffect(() => {
    (async () => {
      try {
        const storedTabs = await store.get<Tab[]>("tabs");
        const storedActiveTab = await store.get<string>("activeTab");

        if (storedTabs && storedTabs.length > 0) {
          setTabs(storedTabs);

          const activeId =
            storedActiveTab && storedTabs.find((tab) => tab.id === storedActiveTab)
              ? storedActiveTab
              : storedTabs[0].id;

          setActiveTab(activeId);
        } else {
          const fallback = ensureDefaultTab();
          await store.set("tabs", fallback.tabs);
          await store.set("activeTab", fallback.activeTab);
          await store.save();
        }
      } catch (err) {
        console.error("Erro ao carregar tabs do Store:", err);
        ensureDefaultTab();
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (tabs.length > 0) await store.set("tabs", tabs);
      if (activeTab) await store.set("activeTab", activeTab);
      await store.save();
    })();
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
