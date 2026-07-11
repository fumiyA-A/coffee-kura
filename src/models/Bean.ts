import type { Rating, RepeatStatus } from "./enums";

export type Bean = {
  id: string;
  name: string;
  roaster?: string;
  origin?: string;
  roastLevel?: string;
  process?: string;
  variety?: string;
  purchaseDate?: string;
  price?: number;
  weight?: number;
  isGround?: boolean;
  photo?: Blob;
  acidity?: Rating;
  bitterness?: Rating;
  sweetness?: Rating;
  body?: Rating;
  aroma?: Rating;
  overallRating?: Rating;
  repeatStatus?: RepeatStatus;
  favorite?: boolean;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};
