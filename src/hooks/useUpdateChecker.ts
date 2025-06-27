import { useEffect, useState } from "react";
import type { ReleaseData } from "./useLatestRelease";
import { check as realCheck } from "@tauri-apps/plugin-updater";
import { fetchLatestRelease as realFetchLatestRelease } from "./useLatestRelease";
import {
  mockCheck,
  mockFetchLatestRelease,
} from "@/components/Mock/mockUpdater";
import { useUserConfiguration } from "./useUserConfigurations";

const isMock = import.meta.env.VITE_MOCK_UPDATE === "true";
const check = isMock ? mockCheck : realCheck;
const fetchLatestRelease = isMock
  ? mockFetchLatestRelease
  : realFetchLatestRelease;

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
            console.log("Iniciando download...");
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
