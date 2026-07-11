import { EmptyState } from "../components/ui/EmptyState";

export function CafePage() {
  return (
    <EmptyState
      eyebrow="⌂ カフェで出会った味"
      title="まだカフェの記録がありません"
      description={"カフェで出会った一杯も残しておくと、\n自分の好みを知る手がかりになります。"}
    />
  );
}
