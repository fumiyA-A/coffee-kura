import { useEffect, useState } from "react";
import { navigate } from "../app/routes";
import { clearFormDirty, setFormDirty } from "../app/navigationGuard";
import { deleteBrew, getBrew, saveBrew } from "../db/repositories/brewRepository";
import { getAllBrewMethods } from "../db/repositories/brewMethodRepository";
import { getAllBrewTemplates } from "../db/repositories/brewTemplateRepository";
import type { Brew } from "../models/Brew";
import type { BrewMethodDefinition } from "../models/BrewMethodDefinition";
import type { BrewRecipeTemplate } from "../models/BrewRecipeTemplate";
import type { BrewMethod, Rating, RepeatStatus } from "../models/enums";
import type { TasteValues } from "../components/forms/TasteProfileInput";
import { KuraCard } from "../components/ui/KuraCard";
import { KuraInput } from "../components/ui/KuraInput";
import { KuraTextarea } from "../components/ui/KuraTextarea";
import { PhotoInput } from "../components/forms/PhotoInput";
import { TasteProfileInput } from "../components/forms/TasteProfileInput";
import { RatingInput } from "../components/forms/RatingInput";
import { DateInput } from "../components/forms/DateInput";
import { BrewRatioBadge } from "../components/brews/BrewRatioBadge";
import { normalizePhotos } from "../services/imageService";
import { showToast } from "../services/toastService";
import { recipeFromBrew, recipeFromTemplate, type BrewRecipeValues } from "../utils/brew";

