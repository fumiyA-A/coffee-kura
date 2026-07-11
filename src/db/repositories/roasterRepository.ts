import type { Roaster } from "../../models/Roaster";
import { STORES } from "../database";
import { getAll, put } from "./genericRepository";

export async function getAllRoasters(): Promise<Roaster[]> {
  const rows = await getAll<Roaster>(STORES.roasters);
  return rows.sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export async function findOrCreateRoaster(name: string): Promise<Roaster> {
  const trimmed = name.trim();
  const existing = (await getAllRoasters()).find(
    (item) => item.name.trim().toLowerCase() === trimmed.toLowerCase(),
  );
  if (existing) return existing;
  const now = new Date().toISOString();
  const roaster: Roaster = { id: crypto.randomUUID(), name: trimmed, createdAt: now, updatedAt: now };
  await put(STORES.roasters, roaster);
  return roaster;
}
