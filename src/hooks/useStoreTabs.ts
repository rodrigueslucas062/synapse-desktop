import { useEffect, useState } from "react";
import { load } from "@tauri-apps/plugin-store";
import { Tab } from "@/components/Context/tabsContext/tabsContext";

export const useStoreTabs = () => {
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
      const store = await load("store.json", { autoSave: true });

      try {
        const storedTabs = await store.get<Tab[]>("tabs");
        const storedActiveTab = await store.get<string>("activeTab");

        if (storedTabs && storedTabs.length > 0) {
          setTabs(storedTabs);

          const activeId =
            storedActiveTab &&
            storedTabs.find((tab) => tab.id === storedActiveTab)
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
      const store = await load("store.json", { autoSave: true });
      if (tabs.length > 0) await store.set("tabs", tabs);
      if (activeTab) await store.set("activeTab", activeTab);
      await store.save();
    })();
  }, [tabs, activeTab]);

  return {
    tabs,
    activeTab,
    setTabs,
    setActiveTab,
  };
};
