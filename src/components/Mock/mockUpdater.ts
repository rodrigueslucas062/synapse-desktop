import type { ReleaseData } from "@/hooks/useLatestRelease";

export async function mockCheck(): Promise<any> {

  return {
    version: "0.7.0-mock",
    date: new Date().toISOString(),
    downloadAndInstall: async (onEvent: (event: any) => void) => {
      onEvent({ event: "Started", data: { contentLength: 1000 } });

      let downloaded = 0;
      const chunkSize = 200;

      while (downloaded < 1000) {
        await new Promise((res) => setTimeout(res, 200));
        downloaded += chunkSize;
        onEvent({ event: "Progress", data: { chunkLength: chunkSize } });
      }

      onEvent({ event: "Finished" });
    },
  };
}

export async function mockFetchLatestRelease(): Promise<ReleaseData> {
  return {
    version: "0.7.0-mock",
    date: "26/06/2025",
    notes: `
# 📦 Versão 0.7.0 – Atualização de Teste

- Essa é uma simulação de atualização com conteúdo mockado.
- O botão **Instalar agora** simula o progresso e reinicia o app.
- Ideal para testes visuais do modal e lógica do fluxo.

> Essa é apenas uma simulação de atualização.
    `,
  };
}
