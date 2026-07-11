import { useEffect, useState } from "react";
import { navigate } from "../../app/routes";
import type { Bean } from "../../models/Bean";

function repeatLabel(status?: Bean["repeatStatus"]): string | undefined {
  if (status === "want_again") return "また買いたい";
  if (status === "maybe") return "気分次第";
  if (status === "no") return "買わない";
  if (status === "undecided") return "保留";
  return undefined;
}

export function BeanCard({ bean }: { bean: Bean }) {
  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    if (!bean.photo) return;
    const url = URL.createObjectURL(bean.photo);
    setPhotoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [bean.photo]);

  return (
    <button
      type="button"
      onClick={() => navigate(`/beans/${bean.id}`)}
      className="w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-[#292623] text-left shadow-xl shadow-black/20"
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={bean.name}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="grid h-40 place-items-center bg-[#332e29] text-5xl">
          ☕
        </div>
      )}

      <div className="p-5">
        <h2 className="font-serif text-2xl text-[#f5efe7]">{bean.name}</h2>
        {(bean.roaster || bean.origin) && (
          <p className="mt-1 text-sm text-[#aaa198]">
            {[bean.roaster, bean.origin].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-[#e0aa53]">
            {bean.overallRating
              ? "★".repeat(bean.overallRating) +
                "☆".repeat(5 - bean.overallRating)
              : "未評価"}
          </div>
          {repeatLabel(bean.repeatStatus) && (
            <span className="rounded-full bg-[#d4a04f]/15 px-3 py-1 text-xs text-[#e0ae5e]">
              {repeatLabel(bean.repeatStatus)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
