import type { Brew } from "../../models/Brew";
import type { BrewMethodDefinition } from "../../models/BrewMethodDefinition";
import { getBrewMethodLabel } from "../../constants/brewMethods";
import { formatBrewRatio, formatBrewTime } from "../../utils/brew";
import { toSlashDate } from "../../utils/date";

function display(value: string | number | undefined, suffix = "") {
  return value === undefined || value === "" ? "—" : `${value}${suffix}`;
}

export function BrewComparison({
  brews,
  methods,
}: {
  brews: Brew[];
  methods: BrewMethodDefinition[];
}) {
  if (brews.length < 2) return null;
  const targets = [...brews]
    .sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 4);
  const rows: Array<[string, (brew: Brew) => string | number | undefined]> = [
    ["抽出方法", (brew) => getBrewMethodLabel(brew.brewMethod, methods)],
    ["豆量", (brew) => display(brew.beanAmount, "g")],
    ["湯量", (brew) => display(brew.waterAmount, "ml")],
    ["比率", (brew) => formatBrewRatio(brew.beanAmount, brew.waterAmount)],
    ["湯温", (brew) => display(brew.waterTemperature, "℃")],
    ["挽き目", (brew) => brew.grindSize],
    ["時間", (brew) => formatBrewTime(brew.brewTimeSeconds)],
    ["評価", (brew) => brew.overallRating ? `${brew.overallRating} / 5` : undefined],
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5">
      <table className="min-w-[42rem] border-collapse text-sm">
        <thead>
          <tr className="bg-[#211e1b]">
            <th className="sticky left-0 z-10 w-24 bg-[#211e1b] px-4 py-3 text-left text-[#8f877f]">項目</th>
            {targets.map((brew) => (
              <th key={brew.id} className="min-w-32 px-4 py-3 text-left font-semibold">
                {toSlashDate(brew.date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, formatter], index) => (
            <tr key={label} className={index % 2 ? "bg-white/[0.02]" : "bg-[#292623]"}>
              <th className={`sticky left-0 z-10 px-4 py-3 text-left font-normal text-[#8f877f] ${index % 2 ? "bg-[#2d2a27]" : "bg-[#292623]"}`}>
                {label}
              </th>
              {targets.map((brew) => (
                <td key={brew.id} className="px-4 py-3">{formatter(brew) ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
