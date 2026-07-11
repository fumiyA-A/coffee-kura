import { STORES, clearAllStores } from "../db/database";
import { getAll, put } from "../db/repositories/genericRepository";
import type { Bean } from "../models/Bean";
import type { Brew } from "../models/Brew";
import type { CafeCup } from "../models/CafeCup";
import type { Cafe } from "../models/Cafe";

type Backup = {
  version: 2;
  exportedAt: string;
  beans: Bean[];
  brews: Brew[];
  cafeCups: CafeCup[];
  cafes: Cafe[];
};

export async function exportBackup(): Promise<void> {
  const payload: Backup = {
    version: 2,
    exportedAt: new Date().toISOString(),
    beans: await getAll<Bean>(STORES.beans),
    brews: await getAll<Brew>(STORES.brews),
    cafeCups: await getAll<CafeCup>(STORES.cafeCups),
    cafes: await getAll<Cafe>(STORES.cafes),
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
  const parsed = JSON.parse(await file.text()) as {
    version?: 1 | 2;
    beans?: Bean[];
    brews?: Brew[];
    cafeCups?: CafeCup[];
    cafes?: Cafe[];
  };
  if (parsed.version !== 1 && parsed.version !== 2) {
    throw new Error("未対応のバックアップ形式です。");
  }

  await clearAllStores();
  await Promise.all([
    ...(parsed.beans ?? []).map((item) => put(STORES.beans, item)),
    ...(parsed.brews ?? []).map((item) => put(STORES.brews, item)),
    ...(parsed.cafeCups ?? []).map((item) => put(STORES.cafeCups, item)),
    ...(parsed.cafes ?? []).map((item) => put(STORES.cafes, item)),
  ]);
}
