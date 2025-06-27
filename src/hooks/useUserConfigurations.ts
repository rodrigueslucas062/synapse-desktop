import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { load } from "@tauri-apps/plugin-store";
import { useAuth } from "@/components/Context";

export type UserConfiguration = {
  autoUpdate: boolean;
};

const DEFAULT_CONFIG: UserConfiguration = {
  autoUpdate: true,
};

export function useUserConfiguration() {
  const { currentUser } = useAuth();
  const [config, setConfig] = useState<UserConfiguration>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    (async () => {
      const store = await load("user-config.json", { autoSave: true });
      let localConfig = await store.get<UserConfiguration>("config");

      if (!localConfig) {
        localConfig = DEFAULT_CONFIG;
        await store.set("config", localConfig);
        await store.save();
      }

      try {
        const ref = doc(db, `users/${currentUser.uid}/configurations`, "settings");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const cloudConfig = snap.data() as UserConfiguration;
          setConfig(cloudConfig);
          await store.set("config", cloudConfig);
          await store.save();
        } else {
          await setDoc(ref, localConfig);
          setConfig(localConfig);
        }
      } catch (err) {
        console.error("Erro ao sincronizar configurações:", err);
        setConfig(localConfig);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser]);

  const updateConfig = async (newConfig: Partial<UserConfiguration>) => {
    if (!currentUser) return;

    const updated = { ...config, ...newConfig };
    setConfig(updated);

    const store = await load("user-config.json", { autoSave: true });
    await store.set("config", updated);
    await store.save();

    try {
      const ref = doc(db, `users/${currentUser.uid}/configurations`, "settings");
      await setDoc(ref, updated);
    } catch (err) {
      console.error("Erro ao atualizar configuração no Firebase:", err);
    }
  };

  return { config, updateConfig, loading };
}
