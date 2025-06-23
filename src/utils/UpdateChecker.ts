import { useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { toast } from "sonner";

export function useAutoUpdate() {
  useEffect(() => {
    (async () => {
      try {
        const update = await check();
        console.log("Verificando atualizações automáticas...");

        if (update) {
          toast.info(`Atualização disponível: ${update.version}`);

          let downloaded = 0;
          let contentLength = 0;

          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case "Started":
                contentLength = event.data.contentLength ?? 0;
                console.log(`Iniciando download de ${contentLength} bytes`);
                break;
              case "Progress":
                downloaded += event.data.chunkLength;
                console.log(`Baixado ${downloaded} de ${contentLength}`);
                break;
              case "Finished":
                console.log("Download finalizado");
                break;
            }
          });

          toast.success("Atualização instalada. Reiniciando...");
          await relaunch();
        } else {
          toast.info("Nenhuma atualização disponível");
        }
      } catch (err) {
        console.error("Erro ao verificar atualizações:", err);
        toast.error("Erro ao verificar atualizações");
      }
    })();
  }, []);
}

export async function checkForUpdate() {
  try {
    const update = await check();
    console.log("Verificando atualizações manualmente...");

    if (update) {
      toast.info(`Atualização encontrada: ${update.version}`);

      let downloaded = 0;
      let contentLength = 0;

      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case "Started":
            contentLength = event.data.contentLength ?? 0;
            console.log(`Iniciando download de ${contentLength} bytes`);
            break;
          case "Progress":
            downloaded += event.data.chunkLength;
            console.log(`Baixado ${downloaded} de ${contentLength}`);
            break;
          case "Finished":
            console.log("Download finalizado");
            break;
        }
      });

      toast.success("Atualização instalada. Reiniciando...");
      await relaunch();
    } else {
      toast.success("Você já está usando a versão mais recente");
    }
  } catch (err) {
    console.error("Erro ao buscar atualização:", err);
    toast.error("Erro ao buscar atualização");
  }
}
