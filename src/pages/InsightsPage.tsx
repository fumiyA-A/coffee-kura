import { KuraCard } from "../components/ui/KuraCard";
import { useBeans } from "../hooks/useBeans";

export function InsightsPage() {
  const { beans } = useBeans();

  return (
    <div className="space-y-5">
      <KuraCard>
        <p className="text-sm font-semibold text-[#d4a04f]">
          ✦ あなたの好みの軸
        </p>
        <h2 className="mt-4 font-serif text-2xl leading-relaxed text-[#f5efe7]">
          {beans.length >= 3
            ? "少しずつ、好みが見えてきました"
            : "あなたは、もう少しで見えてきます"}
        </h2>
        <p className="mt-3 leading-7 text-[#aaa198]">
          {beans.length >= 3
            ? "次のアップデートで、焙煎度や産地ごとの傾向を表示します。"
            : "3つほど豆や一杯を記録すると、好きな産地・焙煎度・味の傾向が見えはじめます。"}
        </p>
      </KuraCard>

      <div className="grid grid-cols-3 gap-3">
        {[
          [String(beans.length), "豆カード"],
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
