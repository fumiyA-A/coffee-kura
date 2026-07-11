import type { Cafe } from "../../models/Cafe";
import { STORES } from "../database";
import { getAll, getById, put } from "./genericRepository";

export async function getAllCafes(): Promise<Cafe[]> {
  const rows = await getAll<Cafe>(STORES.cafes);
  return rows.sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export const getCafe = (id: string) => getById<Cafe>(STORES.cafes, id);
export const saveCafe = (cafe: Cafe) => put(STORES.cafes, cafe);

export async function findOrCreateCafe(
  name: string,
  locationName?: string,
): Promise<Cafe> {
  const trimmed = name.trim();
  const existing = (await getAllCafes()).find(
    (cafe) => cafe.name.trim().toLowerCase() === trimmed.toLowerCase(),
  );
  if (existing) return existing;

  const now = new Date().toISOString();
  const cafe: Cafe = {
    id: crypto.randomUUID(),
    name: trimmed,
    locationName: locationName?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };
  await saveCafe(cafe);
  return cafe;
}
