import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChalkboardSimpleIcon,
  ListChecksIcon,
  NotepadIcon,
  BrainIcon,
  SignOutIcon,
  CommandIcon,
} from "@phosphor-icons/react";
import * as Tooltip from "@radix-ui/react-tooltip";

const navItems = [
  {
    href: "/home",
    icon: <BrainIcon size={20} weight="duotone" />,
    color: "text-emerald-500",
    label: "Notion",
  },
  {
    href: "/tasks",
    icon: <ListChecksIcon size={20} weight="duotone" />,
    color: "text-purple-500",
    label: "Tasks",
  },
  {
    href: "/notepad",
    icon: <NotepadIcon size={20} weight="duotone" />,
    color: "text-sky-500",
    label: "Notepad",
  },
  {
    href: "/jamboard",
    icon: <ChalkboardSimpleIcon size={20} weight="duotone" />,
    color: "text-orange-500",
    label: "Jamboard",
  },
];

const data = {
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
  ],
};

export function ServiceSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(navItems[0]);
  const [mails, setMails] = React.useState(data.mails);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r bg-zinc-800"
      >
        <SidebarContent className=" min-w-fit py-4">
          <SidebarGroup>
            <SidebarGroupContent className="space-y-2">
              {navItems.map((item) => (
                <Tooltip.Provider key={item.href}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={() => {
                          setActiveItem(item);
                          setOpen(true);
                        }}
                        className={`flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 transition ${
                          activeItem.href === item.href ? "bg-zinc-700" : ""
                        } ${item.color}`}
                      >
                        {item.icon}
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="select-none rounded bg-zinc-950 px-3 py-2.5 text-sm leading-none text-white shadow-lg will-change-[transform,opacity] data-[state=delayed-open]:animate-slideRightAndFade"
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

              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => console.log("Logout")}
                      className="flex items-center justify-center p-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 text-red-500 transition"
                    >
                      <SignOutIcon size={20} weight="duotone" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="select-none rounded bg-zinc-950 px-3 py-2.5 text-sm leading-none text-white shadow-lg"
                      side="right"
                      sideOffset={5}
                    >
                      Logout
                      <Tooltip.Arrow className="fill-zinc-950" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-1 md:flex bg-zinc-800">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.label}
            </div>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {mails.map((mail) => (
                <a
                  href="#"
                  key={mail.email}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                    {mail.teaser}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
