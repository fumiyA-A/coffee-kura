import type { Rating, RepeatStatus } from "./enums";

export type CafeCup = {
  id: string;
  cafeName?: string;
  drinkName: string;
  origin?: string;
  roastLevel?: string;
  price?: number;
  date: string;
  locationName?: string;
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
