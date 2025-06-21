import { XIcon } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";

interface DialogModalProps {
  dialogTrigger: React.ReactNode;
  dialogTriggerClassName?: string;
  dialogContent?: React.ReactNode;
}

export const DialogModal = ({
  dialogTrigger,
  dialogTriggerClassName,
  dialogContent,
}: DialogModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={dialogTriggerClassName}>
        {dialogTrigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/70">
          <Dialog.Content className="fixed z-10 p-8 inset-0 md:inset-auto max-md:top-[45%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[840px] w-full h-[70%] bg-zinc-900 rounded-lg flex flex-col outline-none overflow-hidden">
            <Dialog.Close className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full absolute top-2 right-2 text-zinc-200">
              <XIcon size={16} weight="regular" />
            </Dialog.Close>
            {dialogContent}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
