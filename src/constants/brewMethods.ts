import type { BrewMethodDefinition } from "../models/BrewMethodDefinition";

export const DEFAULT_BREW_METHODS: ReadonlyArray<Pick<BrewMethodDefinition, "id" | "name">> = [
  { id: "hand_drip", name: "ハンドドリップ" },
  { id: "v60", name: "V60" },
  { id: "kalita_wave", name: "Kalita Wave" },
  { id: "french_press", name: "フレンチプレス" },
  { id: "aeropress", name: "AeroPress" },
  { id: "espresso", name: "エスプレッソ" },
  { id: "cold_brew", name: "水出し" },
  { id: "other", name: "その他" },
];

const LEGACY_LABELS: Record<string, string> = {
  hand_drip: "ハンドドリップ",
  cold_brew: "水出し",
  espresso: "エスプレッソ",
  other: "その他",
};

export function getBrewMethodLabel(
  id: string,
  methods: BrewMethodDefinition[],
): string {
  return methods.find((method) => method.id === id)?.name ?? LEGACY_LABELS[id] ?? id;
}
