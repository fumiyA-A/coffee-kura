import { useCallback } from "react";
import { navigate } from "../app/routes";
import { deleteBean, getBean } from "../db/repositories/beanRepository";
import { getBrewsByBean } from "../db/repositories/brewRepository";
import { useData } from "../hooks/useData";
import { KuraCard } from "../components/ui/KuraCard";
import { RecordImage } from "../components/ui/RecordImage";
import { ConfirmButton } from "../components/ui/ConfirmButton";
import { BrewCard } from "../components/brews/BrewCard";

export function BeanDetailPage({ beanId }: { beanId: string }) {
  const beanLoader = useCallback(() => getBean(beanId), [beanId]);
  const brewLoader = useCallback(() => getBrewsByBean(beanId), [beanId]);
  const { data: bean, loading } = useData(beanLoader);
  const { data: brews = [] } = useData(brewLoader);

  if (loading) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  if (!bean) return <p className="text-center">豆カードが見つかりません。</p>;

  const pairs = [["産地",bean.origin],["焙煎度",bean.roastLevel],["精製方法",bean.process],["品種",bean.variety],["購入日",bean.purchaseDate],["価格",bean.price!==undefined?`¥${bean.price}`:undefined],["内容量",bean.weight!==undefined?`${bean.weight}g`:undefined]];
  return <div className="space-y-5">
    <RecordImage blob={bean.photo} alt={bean.name} className="h-72 w-full rounded-[1.75rem] object-cover"/>
    <KuraCard><div className="flex justify-between gap-3"><div><h2 className="font-serif text-3xl">{bean.name}</h2><p className="mt-2 text-[#aaa198]">{bean.roaster||"ロースター未入力"}</p></div>{bean.favorite&&<span className="text-3xl text-[#e0aa53]">♥</span>}</div>
      <dl className="mt-6 space-y-3">{pairs.filter(([,v])=>v).map(([k,v])=><div key={k} className="flex justify-between gap-4"><dt className="text-[#8f877f]">{k}</dt><dd className="text-right">{v}</dd></div>)}</dl>
      <p className="mt-6 text-xl text-[#e0aa53]">{bean.overallRating?"★".repeat(bean.overallRating)+"☆".repeat(5-bean.overallRating):"未評価"}</p>
      <button onClick={()=>navigate(`/beans/${bean.id}/edit`)} className="mt-5 w-full rounded-2xl border border-[#d4a04f]/40 px-5 py-4 text-[#e0ae5e]">編集</button>
    </KuraCard>
    {bean.memo&&<KuraCard><h3 className="font-serif text-xl">メモ</h3><p className="mt-3 whitespace-pre-wrap leading-7 text-[#aaa198]">{bean.memo}</p></KuraCard>}
    <KuraCard><div className="flex items-center justify-between"><h3 className="font-serif text-xl">この豆で淹れた一杯</h3><span className="text-[#8f877f]">{brews.length}件</span></div>
      <button onClick={()=>navigate(`/beans/${bean.id}/brews/new`)} className="mt-5 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">＋ 一杯を記録</button>
      <div className="mt-4 space-y-3">{brews.length?brews.map(b=><BrewCard key={b.id} brew={b}/>):<p className="text-[#aaa198]">まだ記録がありません。</p>}</div>
    </KuraCard>
    <ConfirmButton label="豆カードを削除" onConfirm={()=>void deleteBean(bean.id).then(()=>navigate("/beans"))}/>
  </div>;
}
