import { MinusIcon, ResizeIcon, XIcon } from '@phosphor-icons/react';
import { getCurrentWindow } from '@tauri-apps/api/window';

const appWindow = getCurrentWindow();

document
  .getElementById('titlebar-minimize')
  ?.addEventListener('click', () => appWindow.minimize());
document
  .getElementById('titlebar-maximize')
  ?.addEventListener('click', () => appWindow.toggleMaximize());
document
  .getElementById('titlebar-close')
  ?.addEventListener('click', () => appWindow.close());

export const Titlebar = () => {
  return (
    <div
      data-tauri-drag-region
      className="flex justify-between items-center bg-zinc-800 text-white h-10 px-2"
    >
      {/* Área esquerda - nome ou logo */}
      <div className="flex items-center gap-2">
        <span className="font-bold">MyApp</span>
      </div>

      {/* Área direita - botões */}
      <div className="flex items-center gap-2">
        {/* Botão customizado extra */}
        <button
          onClick={() => alert("Abrir configurações")}
          className="hover:bg-zinc-700 px-2 py-1 rounded"
        >
          ⚙️
        </button>

        {/* Minimizar */}
        <button
          onClick={() => appWindow.minimize()}
          className="hover:bg-zinc-700 px-2 py-1 rounded"
        >
          <MinusIcon size={16} />
        </button>

        {/* Maximizar/Restaurar */}
        <button
          onClick={async () => {
            const isMaximized = await appWindow.isMaximized();
            if (isMaximized) {
              await appWindow.unmaximize();
            } else {
              await appWindow.maximize();
            }
          }}
          className="hover:bg-zinc-700 px-2 py-1 rounded"
        >
          <ResizeIcon size={16} />
        </button>

        {/* Fechar */}
        <button
          onClick={() => appWindow.close()}
          className="hover:bg-red-600 px-2 py-1 rounded"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
