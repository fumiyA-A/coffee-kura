import type { Brew } from "../../models/Brew";
import { toSlashDate } from "../../utils/date";

export function BrewStats({ brews }: { brews: Brew[] }) {
  const rated = brews
    .filter((brew) => brew.overallRating !== undefined)
    .sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt));

  if (!rated.length) {
    return (
      <div className="rounded-2xl bg-[#211e1b] p-4 text-sm text-[#aaa198]">
        総合評価を記録すると、評価の変化がここに表示されます。
      </div>
    );
  }

  const values = rated.map((brew) => brew.overallRating!);
  const latest = values[0];
  const highest = Math.max(...values);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const difference = values.length >= 2 ? latest - values[1] : undefined;
  const differenceLabel =
    difference === undefined ? "—" : difference > 0 ? `+${difference}` : String(difference);

  const stats = [
    ["最新", latest.toFixed(1)],
    ["最高", highest.toFixed(1)],
    ["平均", average.toFixed(1)],
    ["前回比", differenceLabel],
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-2">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-[#211e1b] px-2 py-3 text-center">
            <p className="text-xs text-[#8f877f]">{label}</p>
            <p className="mt-1 text-lg font-semibold text-[#e0ae5e]">{value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {rated.slice(0, 6).map((brew) => (
          <div key={brew.id} className="grid grid-cols-[5.5rem_1fr_1.5rem] items-center gap-3 text-sm">
            <span className="text-[#8f877f]">{toSlashDate(brew.date).slice(5)}</span>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-[#d4a04f]"
                style={{ width: `${(brew.overallRating! / 5) * 100}%` }}
              />
            </div>
            <span className="text-right text-[#e0ae5e]">{brew.overallRating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
