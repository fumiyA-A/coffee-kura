import type { Brew } from "../../models/Brew";
import { toSlashDate } from "../../utils/date";

const methods = {
  hand_drip: "ハンドドリップ",
  cold_brew: "水出し",
  espresso: "エスプレッソ",
  other: "その他",
};

export function BrewCard({
  brew,
  onEdit,
}: {
  brew: Brew;
  onEdit: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#211e1b] p-4">
      <div className="flex justify-between gap-3">
        <div>
          <p className="font-semibold">{methods[brew.brewMethod]}</p>
          <p className="text-sm text-[#8f877f]">{toSlashDate(brew.date)}</p>
        </div>
        <span className="text-[#e0aa53]">
          {brew.overallRating ? "★".repeat(brew.overallRating) : "未評価"}
        </span>
      </div>
      {brew.memo && <p className="mt-3 text-sm text-[#aaa198]">{brew.memo}</p>}
      <button
        type="button"
        onClick={onEdit}
        className="mt-3 rounded-xl border border-[#d4a04f]/30 px-4 py-2 text-sm text-[#e0ae5e]"
      >
        編集
      </button>
    </div>
  );
}
