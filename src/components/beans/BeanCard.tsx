import type { Bean } from "../../models/Bean";
import { navigate } from "../../app/routes";
import { RecordImage } from "../ui/RecordImage";

export function BeanCard({ bean }: { bean: Bean }) {
  return <button onClick={() => navigate(`/beans/${bean.id}`)} className="w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-[#292623] text-left shadow-xl">
    <RecordImage blob={bean.photo} alt={bean.name} className="h-48 w-full object-cover" />
    <div className="p-5"><div className="flex justify-between gap-3"><div>
      <h2 className="font-serif text-2xl">{bean.name}</h2>
      <p className="mt-1 text-sm text-[#aaa198]">{[bean.roaster,bean.origin].filter(Boolean).join(" · ") || "詳細未入力"}</p>
    </div>{bean.favorite && <span className="text-2xl text-[#e0aa53]">♥</span>}</div>
    <div className="mt-4 flex justify-between"><span className="text-[#e0aa53]">{bean.overallRating ? "★".repeat(bean.overallRating)+"☆".repeat(5-bean.overallRating) : "未評価"}</span>
      {bean.roastLevel && <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#cfc6bd]">{bean.roastLevel}</span>}</div></div>
  </button>;
}
