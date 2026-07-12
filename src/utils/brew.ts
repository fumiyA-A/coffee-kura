import type { Brew } from "../models/Brew";
import type { BrewRecipeTemplate } from "../models/BrewRecipeTemplate";

export type BrewRecipeValues = Pick<
  Brew,
  | "brewMethod"
  | "beanAmount"
  | "waterAmount"
  | "waterTemperature"
  | "brewTimeSeconds"
  | "grindSize"
  | "memo"
>;

export function calculateBrewRatio(
  beanAmount?: number,
  waterAmount?: number,
): number | undefined {
  if (!beanAmount || !waterAmount || beanAmount <= 0 || waterAmount <= 0) return undefined;
  return waterAmount / beanAmount;
}

export function formatBrewRatio(
  beanAmount?: number,
  waterAmount?: number,
): string | undefined {
  const ratio = calculateBrewRatio(beanAmount, waterAmount);
  return ratio === undefined ? undefined : `1:${ratio.toFixed(1)}`;
}

export function formatBrewTime(seconds?: number): string | undefined {
  if (seconds === undefined) return undefined;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return minutes > 0 ? `${minutes}:${String(rest).padStart(2, "0")}` : `${rest}秒`;
}

export function recipeFromBrew(brew: Brew): BrewRecipeValues {
  return {
    brewMethod: brew.brewMethod,
    beanAmount: brew.beanAmount,
    waterAmount: brew.waterAmount,
    waterTemperature: brew.waterTemperature,
    brewTimeSeconds: brew.brewTimeSeconds,
    grindSize: brew.grindSize,
    memo: brew.memo,
  };
}

export function recipeFromTemplate(template: BrewRecipeTemplate): BrewRecipeValues {
  return {
    brewMethod: template.brewMethod,
    beanAmount: template.beanAmount,
    waterAmount: template.waterAmount,
    waterTemperature: template.waterTemperature,
    brewTimeSeconds: template.brewTimeSeconds,
    grindSize: template.grindSize,
    memo: template.memo,
  };
}
