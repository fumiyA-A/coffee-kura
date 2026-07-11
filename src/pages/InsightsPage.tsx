import { useCallback } from "react";
import { getAllBeans } from "../db/repositories/beanRepository";
import { getAllBrews } from "../db/repositories/brewRepository";
import { getAllCafeCups } from "../db/repositories/cafeRepository";
import { useData } from "../hooks/useData";
import { buildInsights } from "../services/insightService";
import { KuraCard } from "../components/ui/KuraCard";

export function InsightsPage() {
  const loader=useCallback(async()=>buildInsights(await getAllBeans(),await getAllBrews(),await getAllCafeCups()),[]);
  const {data}=useData(loader);
  if (!data) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  const taste=[["酸味",data.taste.acidity],["苦味",data.taste.bitterness],["甘味",data.taste.sweetness],["コク",data.taste.body],["香り",data.taste.aroma]] as const;
  return <div className="space-y-5">
    <KuraCard><p className="text-sm font-semibold text-[#d4a04f]">✦ あなたの好みの軸</p><h2 className="mt-4 font-serif text-2xl">{data.beanCount+data.brewCount+data.cafeCount>=3?"記録から見えてきたこと":"もう少し記録すると見えてきます"}</h2>
      <p className="mt-3 leading-7 text-[#aaa198]">{data.topOrigin?`高評価の豆では「${data.topOrigin}」が目立ちます。`:"産地や焙煎度を記録すると、傾向を表示できます。"}</p></KuraCard>
    <div className="grid grid-cols-3 gap-3">{[[data.beanCount,"豆"],[data.brewCount,"自宅"],[data.cafeCount,"カフェ"]].map(([v,l])=><KuraCard key={String(l)}><p className="text-2xl font-semibold">{v}</p><p className="mt-1 text-xs text-[#aaa198]">{l}</p></KuraCard>)}</div>
    <KuraCard><h3 className="font-serif text-xl">傾向</h3><div className="mt-4 space-y-3">
      {[["好きな産地",data.topOrigin],["好きな焙煎度",data.topRoast],["よく飲むロースター",data.topRoaster],["平均評価",data.averageRating?.toFixed(1)]].map(([k,v])=><div key={k} className="flex justify-between"><span className="text-[#8f877f]">{k}</span><span>{v||"データ不足"}</span></div>)}
    </div></KuraCard>
    <KuraCard><h3 className="font-serif text-xl">平均フレーバープロファイル</h3><div className="mt-5 space-y-4">{taste.map(([label,value])=><div key={label}><div className="mb-1 flex justify-between"><span>{label}</span><span className="text-[#e0ae5e]">{value?.toFixed(1)||"-"}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-[#d4a04f]" style={{width:`${((value??0)/5)*100}%`}}/></div></div>)}</div></KuraCard>
  </div>;
}
