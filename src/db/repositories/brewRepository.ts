import type { Brew } from "../../models/Brew";
import { STORES } from "../database";
import { getAll, getById, put, remove } from "./genericRepository";

export async function getAllBrews(): Promise<Brew[]> {
  const rows = await getAll<Brew>(STORES.brews);
  return rows.sort((a, b) => b.date.localeCompare(a.date));
}
export async function getBrewsByBean(beanId: string): Promise<Brew[]> {
  return (await getAllBrews()).filter((brew) => brew.beanId === beanId);
}
export const getBrew = (id: string) => getById<Brew>(STORES.brews, id);
export const saveBrew = (brew: Brew) => put(STORES.brews, brew);
export const deleteBrew = (id: string) => remove(STORES.brews, id);
