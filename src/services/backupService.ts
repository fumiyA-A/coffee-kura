import { STORES, clearAllStores } from "../db/database";
import { getAll, put } from "../db/repositories/genericRepository";
import type { Bean } from "../models/Bean";
import type { Brew } from "../models/Brew";
import type { CafeCup } from "../models/CafeCup";
import type { Cafe } from "../models/Cafe";
import type { Roaster } from "../models/Roaster";

type Backup = {
  version: 3;
  exportedAt: string;
  beans: Bean[];
  brews: Brew[];
  cafeCups: CafeCup[];
  cafes: Cafe[];
  roasters: Roaster[];
};

export async function exportBackup(): Promise<void> {
  const payload: Backup = {
    version: 3,
    exportedAt: new Date().toISOString(),
    beans: await getAll<Bean>(STORES.beans),
    brews: await getAll<Brew>(STORES.brews),
    cafeCups: await getAll<CafeCup>(STORES.cafeCups),
    cafes: await getAll<Cafe>(STORES.cafes),
    roasters: await getAll<Roaster>(STORES.roasters),
  };
  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `coffee-kura-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File): Promise<void> {
  const parsed = JSON.parse(await file.text()) as Partial<Backup> & { version?: 1|2|3 };
  if (![1,2,3].includes(parsed.version ?? 0)) throw new Error("未対応のバックアップ形式です。");
  await clearAllStores();
  await Promise.all([
    ...(parsed.beans ?? []).map((x) => put(STORES.beans, x)),
    ...(parsed.brews ?? []).map((x) => put(STORES.brews, x)),
    ...(parsed.cafeCups ?? []).map((x) => put(STORES.cafeCups, x)),
    ...(parsed.cafes ?? []).map((x) => put(STORES.cafes, x)),
    ...(parsed.roasters ?? []).map((x) => put(STORES.roasters, x)),
  ]);
}
