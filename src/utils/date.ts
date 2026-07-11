export function toSlashDate(iso?: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${year}/${month}/${day}`;
}

export function slashDateToIso(value: string): string | undefined {
  const normalized = value.trim().replace(/-/g, "/");
  const match = normalized.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!match) return undefined;
  const [, year, month, day] = match;
  const iso = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return undefined;
  return iso;
}

export function todaySlash(): string {
  return toSlashDate(new Date().toISOString().slice(0, 10));
}
