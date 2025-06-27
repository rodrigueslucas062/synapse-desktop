import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export type ReleaseData = {
  version: string;
  date: string; // ou timestamp, se for necessário manipular depois
  notes: string;
};

export async function fetchLatestRelease(): Promise<ReleaseData | null> {
  try {
    const ref = doc(db, "synapse-release"); // raiz do doc
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      return {
        version: data.version,
        date: data.date.toDate().toLocaleDateString("pt-BR"),
        notes: data.notes,
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar release do Firebase:", error);
    return null;
  }
}
