import type { Rating, RepeatStatus } from "./enums";

export type Bean = {
  id: string;
  name: string;
  roaster?: string;
  origin?: string;
  roastLevel?: string;
  price?: number;
  weight?: number;
  photo?: Blob;
  overallRating?: Rating;
  repeatStatus?: RepeatStatus;
  memo?: string;
  createdAt: string;
  updatedAt: string;
};
