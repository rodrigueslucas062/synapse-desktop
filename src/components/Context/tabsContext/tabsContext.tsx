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

  console.log("activeTab", tabs);
  console.log("Aba atual", activeTab);

  useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  const addTab = (id: string, label: string, type: TabType = "new-tab") => {
    const isUniqueType = type !== "new-tab";
    const existingIndex = tabs.findIndex((tab) => tab.type === type);

    if (isUniqueType && existingIndex !== -1) {
      setActiveTab(tabs[existingIndex].id);
      return;
    }

    const onlyOneTab = tabs.length === 1;
    const onlyOneNewTab = onlyOneTab && tabs[0].type === "new-tab";

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
    console.log("Fechando aba:", id);

    setTabs((prevTabs) => {
      const index = prevTabs.findIndex((tab) => tab.id === id);
      const isActive = id === activeTab;

      const updatedTabs = prevTabs.filter((tab) => tab.id !== id);
      console.log("Aba ativa:", activeTab);
      console.log("Index da aba sendo fechada:", index);
      console.log("Aba era ativa?", isActive);
      console.log("Abas restantes:", updatedTabs);

      if (updatedTabs.length === 0) {
        const newId = crypto.randomUUID();
        console.log("Última aba fechada. Criando nova:", newId);
        setActiveTab(newId);
        return [{ id: newId, label: "Nova aba", type: "new-tab" }];
      }

      if (isActive) {
        let fallbackTab;
        if (index > 0) {
          fallbackTab = updatedTabs[index - 1];
        } else {
          fallbackTab = updatedTabs[updatedTabs.length - 1];
        }

        console.log("Trocando para fallbackTab:", fallbackTab.id);
        setActiveTab(fallbackTab.id);
      } else {
        console.log("Aba fechada não era ativa. Nenhuma troca.");
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
