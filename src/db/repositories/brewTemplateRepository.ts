import type { BrewRecipeTemplate } from "../../models/BrewRecipeTemplate";
import { STORES } from "../database";
import { getAll, getById, put, remove } from "./genericRepository";

export async function getAllBrewTemplates(): Promise<BrewRecipeTemplate[]> {
  const rows = await getAll<BrewRecipeTemplate>(STORES.brewRecipeTemplates);
  return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export const getBrewTemplate = (id: string) =>
  getById<BrewRecipeTemplate>(STORES.brewRecipeTemplates, id);

export const saveBrewTemplate = (template: BrewRecipeTemplate) =>
  put(STORES.brewRecipeTemplates, template);

export const deleteBrewTemplate = (id: string) =>
  remove(STORES.brewRecipeTemplates, id);
