import { navigate } from "../app/routes";
import { BeanCard } from "../components/beans/BeanCard";
import { EmptyState } from "../components/ui/EmptyState";
import { useBeans } from "../hooks/useBeans";

export function BeansPage() {
  const { beans, loading } = useBeans();

  if (loading) {
    return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  }

  if (beans.length === 0) {
    return (
      <EmptyState
        eyebrow="☕ あなたの珈琲棚"
        title="まだ豆カードがありません"
        description={"買った豆や粉をカードに残すと、\nあなたの珈琲棚が育っていきます。"}
        actionLabel="豆カードを追加"
        actionPath="/beans/new"
      />
    );
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => navigate("/beans/new")}
        className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]"
      >
        ＋ 豆カードを追加
      </button>

      <div className="space-y-5">
        {beans.map((bean) => (
          <BeanCard key={bean.id} bean={bean} />
        ))}
      </div>
    </div>
  );
}
