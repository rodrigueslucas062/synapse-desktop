import {
  BrainIcon,
  ChalkboardSimpleIcon,
  ListChecksIcon,
  NotepadIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useAuth } from "../Context";

export const ServiceSidebar = () => {
  const auth = useAuth();
  const logout = auth ? auth.logout : () => {};

  return (
    <Tooltip.Provider>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 w-fit h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-900 flex flex-col">
          <ul className="space-y-2 font-medium flex-1">
            {[
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
            ].map((item) => (
              <li key={item.href}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <a
                      href={item.href}
                      className={`flex w-fit items-center justify-center p-2 ${item.color} rounded-lg bg-zinc-800 group`}
                    >
                      {item.icon}
                    </a>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="select-none rounded bg-zinc-950 px-[15px] py-2.5 text-[15px] leading-none text-white shadow-lg will-change-[transform,opacity] data-[state=delayed-open]:animate-slideRightAndFade"
                      side="right"
                      sideOffset={5}
                    >
                      {item.label}
                      <Tooltip.Arrow className="fill-zinc-950" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </li>
            ))}
          </ul>
          <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              onClick={() => logout()}
              className="flex w-fit items-center justify-center p-2 text-red-500 rounded-lg bg-zinc-800 group"
            >
              <SignOutIcon size={20} weight="duotone" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="select-none rounded bg-zinc-950 px-[15px] py-2.5 text-[15px] leading-none text-white shadow-lg will-change-[transform,opacity] data-[state=delayed-open]:animate-slideRightAndFade"
              side="right"
              sideOffset={5}
            >
              Logout
              <Tooltip.Arrow className="fill-zinc-950" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        </div>
      </aside>
    </Tooltip.Provider>
  );
};
