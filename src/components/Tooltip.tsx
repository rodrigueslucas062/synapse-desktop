import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface CustomTooltipProps {
  children: ReactNode;
  tooltipText: string;
  side?: "top" | "right" | "bottom" | "left";
}

export const CustomTooltip = ({
  children,
  tooltipText,
  side = "top",
}: CustomTooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="select-none rounded-lg bg-zinc-950 px-4 py-2 text-sm leading-none left-4"
            sideOffset={5}
            side={side}
          >
            {tooltipText}
            <Tooltip.Arrow className="fill-zinc-950" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
