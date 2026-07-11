import type { CafeCup } from "../../models/CafeCup";
import { STORES } from "../database";
import { getAll, getById, put, remove } from "./genericRepository";

export async function getAllCafeCups(): Promise<CafeCup[]> {
  const rows = await getAll<CafeCup>(STORES.cafeCups);
  return rows.sort((a, b) => b.date.localeCompare(a.date));
}
export const getCafeCup = (id: string) => getById<CafeCup>(STORES.cafeCups, id);
export const saveCafeCup = (cup: CafeCup) => put(STORES.cafeCups, cup);
export const deleteCafeCup = (id: string) => remove(STORES.cafeCups, id);
