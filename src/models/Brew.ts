import type { BrewMethod, Rating, RepeatStatus } from "./enums";

export type Brew = {
  id: string;
  beanId: string;
  date: string;
  brewMethod: BrewMethod;
  beanAmount?: number;
  waterAmount?: number;
  waterTemperature?: number;
  brewTimeSeconds?: number;
  grindSize?: string;
  photos?: Blob[];
  photo?: Blob;
  acidity?: Rating;
  bitterness?: Rating;
  sweetness?: Rating;
  body?: Rating;
  aroma?: Rating;
  overallRating?: Rating;
  repeatStatus?: RepeatStatus;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};
