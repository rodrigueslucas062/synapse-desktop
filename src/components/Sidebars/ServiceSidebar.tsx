import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChalkboardSimpleIcon,
  ListChecksIcon,
  NotepadIcon,
  BrainIcon,
} from "@phosphor-icons/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTabs } from "../Context/tabsContext/tabsContext";

const navItems = [
  {
    tab: "home",
    icon: <BrainIcon size={20} weight="duotone" />,
    color: "text-emerald-500",
    label: "Notion",
  },
  {
    tab: "tasks",
    icon: <ListChecksIcon size={20} weight="duotone" />,
    color: "text-purple-500",
    label: "Tasks",
  },
  {
    tab: "notepad",
    icon: <NotepadIcon size={20} weight="duotone" />,
    color: "text-sky-500",
    label: "Notepad",
  },
  {
    tab: "jamboard",
    icon: <ChalkboardSimpleIcon size={20} weight="duotone" />,
    color: "text-orange-500",
    label: "Jamboard",
  },
];

export function ServiceSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { tabs, addTab, setActiveTab } = useTabs();
  const { setOpen } = useSidebar();

  const handleClick = (tabType: string, label: string) => {
    const existingTab = tabs.find((t) => t.type === tabType);
    if (existingTab) {
      setActiveTab(existingTab.id);
    } else {
      const id = `${tabType}-${Date.now()}`;
      addTab(id, label, tabType as any);
      setActiveTab(id);
    }
    setOpen(true);
  };

  return (
    <Sidebar collapsible="icon" className="overflow-hidden" {...props}>
      <Sidebar collapsible="none" className="w-fit border-r bg-zinc-800">
        <SidebarContent className="max-w-fit py-4">
          <SidebarGroup>
            <SidebarGroupContent className="space-y-2">
              {navItems.map((item) => (
                <Tooltip.Provider key={item.tab}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={() => handleClick(item.tab, item.label)}
                        className={`flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 transition ${item.color}`}
                      >
                        {item.icon}
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="select-none rounded bg-zinc-950 px-3 py-2.5 text-sm text-white shadow-lg"
                        side="right"
                        sideOffset={5}
                      >
                        {item.label}
                        <Tooltip.Arrow className="fill-zinc-950" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
