import { navigate } from "../../app/routes";
import { KuraCard } from "./KuraCard";
export function EmptyState({ eyebrow, title, description, actionLabel, actionPath }: {
  eyebrow: string; title: string; description: string; actionLabel?: string; actionPath?: string;
}) {
  return <KuraCard><p className="text-sm font-semibold text-[#d4a04f]">{eyebrow}</p>
    <h2 className="mt-4 font-serif text-2xl">{title}</h2><p className="mt-3 whitespace-pre-line leading-7 text-[#aaa198]">{description}</p>
    {actionLabel && actionPath && <button onClick={() => navigate(actionPath)} className="mt-6 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">＋ {actionLabel}</button>}
  </KuraCard>;
}
