import { PlusIcon, XIcon } from "@phosphor-icons/react";
import * as Tabs from "@radix-ui/react-tabs";
import { CustomTooltip } from "./Tooltip";
import { useTabs } from "./Context/tabsContext/tabsContext";

export const NavigationTabs = () => {
  const { tabs, addTab, activeTab, closeTab } = useTabs();

  return (
    <Tabs.List className="flex items-center justify-start pt-1.5 px-1 gap-1 text-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <div key={tab.id} className="relative flex items-center">
            <CustomTooltip tooltipText={tab.label} side="bottom">
              <Tabs.Trigger
                value={tab.id}
                className={`flex items-center min-w-30 justify-between gap-2 px-3 py-1 rounded-md group text-white cursor-pointer transition-colors duration-200
                ${isActive ? "bg-zinc-800" : "hover:bg-zinc-700"}`}
              >
                {tab.label}
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => closeTab(tab.id)}
                  className={`w-4 h-4 flex items-center justify-center text-zinc-400 hover:text-red-500 bg-zinc-900 rounded text-xs transition
                  ${isActive ? "visible" : "invisible group-hover:visible"}`}
                >
                  <XIcon size={10} />
                </button>
              </Tabs.Trigger>
            </CustomTooltip>
          </div>
        );
      })}

      <CustomTooltip tooltipText="Nova aba" side="bottom">
        <button
          onClick={() => addTab(`${crypto.randomUUID()}`, "Nova aba")}
          className="h-fit p-2 bg-none text-white rounded-md cursor-pointer
            hover:bg-zinc-700 transition-colors duration-200"
        >
          <PlusIcon size={14} weight="regular" />
        </button>
      </CustomTooltip>
    </Tabs.List>
  );
};
