import { useEffect, useState } from "react";
import { getVersion } from '@tauri-apps/api/app';
import { Spinner } from "@radix-ui/themes";

export function AppVersion() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    getVersion().then(setVersion);
  }, []);

  return <span className="flex text-xs text-gray-500 justify-center items-center">{version ?? <Spinner size={"1"} />}</span>;
}