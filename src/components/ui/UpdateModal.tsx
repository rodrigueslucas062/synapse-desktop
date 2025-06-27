import * as Dialog from "@radix-ui/react-dialog";
import ReactMarkdown from "react-markdown";

type Props = {
  open: boolean;
  onClose: () => void;
  release: {
    version: string;
    date: string;
    notes: string;
  };
  onInstall: () => void;
};

export function UpdateModal({ open, onClose, release, onInstall }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-w-lg w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-xl font-bold">
            Nova versão disponível: {release.version}
          </Dialog.Title>
          <p className="text-sm text-gray-500 mt-1">Lançado em {release.date}</p>

          <div className="mt-4 max-h-80 overflow-y-auto text-sm prose prose-sm">
            <ReactMarkdown>{release.notes}</ReactMarkdown>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-200 text-sm rounded hover:bg-zinc-300"
            >
              Mais tarde
            </button>
            <button
              onClick={onInstall}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Instalar agora
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}