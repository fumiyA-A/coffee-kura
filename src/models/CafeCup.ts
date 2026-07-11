import type { OriginType, Rating, RepeatStatus } from "./enums";

export type CafeCup = {
  id: string;
  cafeId?: string;
  cafeName?: string;
  drinkName: string;
  originType?: OriginType;
  origins?: string[];
  originDetail?: string;
  origin?: string;
  roastLevel?: string;
  price?: number;
  date: string;
  locationName?: string;
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
