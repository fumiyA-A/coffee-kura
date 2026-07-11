import type { CafeCup } from "../../models/CafeCup";
import { navigate } from "../../app/routes";
import { RecordImage } from "../ui/RecordImage";
export function CafeCard({ cup }: { cup: CafeCup }) {
  return <button onClick={() => navigate(`/cafe/${cup.id}`)} className="w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-[#292623] text-left">
    <RecordImage blob={cup.photo} alt={cup.drinkName} className="h-44 w-full object-cover" />
    <div className="p-5"><h2 className="font-serif text-2xl">{cup.drinkName}</h2>
      <p className="mt-1 text-sm text-[#aaa198]">{cup.cafeName || "店名未入力"} · {cup.date}</p>
      <p className="mt-4 text-[#e0aa53]">{cup.overallRating ? "★".repeat(cup.overallRating)+"☆".repeat(5-cup.overallRating) : "未評価"}</p></div>
  </button>;
}
