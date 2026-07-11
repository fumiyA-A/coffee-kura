const DATABASE_NAME = "coffee-kura";
const DATABASE_VERSION = 1;

export const STORES = {
  beans: "beans",
  brews: "brews",
  cafeCups: "cafe-cups",
  roasters: "roasters",
  settings: "settings",
} as const;

export function initializeDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("このブラウザはIndexedDBに対応していません。"));
      return;
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;

      Object.values(STORES).forEach((storeName) => {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
