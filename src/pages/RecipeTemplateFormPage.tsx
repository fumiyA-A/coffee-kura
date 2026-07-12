import { useEffect, useState } from "react";
import { clearFormDirty, setFormDirty } from "../app/navigationGuard";
import { navigate } from "../app/routes";
import { getBrew } from "../db/repositories/brewRepository";
import { getAllBrewMethods } from "../db/repositories/brewMethodRepository";
import {
  deleteBrewTemplate,
  getBrewTemplate,
  saveBrewTemplate,
} from "../db/repositories/brewTemplateRepository";
import type { BrewMethodDefinition } from "../models/BrewMethodDefinition";
import type { BrewRecipeTemplate } from "../models/BrewRecipeTemplate";
import { KuraCard } from "../components/ui/KuraCard";
import { KuraInput } from "../components/ui/KuraInput";
import { KuraTextarea } from "../components/ui/KuraTextarea";
import { BrewRatioBadge } from "../components/brews/BrewRatioBadge";
import { showToast } from "../services/toastService";
import { recipeFromBrew } from "../utils/brew";

export function RecipeTemplateFormPage({
  templateId,
  sourceBrewId,
  returnBeanId,
}: {
  templateId?: string;
  sourceBrewId?: string;
  returnBeanId?: string;
}) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState("hand_drip");
  const [beanAmount, setBeanAmount] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const [temperature, setTemperature] = useState("");
  const [time, setTime] = useState("");
  const [grind, setGrind] = useState("");
  const [memo, setMemo] = useState("");
  const [methods, setMethods] = useState<BrewMethodDefinition[]>([]);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormDirty(true);
    return () => setFormDirty(false);
  }, []);

  useEffect(() => {
    void getAllBrewMethods().then(setMethods);
  }, []);

  useEffect(() => {
    if (!templateId) return;
    void getBrewTemplate(templateId).then((template) => {
      if (!template) return;
      setName(template.name);
      setMethod(template.brewMethod);
      setBeanAmount(template.beanAmount?.toString() ?? "");
      setWaterAmount(template.waterAmount?.toString() ?? "");
      setTemperature(template.waterTemperature?.toString() ?? "");
      setTime(template.brewTimeSeconds?.toString() ?? "");
      setGrind(template.grindSize ?? "");
      setMemo(template.memo ?? "");
      setCreatedAt(template.createdAt);
    });
  }, [templateId]);

  useEffect(() => {
    if (!sourceBrewId || templateId) return;
    void getBrew(sourceBrewId).then((brew) => {
      if (!brew) return;
      const recipe = recipeFromBrew(brew);
      setName(`${new Date().toLocaleDateString("ja-JP")}のレシピ`);
      setMethod(recipe.brewMethod);
      setBeanAmount(recipe.beanAmount?.toString() ?? "");
      setWaterAmount(recipe.waterAmount?.toString() ?? "");
      setTemperature(recipe.waterTemperature?.toString() ?? "");
      setTime(recipe.brewTimeSeconds?.toString() ?? "");
      setGrind(recipe.grindSize ?? "");
      setMemo(recipe.memo ?? "");
    });
  }, [sourceBrewId, templateId]);

  async function save() {
    setError("");
    if (!name.trim()) {
      setError("テンプレート名を入力してください。");
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
      const template: BrewRecipeTemplate = {
        id: templateId ?? crypto.randomUUID(),
        name: name.trim(),
        brewMethod: method,
        beanAmount: beanAmount ? Number(beanAmount) : undefined,
        waterAmount: waterAmount ? Number(waterAmount) : undefined,
        waterTemperature: temperature ? Number(temperature) : undefined,
        brewTimeSeconds: time ? Number(time) : undefined,
        grindSize: grind.trim() || undefined,
        memo: memo.trim() || undefined,
        createdAt,
        updatedAt: new Date().toISOString(),
      };
      await saveBrewTemplate(template);
      clearFormDirty();
      showToast("テンプレートを保存しました");
      navigate(returnBeanId ? `/beans/${returnBeanId}` : "/settings/templates");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <KuraCard>
        <div className="space-y-5">
          <KuraInput label="テンプレート名" value={name} onChange={setName} placeholder="例：V60 標準" />
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">抽出方法</span>
            <select value={method} onChange={(event) => setMethod(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4">
              {methods.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <KuraInput label="豆量（g）" value={beanAmount} onChange={setBeanAmount} type="number" />
            <KuraInput label="湯量（ml）" value={waterAmount} onChange={setWaterAmount} type="number" />
          </div>
          <BrewRatioBadge beanAmount={beanAmount ? Number(beanAmount) : undefined} waterAmount={waterAmount ? Number(waterAmount) : undefined} />
          <div className="grid grid-cols-2 gap-3">
            <KuraInput label="温度（℃）" value={temperature} onChange={setTemperature} type="number" />
            <KuraInput label="時間（秒）" value={time} onChange={setTime} type="number" />
          </div>
          <KuraInput label="挽き目" value={grind} onChange={setGrind} placeholder="例：中細挽き" />
          <KuraTextarea label="レシピメモ" value={memo} onChange={setMemo} />
        </div>
      </KuraCard>
      {error && <p className="text-red-300">{error}</p>}
      <button disabled={saving} onClick={() => void save()} className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914] disabled:opacity-60">
        {saving ? "保存中..." : "テンプレートを保存"}
      </button>
      {templateId && (
        <button
          onClick={() => {
            if (window.confirm("このテンプレートを削除しますか？")) {
              void deleteBrewTemplate(templateId).then(() => {
                clearFormDirty();
                showToast("テンプレートを削除しました");
                navigate("/settings/templates");
              });
            }
          }}
          className="w-full rounded-2xl border border-red-400/30 px-5 py-4 text-red-300"
        >
          テンプレートを削除
        </button>
      )}
    </div>
  );
}