export function BrewFormPage({
  beanId,
  brewId,
  sourceBrewId,
}: {
  beanId: string;
  brewId?: string;
  sourceBrewId?: string;
}) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [method, setMethod] = useState<BrewMethod>("hand_drip");
  const [beanAmount, setBeanAmount] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const [temperature, setTemperature] = useState("");
  const [time, setTime] = useState("");
  const [grind, setGrind] = useState("");
  const [photos, setPhotos] = useState<Blob[]>([]);
  const [taste, setTaste] = useState<TasteValues>({});
  const [overall, setOverall] = useState<Rating>();
  const [repeat, setRepeat] = useState<RepeatStatus>("undecided");
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [methods, setMethods] = useState<BrewMethodDefinition[]>([]);
  const [templates, setTemplates] = useState<BrewRecipeTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFormDirty(true);
    return () => setFormDirty(false);
  }, []);

  useEffect(() => {
    void Promise.all([getAllBrewMethods(), getAllBrewTemplates()]).then(
      ([loadedMethods, loadedTemplates]) => {
        setMethods(loadedMethods);
        setTemplates(loadedTemplates);
      },
    );
  }, []);

  function applyRecipe(recipe: BrewRecipeValues) {
    setMethod(recipe.brewMethod);
    setBeanAmount(recipe.beanAmount?.toString() ?? "");
    setWaterAmount(recipe.waterAmount?.toString() ?? "");
    setTemperature(recipe.waterTemperature?.toString() ?? "");
    setTime(recipe.brewTimeSeconds?.toString() ?? "");
    setGrind(recipe.grindSize ?? "");
    setMemo(recipe.memo ?? "");
  }

  useEffect(() => {
    if (!brewId) return;
    void getBrew(brewId).then((brew) => {
      if (!brew) return;
      setDate(brew.date);
      setMethod(brew.brewMethod);
      setBeanAmount(brew.beanAmount?.toString() ?? "");
      setWaterAmount(brew.waterAmount?.toString() ?? "");
      setTemperature(brew.waterTemperature?.toString() ?? "");
      setTime(brew.brewTimeSeconds?.toString() ?? "");
      setGrind(brew.grindSize ?? "");
      setPhotos(normalizePhotos(brew));
      setTaste({
        acidity: brew.acidity,
        bitterness: brew.bitterness,
        sweetness: brew.sweetness,
        body: brew.body,
        aroma: brew.aroma,
      });
      setOverall(brew.overallRating);
      setRepeat(brew.repeatStatus ?? "undecided");
      setMemo(brew.memo ?? "");
      setCreatedAt(brew.createdAt);
    });
  }, [brewId]);

  useEffect(() => {
    if (!sourceBrewId || brewId) return;
    void getBrew(sourceBrewId).then((source) => {
      if (!source) return;
      applyRecipe(recipeFromBrew(source));
      setCopied(true);
    });
  }, [sourceBrewId, brewId]);

  function selectTemplate(id: string) {
    setSelectedTemplate(id);
    const template = templates.find((item) => item.id === id);
    if (template) applyRecipe(recipeFromTemplate(template));
  }

  async function save() {
    setError("");
    if (!date) {
      setError("日付を選択してください。");
      return;
    }
    for (const [label, value] of [
      ["豆量", beanAmount],
      ["湯量", waterAmount],
      ["温度", temperature],
      ["時間", time],
    ] as const) {
      if (value && Number(value) < 0) {
        setError(`${label}は0以上で入力してください。`);
        return;
      }
    }
    setSaving(true);
    try {
      const now = new Date().toISOString();
      const brew: Brew = {
        id: brewId ?? crypto.randomUUID(),
        beanId,
        date,
        brewMethod: method,
        beanAmount: beanAmount ? Number(beanAmount) : undefined,
        waterAmount: waterAmount ? Number(waterAmount) : undefined,
        waterTemperature: temperature ? Number(temperature) : undefined,
        brewTimeSeconds: time ? Number(time) : undefined,
        grindSize: grind.trim() || undefined,
        photos,
        ...taste,
        overallRating: overall,
        repeatStatus: repeat,
        memo: memo.trim() || undefined,
        createdAt,
        updatedAt: now,
      };
      await saveBrew(brew);
      clearFormDirty();
      showToast("一杯の記録を保存しました");
      navigate(`/beans/${beanId}`);
    } finally {
      setSaving(false);
    }
  }

  const beanAmountNumber = beanAmount ? Number(beanAmount) : undefined;
  const waterAmountNumber = waterAmount ? Number(waterAmount) : undefined;

  return (
    <div className="space-y-5">
      {(copied || templates.length > 0) && (
        <KuraCard>
          <div className="space-y-4">
            {copied && (
              <p className="rounded-2xl bg-[#d4a04f]/10 px-4 py-3 text-sm text-[#e0ae5e]">
                過去の一杯からレシピを複製しました。日付と評価は新しく記録できます。
              </p>
            )}
            {templates.length > 0 && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">レシピテンプレート</span>
                <select
                  value={selectedTemplate}
                  onChange={(event) => selectTemplate(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"
                >
                  <option value="">テンプレートを選択</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </KuraCard>
      )}

      <KuraCard>
        <div className="space-y-5">
          <PhotoInput value={photos} onChange={setPhotos} />
          <DateInput value={date} onChange={setDate} />
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">抽出方法</span>
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"
            >
              {methods.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <KuraInput label="豆量（g）" value={beanAmount} onChange={setBeanAmount} type="number" />
            <KuraInput label="湯量（ml）" value={waterAmount} onChange={setWaterAmount} type="number" />
          </div>
          <BrewRatioBadge beanAmount={beanAmountNumber} waterAmount={waterAmountNumber} />
          <div className="grid grid-cols-2 gap-3">
            <KuraInput label="温度（℃）" value={temperature} onChange={setTemperature} type="number" />
            <KuraInput label="時間（秒）" value={time} onChange={setTime} type="number" />
          </div>
          <KuraInput label="挽き目" value={grind} onChange={setGrind} placeholder="例：中細挽き" />
        </div>
      </KuraCard>

      <KuraCard>
        <h2 className="mb-5 font-serif text-xl">味のプロファイル</h2>
        <TasteProfileInput value={taste} onChange={setTaste} />
      </KuraCard>

      <KuraCard>
        <div className="space-y-6">
          <RatingInput label="総合評価" value={overall} onChange={(value) => setOverall(value as Rating | undefined)} />
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">リピート判定</span>
            <select
              value={repeat}
              onChange={(event) => setRepeat(event.target.value as RepeatStatus)}
              className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"
            >
              <option value="undecided">保留</option>
              <option value="want_again">また飲みたい</option>
              <option value="maybe">気分次第</option>
              <option value="no">飲まない</option>
            </select>
          </label>
          <KuraTextarea label="メモ" value={memo} onChange={setMemo} />
        </div>
      </KuraCard>

      {error && <p className="text-red-300">{error}</p>}
      <button
        disabled={saving}
        onClick={() => void save()}
        className="sticky bottom-3 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914] disabled:opacity-60"
      >
        {saving ? "保存中..." : "保存"}
      </button>
      {brewId && (
        <button
          type="button"
          onClick={() => {
            if (window.confirm("この一杯の記録を削除しますか？")) {
              void deleteBrew(brewId).then(() => {
                clearFormDirty();
                showToast("一杯の記録を削除しました");
                navigate(`/beans/${beanId}`);
              });
            }
          }}
          className="w-full rounded-2xl border border-red-400/30 px-5 py-4 text-red-300"
        >
          この一杯の記録を削除
        </button>
      )}
    </div>
  );
}
