import { useEffect, useState } from "react";
import { KuraCard } from "../components/ui/KuraCard";
import { getBean } from "../db/repositories/beanRepository";
import type { Bean } from "../models/Bean";

function repeatLabel(status?: Bean["repeatStatus"]): string {
  if (status === "want_again") return "また買いたい";
  if (status === "maybe") return "気分次第";
  if (status === "no") return "買わない";
  return "保留";
}

export function BeanDetailPage({ beanId }: { beanId: string }) {
  const [bean, setBean] = useState<Bean>();
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    void getBean(beanId).then((value) => {
      setBean(value);
      setLoading(false);
    });
  }, [beanId]);

  useEffect(() => {
    if (!bean?.photo) {
      setPhotoUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(bean.photo);
    setPhotoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [bean?.photo]);

  if (loading) {
    return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  }

  if (!bean) {
    return <p className="text-center text-[#aaa198]">豆カードが見つかりません。</p>;
  }

  return (
    <div className="space-y-5">
      {photoUrl && (
        <img
          src={photoUrl}
          alt={bean.name}
          className="h-72 w-full rounded-[1.75rem] object-cover"
        />
      )}

      <KuraCard>
        <h2 className="font-serif text-3xl text-[#f5efe7]">{bean.name}</h2>
        {bean.roaster && (
          <p className="mt-2 text-lg text-[#aaa198]">{bean.roaster}</p>
        )}

        <dl className="mt-6 space-y-4">
          {bean.origin && (
            <div className="flex justify-between gap-4">
              <dt className="text-[#8f877f]">産地</dt>
              <dd className="text-right text-[#f5efe7]">{bean.origin}</dd>
            </div>
          )}
          {bean.roastLevel && (
            <div className="flex justify-between gap-4">
              <dt className="text-[#8f877f]">焙煎度</dt>
              <dd className="text-right text-[#f5efe7]">{bean.roastLevel}</dd>
            </div>
          )}
          {bean.price !== undefined && (
            <div className="flex justify-between gap-4">
              <dt className="text-[#8f877f]">価格</dt>
              <dd className="text-right text-[#f5efe7]">¥{bean.price}</dd>
            </div>
          )}
          {bean.weight !== undefined && (
            <div className="flex justify-between gap-4">
              <dt className="text-[#8f877f]">内容量</dt>
              <dd className="text-right text-[#f5efe7]">{bean.weight}g</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="text-xl text-[#e0aa53]">
            {bean.overallRating
              ? "★".repeat(bean.overallRating) +
                "☆".repeat(5 - bean.overallRating)
              : "未評価"}
          </div>
          <span className="rounded-full bg-[#d4a04f]/15 px-3 py-1 text-sm text-[#e0ae5e]">
            {repeatLabel(bean.repeatStatus)}
          </span>
        </div>
      </KuraCard>

      {bean.memo && (
        <KuraCard>
          <h3 className="font-serif text-xl text-[#f5efe7]">メモ</h3>
          <p className="mt-3 whitespace-pre-wrap leading-7 text-[#aaa198]">
            {bean.memo}
          </p>
        </KuraCard>
      )}

      <KuraCard>
        <h3 className="font-serif text-xl text-[#f5efe7]">この豆で淹れた一杯</h3>
        <p className="mt-3 leading-7 text-[#aaa198]">
          Brew記録は次のアップデートで追加します。
        </p>
        <button
          type="button"
          disabled
          className="mt-5 w-full rounded-2xl border border-[#d4a04f]/30 px-5 py-4 text-[#d4a04f] opacity-50"
        >
          ＋ この豆で一杯を記録
        </button>
      </KuraCard>
    </div>
  );
}
