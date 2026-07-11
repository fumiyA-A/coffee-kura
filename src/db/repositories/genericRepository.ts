import { requestFromStore } from "../database";

export async function getAll<T>(storeName: string): Promise<T[]> {
  return requestFromStore<T[]>(storeName, "readonly", (store) => store.getAll());
}

export async function getById<T>(
  storeName: string,
  id: string,
): Promise<T | undefined> {
  return requestFromStore<T | undefined>(
    storeName,
    "readonly",
    (store) => store.get(id),
  );
}

export async function put<T extends { id: string }>(
  storeName: string,
  value: T,
): Promise<IDBValidKey> {
  return requestFromStore<IDBValidKey>(
    storeName,
    "readwrite",
    (store) => store.put(value),
  );
}

export async function remove(
  storeName: string,
  id: string,
): Promise<undefined> {
  return requestFromStore<undefined>(
    storeName,
    "readwrite",
    (store) => store.delete(id),
  );
}
