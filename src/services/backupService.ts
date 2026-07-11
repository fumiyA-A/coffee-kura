import { STORES, clearAllStores } from "../db/database";
import { getAll, put } from "../db/repositories/genericRepository";
import type { Bean } from "../models/Bean";
import type { Brew } from "../models/Brew";
import type { CafeCup } from "../models/CafeCup";

type Backup = {
  version: 1;
  exportedAt: string;
  beans: Bean[];
  brews: Brew[];
  cafeCups: CafeCup[];
};

export async function exportBackup(): Promise<void> {
  const payload: Backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    beans: await getAll<Bean>(STORES.beans),
    brews: await getAll<Brew>(STORES.brews),
    cafeCups: await getAll<CafeCup>(STORES.cafeCups),
  };

  const blob = new Blob([JSON.stringify(payload)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `coffee-kura-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File): Promise<void> {
  const parsed = JSON.parse(await file.text()) as Backup;
  if (parsed.version !== 1) throw new Error("未対応のバックアップ形式です。");

  await clearAllStores();
  await Promise.all([
    ...parsed.beans.map((item) => put(STORES.beans, item)),
    ...parsed.brews.map((item) => put(STORES.brews, item)),
    ...parsed.cafeCups.map((item) => put(STORES.cafeCups, item)),
  ]);
}
