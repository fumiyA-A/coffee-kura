import type { Rating, RepeatStatus } from "./enums";

export type Bean = {
  id: string;
  name: string;
  roasterId?: string;
  origin?: string;
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
