import type { Brew } from "../../models/Brew";
import { formatBrewRatio, formatBrewTime } from "../../utils/brew";
import { toSlashDate } from "../../utils/date";

export function BrewCard({
  brew,
  methodLabel,
  onEdit,
  onDuplicate,
  onSaveTemplate,
}: {
  brew: Brew;
  methodLabel: string;
  onEdit: () => void;
  onDuplicate: () => void;
  onSaveTemplate: () => void;
}) {
  const ratio = formatBrewRatio(brew.beanAmount, brew.waterAmount);
  const recipe = [
    brew.beanAmount !== undefined ? `${brew.beanAmount}g` : undefined,
    brew.waterAmount !== undefined ? `${brew.waterAmount}ml` : undefined,
    ratio,
    brew.waterTemperature !== undefined ? `${brew.waterTemperature}℃` : undefined,
    formatBrewTime(brew.brewTimeSeconds),
  ].filter(Boolean);

  return (
    <div className="rounded-2xl border border-white/5 bg-[#211e1b] p-4">
      <div className="flex justify-between gap-3">
        <div>
          <p className="font-semibold">{methodLabel}</p>
          <p className="text-sm text-[#8f877f]">{toSlashDate(brew.date)}</p>
        </div>
        <span className="text-[#e0aa53]">
          {brew.overallRating ? "★".repeat(brew.overallRating) : "未評価"}
        </span>
      </div>
      {recipe.length > 0 && <p className="mt-3 text-sm text-[#aaa198]">{recipe.join(" ・ ")}</p>}
      {brew.grindSize && <p className="mt-1 text-sm text-[#8f877f]">挽き目：{brew.grindSize}</p>}
      {brew.memo && <p className="mt-3 line-clamp-2 text-sm text-[#aaa198]">{brew.memo}</p>}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button type="button" onClick={onDuplicate} className="rounded-xl bg-[#d4a04f] px-2 py-2 text-xs font-semibold text-[#1e1914]">
          もう一度
        </button>
        <button type="button" onClick={onSaveTemplate} className="rounded-xl border border-[#d4a04f]/30 px-2 py-2 text-xs text-[#e0ae5e]">
          テンプレート
        </button>
        <button type="button" onClick={onEdit} className="rounded-xl border border-white/10 px-2 py-2 text-xs text-[#cfc6bd]">
          編集
        </button>
      </div>
    </div>
  );
}
