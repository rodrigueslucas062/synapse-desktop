import { useEffect, useState } from "react";
import { load } from "@tauri-apps/plugin-store";

const FILE_NAME = ".sidebar.dat";

export const useSidebarStorage = () => {
  const [open, setOpen] = useState(true);
  const [openSecondary, setOpenSecondary] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const store = await load(FILE_NAME, { autoSave: true });

      try {
        const openValue = await store.get<boolean>("sidebar_open");
        const openSecondaryValue = await store.get<boolean>("sidebar_secondary_open");

        setOpen(openValue ?? true);
        setOpenSecondary(openSecondaryValue ?? false);
      } catch (err) {
        console.error("Erro ao carregar estado da sidebar:", err);
        setOpen(true);
        setOpenSecondary(false);
      }

      setIsLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    (async () => {
      const store = await load(FILE_NAME, { autoSave: true });
      await store.set("sidebar_open", open);
      await store.set("sidebar_secondary_open", openSecondary);
      await store.save();
    })();
  }, [open, openSecondary, isLoaded]);

  return {
    open,
    setOpen,
    openSecondary,
    setOpenSecondary,
    isLoaded,
  };
};
