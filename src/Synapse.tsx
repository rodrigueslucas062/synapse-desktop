import * as Tabs from "@radix-ui/react-tabs";
import { ToDo } from "./components/ToDo";
import { useTabs } from "./components/Context/tabsContext/tabsContext";

export const Synapse = () => {
  const { tabs } = useTabs();

  return (
    <>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id} className="p-4">
          {tab.type === "new-tab" && (
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-white text-3xl font-bold">Synapse</h1>
              <p className="text-gray-400">
                Welcome to Synapse, your AI-powered assistant.
              </p>
            </div>
          )}
          {tab.type === "notion" && <div>Notion content</div>}
          {tab.type === "tasks" && <ToDo />}
          {tab.type === "notepad" && <div>Notepad content</div>}
          {tab.type === "jamboard" && <div>Jamboard content</div>}
        </Tabs.Content>
      ))}
    </>
  );
};
