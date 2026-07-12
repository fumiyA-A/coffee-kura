import { formatBrewRatio } from "../../utils/brew";

export function BrewRatioBadge({
  beanAmount,
  waterAmount,
}: {
  beanAmount?: number;
  waterAmount?: number;
}) {
  const ratio = formatBrewRatio(beanAmount, waterAmount);
  return (
    <div className="rounded-2xl border border-[#d4a04f]/20 bg-[#d4a04f]/8 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-[#aaa198]">Brew Ratio</span>
        <strong className="text-lg text-[#e0ae5e]">{ratio ?? "豆量と湯量を入力"}</strong>
      </div>
    </div>
  );
}
