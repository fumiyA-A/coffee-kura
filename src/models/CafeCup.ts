import type { Rating, RepeatStatus } from "./enums";

export type CafeCup = {
  id: string;
  cafeName?: string;
  drinkName: string;
  origin?: string;
  price?: number;
  photo?: Blob;
  overallRating?: Rating;
  repeatStatus?: RepeatStatus;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};
