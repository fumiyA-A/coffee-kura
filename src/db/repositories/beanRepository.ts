import type { Bean } from "../../models/Bean";
import { runTransaction, STORES } from "../database";

export async function getAllBeans(): Promise<Bean[]> {
  const result = await runTransaction<Bean[]>(
    STORES.beans,
    "readonly",
    (store) => store.getAll(),
  );

  return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getBean(id: string): Promise<Bean | undefined> {
  return runTransaction<Bean | undefined>(
    STORES.beans,
    "readonly",
    (store) => store.get(id),
  );
}

export async function saveBean(bean: Bean): Promise<IDBValidKey> {
  return runTransaction<IDBValidKey>(
    STORES.beans,
    "readwrite",
    (store) => store.put(bean),
  );
}
