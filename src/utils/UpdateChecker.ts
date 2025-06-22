import { useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

export function useAutoUpdate() {
  useEffect(() => {
    (async () => {
      try {
        const update = await check();
        if (update) {
          console.log(
            `found update ${update.version} from ${update.date} with notes ${update.body}`
          );

          let downloaded = 0;
          let contentLength = 0;

          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case "Started":
                contentLength = event.data.contentLength ?? 0;
                console.log(`started downloading ${event.data.contentLength} bytes`);
                break;
              case "Progress":
                downloaded += event.data.chunkLength;
                console.log(`downloaded ${downloaded} from ${contentLength}`);
                break;
              case "Finished":
                console.log("download finished");
                break;
            }
          });

          console.log("update installed");
          await relaunch();
        }
      } catch (err) {
        console.error("Erro ao verificar atualizações:", err);
      }
    })();
  }, []);
}

export async function checkForUpdate() {
  try {
    const update = await check();
    console.log("Verificando atualizações...");
    if (update) {
      console.log(
        `found update ${update.version} from ${update.date} with notes ${update.body}`
      );

      let downloaded = 0;
      let contentLength = 0;

      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case "Started":
            contentLength = event.data.contentLength ?? 0;
            console.log(`started downloading ${event.data.contentLength} bytes`);
            break;
          case "Progress":
            downloaded += event.data.chunkLength;
            console.log(`downloaded ${downloaded} from ${contentLength}`);
            break;
          case "Finished":
            console.log("download finished");
            break;
        }
      });

      console.log("update installed");
      await relaunch();
    } else {
      console.log("Nenhuma atualização disponível.");
    }
  } catch (err) {
    console.error("Erro ao buscar atualização:", err);
  }
}