const DATABASE_NAME = "coffee-kura";
const DATABASE_VERSION = 3;

export const STORES = {
  beans: "beans",
  brews: "brews",
  cafeCups: "cafe-cups",
  cafes: "cafes",
  roasters: "roasters",
  settings: "settings"
} as const;

let databasePromise: Promise<IDBDatabase> | undefined;

export function initializeDatabase(): Promise<IDBDatabase> {
  if (databasePromise) return databasePromise;
  databasePromise = new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("このブラウザはIndexedDBに対応していません。"));
      return;
    }
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      Object.values(STORES).forEach((name) => {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: "id" });
        }
      });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return databasePromise;
}

export async function requestFromStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  factory: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await initializeDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const req = factory(tx.objectStore(storeName));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearAllStores(): Promise<void> {
  const db = await initializeDatabase();
  await Promise.all(Object.values(STORES).map((storeName) => new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  })));
}
