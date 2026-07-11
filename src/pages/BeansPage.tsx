import { useMemo, useState } from "react";
import { navigate } from "../app/routes";
import { getAllBeans } from "../db/repositories/beanRepository";
import { useData } from "../hooks/useData";
import { BeanCard } from "../components/beans/BeanCard";
import { EmptyState } from "../components/ui/EmptyState";

export function BeansPage() {
  const { data: beans = [], loading } = useData(getAllBeans);
  const [query,setQuery] = useState("");
  const [sort,setSort] = useState("new");
  const shown = useMemo(() => {
    const filtered = beans.filter((b) => [b.name,b.roaster,b.origin].join(" ").toLowerCase().includes(query.toLowerCase()));
    return [...filtered].sort((a,b) => {
      if (sort === "rating") return (b.overallRating ?? 0) - (a.overallRating ?? 0);
      if (sort === "name") return a.name.localeCompare(b.name,"ja");
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [beans,query,sort]);

  if (loading) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  if (!beans.length) return <EmptyState eyebrow="☕ あなたの珈琲棚" title="まだ豆カードがありません" description={"買った豆や粉をカードに残すと、\nあなたの珈琲棚が育っていきます。"} actionLabel="豆カードを追加" actionPath="/beans/new" />;

  return <div className="space-y-5">
    <button onClick={() => navigate("/beans/new")} className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">＋ 豆カードを追加</button>
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="豆名・ロースター・産地で検索" className="min-w-0 rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-3 outline-none" />
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border border-white/10 bg-[#201d1a] px-3">
        <option value="new">新しい順</option><option value="rating">評価順</option><option value="name">名前順</option>
      </select>
    </div>
    <div className="space-y-5">{shown.map((bean) => <BeanCard key={bean.id} bean={bean} />)}</div>
  </div>;
}
