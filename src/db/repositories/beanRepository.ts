import type { Bean } from "../../models/Bean";
import { STORES } from "../database";
import { getAll, getById, put, remove } from "./genericRepository";

export async function getAllBeans(): Promise<Bean[]> {
  const rows = await getAll<Bean>(STORES.beans);
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export const getBean = (id: string) => getById<Bean>(STORES.beans, id);
export const saveBean = (bean: Bean) => put(STORES.beans, bean);
export const deleteBean = (id: string) => remove(STORES.beans, id);
