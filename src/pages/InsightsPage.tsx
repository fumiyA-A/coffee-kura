import { KuraCard } from "../components/ui/KuraCard";

export function InsightsPage() {
  return (
    <div className="space-y-5">
      <KuraCard>
        <p className="text-sm font-semibold text-[#d4a04f]">✦ あなたの好みの軸</p>
        <h2 className="mt-4 font-serif text-2xl leading-relaxed text-[#f5efe7]">
          あなたは、もう少しで見えてきます
        </h2>
        <p className="mt-3 leading-7 text-[#aaa198]">
          3つほど豆や一杯を記録すると、好きな産地・焙煎度・味の傾向が見えはじめます。
        </p>
      </KuraCard>

      <div className="grid grid-cols-3 gap-3">
        {[
          ["0", "豆カード"],
          ["0", "自宅の一杯"],
          ["0", "カフェ"],
        ].map(([value, label]) => (
          <KuraCard key={label}>
            <p className="text-2xl font-semibold text-[#f5efe7]">{value}</p>
            <p className="mt-1 text-xs text-[#aaa198]">{label}</p>
          </KuraCard>
        ))}
      </div>
    </div>
  );
}
