import { navigate } from "../app/routes";
import { getAllCafeCups } from "../db/repositories/cafeRepository";
import { useData } from "../hooks/useData";
import { EmptyState } from "../components/ui/EmptyState";
import { CafeCard } from "../components/cafe/CafeCard";

export function CafePage() {
  const { data: cups=[], loading }=useData(getAllCafeCups);
  if (loading) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  if (!cups.length) return <EmptyState eyebrow="⌂ カフェで出会った味" title="まだカフェの記録がありません" description={"カフェで出会った一杯も残しておくと、\n自分の好みを知る手がかりになります。"} actionLabel="カフェの一杯を追加" actionPath="/cafe/new"/>;
  return <div className="space-y-5"><button onClick={()=>navigate("/cafe/new")} className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">＋ カフェの一杯を追加</button>{cups.map(c=><CafeCard key={c.id} cup={c}/>)}</div>;
}
