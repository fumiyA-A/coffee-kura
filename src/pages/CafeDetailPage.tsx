import { useCallback } from "react";
import { navigate } from "../app/routes";
import { deleteCafeCup, getCafeCup } from "../db/repositories/cafeRepository";
import { useData } from "../hooks/useData";
import { KuraCard } from "../components/ui/KuraCard";
import { RecordImage } from "../components/ui/RecordImage";
import { ConfirmButton } from "../components/ui/ConfirmButton";

export function CafeDetailPage({ id }: { id: string }) {
  const loader=useCallback(()=>getCafeCup(id),[id]); const {data:cup,loading}=useData(loader);
  if (loading) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  if (!cup) return <p>記録が見つかりません。</p>;
  return <div className="space-y-5"><RecordImage blob={cup.photo} alt={cup.drinkName} className="h-72 w-full rounded-[1.75rem] object-cover"/>
    <KuraCard><h2 className="font-serif text-3xl">{cup.drinkName}</h2><p className="mt-2 text-[#aaa198]">{cup.cafeName||"店名未入力"} · {cup.date}</p>
      <dl className="mt-6 space-y-3">{[["場所",cup.locationName],["産地",cup.origin],["焙煎度",cup.roastLevel],["価格",cup.price!==undefined?`¥${cup.price}`:undefined]].filter(([,v])=>v).map(([k,v])=><div key={k} className="flex justify-between"><dt className="text-[#8f877f]">{k}</dt><dd>{v}</dd></div>)}</dl>
      <p className="mt-6 text-xl text-[#e0aa53]">{cup.overallRating?"★".repeat(cup.overallRating)+"☆".repeat(5-cup.overallRating):"未評価"}</p>
    </KuraCard>{cup.memo&&<KuraCard><h3 className="font-serif text-xl">メモ</h3><p className="mt-3 whitespace-pre-wrap text-[#aaa198]">{cup.memo}</p></KuraCard>}
    <ConfirmButton label="カフェ記録を削除" onConfirm={()=>void deleteCafeCup(cup.id).then(()=>navigate("/cafe"))}/>
  </div>;
}
