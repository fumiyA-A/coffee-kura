import type { Bean } from "../../models/Bean";
import { navigate } from "../../app/routes";
import { RecordImage } from "../ui/RecordImage";
import { normalizePhotos } from "../../services/imageService";

function originLabel(bean: Bean): string | undefined {
  if (bean.originType === "blend") return `ブレンド：${bean.origins?.join("・") || "詳細未入力"}`;
  return bean.origins?.[0] ?? bean.origin;
}

export function BeanCard({ bean }: { bean: Bean }) {
  const photos = normalizePhotos(bean);
  return (
    <button
      onClick={() => navigate(`/beans/${bean.id}`)}
      className="w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-[#292623] text-left shadow-xl"
    >
      <RecordImage blob={photos[0]} alt={bean.name} className="h-48 w-full object-cover" />
      <div className="p-5">
        <div className="flex justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl">{bean.name}</h2>
            <p className="mt-1 text-sm text-[#aaa198]">
              {[bean.roaster, originLabel(bean)].filter(Boolean).join(" · ") || "詳細未入力"}
            </p>
          </div>
          {bean.favorite && <span className="text-2xl text-[#e0aa53]">♥</span>}
        </div>
        <div className="mt-4 flex justify-between">
          <span className="text-[#e0aa53]">
            {bean.overallRating
              ? "★".repeat(bean.overallRating) + "☆".repeat(5 - bean.overallRating)
              : "未評価"}
          </span>
          {bean.roastLevel && (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#cfc6bd]">
              {bean.roastLevel}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
