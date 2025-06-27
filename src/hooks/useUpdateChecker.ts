import { useEffect, useState } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { fetchLatestRelease, ReleaseData } from "./useLatestRelease";
import { useUserConfiguration } from "./useUserConfigurations";


export function useUpdateChecker() {
  const [updateAvailable, setUpdateAvailable] = useState<any | null>(null);
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { config } = useUserConfiguration();

  useEffect(() => {
    if (!config.autoUpdate) return;

    (async () => {
      try {
        const update = await check();
        if (update) {
          const release = await fetchLatestRelease();
          setUpdateAvailable(update);
          setReleaseData(release);
          setModalOpen(true);
        }
      } catch (err) {
        console.error("Erro ao verificar update:", err);
      }
    })();
  }, [config.autoUpdate]);

  const triggerManualUpdate = async () => {
    try {
      const update = await check();
      if (update) {
        const release = await fetchLatestRelease();
        setUpdateAvailable(update);
        setReleaseData(release);
        setModalOpen(true);
      }
    } catch (err) {
      console.error("Erro ao forçar verificação:", err);
    }
  };

const handleInstallNow = async () => {
  if (updateAvailable) {
    await updateAvailable.downloadAndInstall((event: any) => {
      switch (event.event) {
        case "Started":
          console.log("Iniciando download");
          break;
        case "Progress":
          console.log(`Baixado ${event.data.chunkLength} bytes`);
          break;
        case "Finished":
          console.log("Download finalizado");
          break;
      }
    });

    const { relaunch } = await import("@tauri-apps/plugin-process");
    await relaunch();
  }
};

  return {
    updateAvailable,
    releaseData,
    modalOpen,
    setModalOpen,
    handleInstallNow,
    triggerManualUpdate,
  };
}
