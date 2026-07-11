import { useCallback } from "react";
import { navigate } from "../app/routes";
import { deleteCafeCup, getCafeCup } from "../db/repositories/cafeRepository";
import { useData } from "../hooks/useData";
import { KuraCard } from "../components/ui/KuraCard";
import { ConfirmButton } from "../components/ui/ConfirmButton";
import { PhotoGallery } from "../components/ui/PhotoGallery";
import { normalizePhotos } from "../services/imageService";
import { toSlashDate } from "../utils/date";

export function CafeDetailPage({ id }: { id: string }) {
  const loader=useCallback(()=>getCafeCup(id),[id]); const {data:cup,loading}=useData(loader);
  if (loading) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  if (!cup) return <p>記録が見つかりません。</p>;
  const origin = cup.originType==="blend" ? `ブレンド：${cup.origins?.join("・")||"詳細未入力"}` : cup.origins?.[0] ?? cup.origin;

  return <div className="space-y-5">
    <PhotoGallery photos={normalizePhotos(cup)} alt={cup.drinkName}/>
    <KuraCard><h2 className="font-serif text-3xl">{cup.drinkName}</h2><p className="mt-2 text-[#aaa198]">{cup.cafeName||"店名未入力"} · {toSlashDate(cup.date)}</p>
      <dl className="mt-6 space-y-3">{[["場所",cup.locationName],["産地",origin],["産地詳細",cup.originDetail],["焙煎度",cup.roastLevel],["価格",cup.price!==undefined?`¥${cup.price}`:undefined]].filter(([,v])=>v).map(([k,v])=><div key={k} className="flex justify-between"><dt className="text-[#8f877f]">{k}</dt><dd className="text-right">{v}</dd></div>)}</dl>
      <p className="mt-6 text-xl text-[#e0aa53]">{cup.overallRating?"★".repeat(cup.overallRating)+"☆".repeat(5-cup.overallRating):"未評価"}</p>
      <button onClick={()=>navigate(`/cafe/${cup.id}/edit`)} className="mt-5 w-full rounded-2xl border border-[#d4a04f]/40 px-5 py-4 text-[#e0ae5e]">編集</button>
    </KuraCard>
    {cup.memo&&<KuraCard><h3 className="font-serif text-xl">メモ</h3><p className="mt-3 whitespace-pre-wrap text-[#aaa198]">{cup.memo}</p></KuraCard>}
    <ConfirmButton label="カフェ記録を削除" onConfirm={()=>void deleteCafeCup(cup.id).then(()=>navigate("/cafe"))}/>
  </div>;
}
