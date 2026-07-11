import { useState } from "react";
import { navigate } from "../app/routes";
import { PhotoInput } from "../components/forms/PhotoInput";
import { RatingInput } from "../components/forms/RatingInput";
import { KuraCard } from "../components/ui/KuraCard";
import { KuraInput } from "../components/ui/KuraInput";
import { KuraTextarea } from "../components/ui/KuraTextarea";
import { saveBean } from "../db/repositories/beanRepository";
import type { Bean } from "../models/Bean";
import type { Rating, RepeatStatus } from "../models/enums";

export function BeanFormPage() {
  const [name, setName] = useState("");
  const [roaster, setRoaster] = useState("");
  const [origin, setOrigin] = useState("");
  const [roastLevel, setRoastLevel] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState<Blob>();
  const [overallRating, setOverallRating] = useState<Rating>();
  const [repeatStatus, setRepeatStatus] =
    useState<RepeatStatus>("undecided");
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("豆の名前を入力してください。");
      return;
    }

    setSaving(true);
    setError("");

    const now = new Date().toISOString();
    const bean: Bean = {
      id: crypto.randomUUID(),
      name: trimmedName,
      roaster: roaster.trim() || undefined,
      origin: origin.trim() || undefined,
      roastLevel: roastLevel || undefined,
      price: price ? Number(price) : undefined,
      weight: weight ? Number(weight) : undefined,
      photo,
      overallRating,
      repeatStatus,
      memo: memo.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await saveBean(bean);
      navigate(`/beans/${bean.id}`);
    } catch {
      setError("保存に失敗しました。もう一度お試しください。");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <KuraCard>
        <div className="space-y-5">
          <PhotoInput value={photo} onChange={setPhoto} />
          <KuraInput
            label="豆の名前（必須）"
            value={name}
            onChange={setName}
            placeholder="例：マンデリン ブルー・アチェ"
          />
          <KuraInput
            label="ロースター"
            value={roaster}
            onChange={setRoaster}
            placeholder="例：HIRO"
          />
          <KuraInput
            label="産地"
            value={origin}
            onChange={setOrigin}
            placeholder="例：インドネシア マンデリン"
          />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
              焙煎度
            </span>
            <select
              value={roastLevel}
              onChange={(event) => setRoastLevel(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 text-[#f5efe7] outline-none focus:border-[#d4a04f]/70"
            >
              <option value="">未選択</option>
              <option value="浅煎り">浅煎り</option>
              <option value="中浅煎り">中浅煎り</option>
              <option value="中煎り">中煎り</option>
              <option value="中深煎り">中深煎り</option>
              <option value="深煎り">深煎り</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <KuraInput
              label="価格（円）"
              value={price}
              onChange={setPrice}
              placeholder="1200"
              type="number"
            />
            <KuraInput
              label="内容量（g）"
              value={weight}
              onChange={setWeight}
              placeholder="100"
              type="number"
            />
          </div>
        </div>
      </KuraCard>

      <KuraCard>
        <div className="space-y-6">
          <RatingInput
            label="総合評価"
            value={overallRating}
            onChange={(value) => setOverallRating(value as Rating | undefined)}
          />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
              リピート判定
            </span>
            <select
              value={repeatStatus}
              onChange={(event) =>
                setRepeatStatus(event.target.value as RepeatStatus)
              }
              className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 text-[#f5efe7] outline-none focus:border-[#d4a04f]/70"
            >
              <option value="undecided">保留</option>
              <option value="want_again">また買いたい</option>
              <option value="maybe">気分次第</option>
              <option value="no">買わない</option>
            </select>
          </label>

          <KuraTextarea
            label="メモ"
            value={memo}
            onChange={setMemo}
            placeholder="味の印象や、次回試したい淹れ方など"
          />
        </div>
      </KuraCard>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <button
        type="button"
        onClick={() => void handleSave()}
        disabled={saving}
        className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914] disabled:opacity-50"
      >
        {saving ? "保存中..." : "豆カードを保存"}
      </button>
    </div>
  );
}
