import { DEFAULT_BREW_METHODS } from "../../constants/brewMethods";
import type { BrewMethodDefinition } from "../../models/BrewMethodDefinition";
import { STORES } from "../database";
import { getAll, getById, put, remove } from "./genericRepository";

export async function ensureDefaultBrewMethods(): Promise<void> {
  const existing = await getAll<BrewMethodDefinition>(STORES.brewMethods);
  const existingIds = new Set(existing.map((method) => method.id));
  const now = new Date().toISOString();
  const startOrder = existing.length;
  await Promise.all(
    DEFAULT_BREW_METHODS.filter((method) => !existingIds.has(method.id)).map(
      (method, index) =>
        put(STORES.brewMethods, {
          ...method,
          sortOrder: startOrder + index,
          isBuiltIn: true,
          createdAt: now,
          updatedAt: now,
        } satisfies BrewMethodDefinition),
    ),
  );
}

export async function getAllBrewMethods(): Promise<BrewMethodDefinition[]> {
  await ensureDefaultBrewMethods();
  const rows = await getAll<BrewMethodDefinition>(STORES.brewMethods);
  return rows.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "ja"));
}

export const getBrewMethod = (id: string) =>
  getById<BrewMethodDefinition>(STORES.brewMethods, id);

export const saveBrewMethod = (method: BrewMethodDefinition) =>
  put(STORES.brewMethods, method);

export async function createBrewMethod(name: string): Promise<BrewMethodDefinition> {
  const methods = await getAllBrewMethods();
  const trimmed = name.trim();
  const duplicate = methods.find(
    (method) => method.name.trim().toLowerCase() === trimmed.toLowerCase(),
  );
  if (duplicate) return duplicate;
  const now = new Date().toISOString();
  const method: BrewMethodDefinition = {
    id: crypto.randomUUID(),
    name: trimmed,
    sortOrder: methods.length,
    isBuiltIn: false,
    createdAt: now,
    updatedAt: now,
  };
  await saveBrewMethod(method);
  return method;
}

export async function saveBrewMethodOrder(methods: BrewMethodDefinition[]): Promise<void> {
  const now = new Date().toISOString();
  await Promise.all(
    methods.map((method, index) =>
      saveBrewMethod({ ...method, sortOrder: index, updatedAt: now }),
    ),
  );
}

export async function deleteBrewMethod(id: string): Promise<void> {
  const method = await getBrewMethod(id);
  if (!method || method.isBuiltIn) return;
  await remove(STORES.brewMethods, id);
}
