import { getAllBeans, saveBean } from "../db/repositories/beanRepository";
import { getAllBrews, saveBrew } from "../db/repositories/brewRepository";
import { getAllCafeCups, saveCafeCup } from "../db/repositories/cafeRepository";
import { normalizePhotos } from "./imageService";

export async function migrateLegacyData(): Promise<void> {
  const beans = await getAllBeans();
  const brews = await getAllBrews();
  const cups = await getAllCafeCups();

  await Promise.all(beans.map((bean) => {
    const origins = bean.origins?.length ? bean.origins : bean.origin ? [bean.origin] : [];
    return saveBean({
      ...bean,
      photos: normalizePhotos(bean),
      originType: bean.originType ?? (origins.length ? "single" : "unknown"),
      origins,
      photo: undefined,
      origin: undefined,
    });
  }));

  await Promise.all(brews.map((brew) => saveBrew({ ...brew, photos: normalizePhotos(brew), photo: undefined })));

  await Promise.all(cups.map((cup) => {
    const origins = cup.origins?.length ? cup.origins : cup.origin ? [cup.origin] : [];
    return saveCafeCup({
      ...cup,
      photos: normalizePhotos(cup),
      originType: cup.originType ?? (origins.length ? "single" : "unknown"),
      origins,
      photo: undefined,
      origin: undefined,
    });
  }));
}
