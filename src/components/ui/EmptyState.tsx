import { navigate } from "../../app/routes";
import { KuraCard } from "./KuraCard";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionPath?: string;
};

export function EmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  actionPath,
}: Props) {
  return (
    <KuraCard>
      <p className="text-sm font-semibold text-[#d4a04f]">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-2xl leading-relaxed text-[#f5efe7]">
        {title}
      </h2>
      <p className="mt-3 whitespace-pre-line leading-7 text-[#aaa198]">
        {description}
      </p>
      {actionLabel && actionPath && (
        <button
          type="button"
          className="mt-6 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]"
          onClick={() => navigate(actionPath)}
        >
          ＋ {actionLabel}
        </button>
      )}
    </KuraCard>
  );
}
