import { useCallback } from "react";
import { navigate } from "../app/routes";
import { deleteBean, getBean } from "../db/repositories/beanRepository";
import { deleteBrewsByBean, getBrewsByBean } from "../db/repositories/brewRepository";
import { getAllBrewMethods } from "../db/repositories/brewMethodRepository";
import { useData } from "../hooks/useData";
import { KuraCard } from "../components/ui/KuraCard";
import { ConfirmButton } from "../components/ui/ConfirmButton";
import { PhotoGallery } from "../components/ui/PhotoGallery";
import { BrewCard } from "../components/brews/BrewCard";
import { BrewStats } from "../components/brews/BrewStats";
import { BrewComparison } from "../components/brews/BrewComparison";
import { normalizePhotos } from "../services/imageService";
import { getBrewMethodLabel } from "../constants/brewMethods";
import { toSlashDate } from "../utils/date";

function originLabel(bean: NonNullable<Awaited<ReturnType<typeof getBean>>>) {
  if (bean.originType === "blend") return `ブレンド：${bean.origins?.join("・") || "詳細未入力"}`;
  return bean.origins?.[0] ?? bean.origin;
}

export function BeanDetailPage({ beanId }: { beanId: string }) {
  const loader = useCallback(async () => ({
    bean: await getBean(beanId),
    brews: await getBrewsByBean(beanId),
    methods: await getAllBrewMethods(),
  }), [beanId]);
  const { data, loading } = useData(loader);

  if (loading || !data) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  const { bean, brews, methods } = data;
  if (!bean) return <p className="text-center">豆カードが見つかりません。</p>;

  const pairs = [
    ["産地", originLabel(bean)],
    ["産地詳細", bean.originDetail],
    ["焙煎度", bean.roastLevel],
    ["精製方法", bean.process],
    ["品種", bean.variety],
    ["購入日", toSlashDate(bean.purchaseDate)],
    ["価格", bean.price !== undefined ? `¥${bean.price}` : undefined],
    ["内容量", bean.weight !== undefined ? `${bean.weight}g` : undefined],
  ];

  return (
    <div className="space-y-5">
      <PhotoGallery photos={normalizePhotos(bean)} alt={bean.name} />
      <KuraCard>
        <div className="flex justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl">{bean.name}</h2>
            <p className="mt-2 text-[#aaa198]">{bean.roaster || "ロースター未入力"}</p>
          </div>
          {bean.favorite && <span className="text-3xl text-[#e0aa53]">♥</span>}
        </div>
        <dl className="mt-6 space-y-3">
          {pairs.filter(([, value]) => value).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4">
              <dt className="text-[#8f877f]">{key}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xl text-[#e0aa53]">
          {bean.overallRating ? "★".repeat(bean.overallRating) + "☆".repeat(5 - bean.overallRating) : "未評価"}
        </p>
        <button onClick={() => navigate(`/beans/${bean.id}/edit`)} className="mt-5 w-full rounded-2xl border border-[#d4a04f]/40 px-5 py-4 text-[#e0ae5e]">編集</button>
      </KuraCard>

      {bean.memo && (
        <KuraCard>
          <h3 className="font-serif text-xl">メモ</h3>
          <p className="mt-3 whitespace-pre-wrap leading-7 text-[#aaa198]">{bean.memo}</p>
        </KuraCard>
      )}

      {brews.length > 0 && (
        <KuraCard>
          <h3 className="font-serif text-xl">評価の変化</h3>
          <div className="mt-5"><BrewStats brews={brews} /></div>
        </KuraCard>
      )}

      {brews.length >= 2 && (
        <KuraCard>
          <h3 className="font-serif text-xl">レシピ比較</h3>
          <p className="mt-2 text-sm text-[#8f877f]">新しい4件を横に比較できます。表は左右にスクロールできます。</p>
          <div className="mt-5"><BrewComparison brews={brews} methods={methods} /></div>
        </KuraCard>
      )}

      <KuraCard>
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl">この豆で淹れた一杯</h3>
          <span className="text-[#8f877f]">{brews.length}件</span>
        </div>
        <button onClick={() => navigate(`/beans/${bean.id}/brews/new`)} className="mt-5 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">＋ 一杯を記録</button>
        <div className="mt-4 space-y-3">
          {brews.length ? brews.map((brew) => (
            <BrewCard
              key={brew.id}
              brew={brew}
              methodLabel={getBrewMethodLabel(brew.brewMethod, methods)}
              onDuplicate={() => navigate(`/beans/${bean.id}/brews/new/copy/${brew.id}`)}
              onSaveTemplate={() => navigate(`/beans/${bean.id}/brews/${brew.id}/template`)}
              onEdit={() => navigate(`/beans/${bean.id}/brews/${brew.id}`)}
            />
          )) : <p className="text-[#aaa198]">まだ記録がありません。</p>}
        </div>
      </KuraCard>

      <ConfirmButton
        label={`豆カードと紐づく${brews.length}件の一杯を削除`}
        onConfirm={() => void deleteBrewsByBean(bean.id).then(() => deleteBean(bean.id)).then(() => navigate("/beans"))}
      />
    </div>
  );
}
