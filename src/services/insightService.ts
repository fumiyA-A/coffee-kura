import type { Bean } from "../models/Bean";
import type { Brew } from "../models/Brew";
import type { CafeCup } from "../models/CafeCup";

function topValue(values: Array<string | undefined>): string | undefined {
  const counts = new Map<string, number>();
  values.filter(Boolean).forEach((value) => {
    counts.set(value!, (counts.get(value!) ?? 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

function average(values: Array<number | undefined>): number | undefined {
  const valid = values.filter((value): value is number => value !== undefined);
  if (!valid.length) return undefined;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function beanOrigins(bean: Bean): string[] {
  if (bean.origins?.length) return bean.origins;
  return bean.origin ? [bean.origin] : [];
}

export function buildInsights(
  beans: Bean[],
  brews: Brew[],
  cafeCups: CafeCup[],
) {
  const highRatedOrigins = beans
    .filter((bean) => (bean.overallRating ?? 0) >= 4)
    .flatMap(beanOrigins);

  return {
    beanCount: beans.length,
    brewCount: brews.length,
    cafeCount: cafeCups.length,
    topOrigin: topValue(highRatedOrigins),
    topRoast: topValue(
      beans.filter((b) => (b.overallRating ?? 0) >= 4).map((b) => b.roastLevel),
    ),
    topRoaster: topValue(beans.map((b) => b.roaster)),
    averageRating: average([
      ...beans.map((b) => b.overallRating),
      ...brews.map((b) => b.overallRating),
      ...cafeCups.map((c) => c.overallRating),
    ]),
    taste: {
      acidity: average([...beans, ...brews, ...cafeCups].map((x) => x.acidity)),
      bitterness: average([...beans, ...brews, ...cafeCups].map((x) => x.bitterness)),
      sweetness: average([...beans, ...brews, ...cafeCups].map((x) => x.sweetness)),
      body: average([...beans, ...brews, ...cafeCups].map((x) => x.body)),
      aroma: average([...beans, ...brews, ...cafeCups].map((x) => x.aroma)),
    },
  };
}
