import { EmptyState } from "../components/ui/EmptyState";

export function BeansPage() {
  return (
    <div className="space-y-5">
      <EmptyState
        eyebrow="☕ あなたの珈琲棚"
        title="まだ豆カードがありません"
        description={"買った豆や粉をカードに残すと、\nあなたの珈琲棚が育っていきます。"}
        actionLabel="豆カードを追加"
      />
    </div>
  );
}
