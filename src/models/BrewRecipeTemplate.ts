import type { BrewMethod } from "./enums";

export type BrewRecipeTemplate = {
  id: string;
  name: string;
  brewMethod: BrewMethod;
  beanAmount?: number;
  waterAmount?: number;
  waterTemperature?: number;
  brewTimeSeconds?: number;
  grindSize?: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};
