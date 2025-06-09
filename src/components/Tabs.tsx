import { PlusIcon } from "@phosphor-icons/react";
import * as Tabs from "@radix-ui/react-tabs";
import { CustomTooltip } from "./Tooltip";

export const NavigationTabs = () => {
  return (
    <Tabs.List className="flex items-center justify-start pt-1.5 px-1 gap-1 text-sm">
      <CustomTooltip tooltipText="Nova aba" side={"bottom"}>
        <Tabs.Trigger
          value="new-tab"
          className="h-fit px-4 py-1 bg-none text-white rounded-md cursor-pointer
          hover:bg-zinc-700 transition-colors duration-200
          data-[state=active]:bg-zinc-800"
        >
          Nova aba
        </Tabs.Trigger>
      </CustomTooltip>

      <CustomTooltip tooltipText="Nova aba" side={"bottom"}>
        <Tabs.Trigger
          value="add-tab"
          className="h-fit p-2 bg-none text-white rounded-md cursor-pointer
            hover:bg-zinc-700 transition-colors duration-200
            data-[state=active]:bg-zinc-900"
        >
          <PlusIcon size={14} weight="regular" />
        </Tabs.Trigger>
      </CustomTooltip>
    </Tabs.List>
  );
};
