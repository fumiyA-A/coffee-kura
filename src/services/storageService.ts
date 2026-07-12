import { getAllBeans } from "../db/repositories/beanRepository";
import { getAllBrews } from "../db/repositories/brewRepository";
import { getAllCafeCups } from "../db/repositories/cafeRepository";
import { getAllBrewTemplates } from "../db/repositories/brewTemplateRepository";
import { normalizePhotos } from "./imageService";

export async function getStorageSummary() {
  const [beans, brews, cafeCups, templates] = await Promise.all([
    getAllBeans(),
    getAllBrews(),
    getAllCafeCups(),
    getAllBrewTemplates(),
  ]);
  const records = [...beans, ...brews, ...cafeCups];
  const photos = records.flatMap(normalizePhotos);
  const bytes = photos.reduce((sum, blob) => sum + blob.size, 0);
  return {
    beanCount: beans.length,
    brewCount: brews.length,
    cafeCount: cafeCups.length,
    templateCount: templates.length,
    photoCount: photos.length,
    bytes,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
