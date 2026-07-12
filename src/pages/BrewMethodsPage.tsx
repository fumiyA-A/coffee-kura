import { useCallback, useState } from "react";
import {
  createBrewMethod,
  deleteBrewMethod,
  getAllBrewMethods,
  saveBrewMethod,
  saveBrewMethodOrder,
} from "../db/repositories/brewMethodRepository";
import { getAllBrewTemplates } from "../db/repositories/brewTemplateRepository";
import { getAllBrews } from "../db/repositories/brewRepository";
import type { BrewMethodDefinition } from "../models/BrewMethodDefinition";
import { useData } from "../hooks/useData";
import { KuraCard } from "../components/ui/KuraCard";
import { showToast } from "../services/toastService";

export function BrewMethodsPage() {
  const loader = useCallback(async () => ({
    methods: await getAllBrewMethods(),
    brews: await getAllBrews(),
    templates: await getAllBrewTemplates(),
  }), []);
  const { data, loading, reload } = useData(loader);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  if (loading || !data) return <p className="text-center text-[#aaa198]">読み込み中...</p>;
  const loadedData = data;

  async function add() {
    const name = newName.trim();
    if (!name) return;
    await createBrewMethod(name);
    setNewName("");
    showToast("抽出方法を追加しました");
    await reload();
  }

  async function rename(method: BrewMethodDefinition, name: string) {
    const trimmed = name.trim();
    if (!trimmed || trimmed === method.name) return;
    await saveBrewMethod({ ...method, name: trimmed, updatedAt: new Date().toISOString() });
    showToast("抽出方法を更新しました");
    await reload();
  }

  async function move(index: number, direction: -1 | 1) {
    const next = [...loadedData.methods];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    await saveBrewMethodOrder(next);
    await reload();
  }

  async function remove(method: BrewMethodDefinition) {
    const brewCount = loadedData.brews.filter((brew) => brew.brewMethod === method.id).length;
    const templateCount = loadedData.templates.filter((template) => template.brewMethod === method.id).length;
    if (brewCount || templateCount) {
      setError(`「${method.name}」は一杯${brewCount}件・テンプレート${templateCount}件で使用中のため削除できません。`);
      return;
    }
    if (!window.confirm(`「${method.name}」を削除しますか？`)) return;
    await deleteBrewMethod(method.id);
    showToast("抽出方法を削除しました");
    setError("");
    await reload();
  }

  return (
    <div className="space-y-5">
      <KuraCard>
        <h2 className="font-serif text-xl">抽出方法を追加</h2>
        <div className="mt-4 flex gap-2">
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="例：ORIGAMI"
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-3 outline-none focus:border-[#d4a04f]/70"
          />
          <button onClick={() => void add()} className="shrink-0 rounded-2xl bg-[#d4a04f] px-5 py-3 font-semibold text-[#1e1914]">追加</button>
        </div>
      </KuraCard>

      {error && <p className="rounded-2xl bg-red-400/10 p-4 text-sm text-red-300">{error}</p>}

      <KuraCard>
        <h2 className="font-serif text-xl">表示順と名前</h2>
        <p className="mt-2 text-sm text-[#8f877f]">名前は入力欄から編集できます。標準項目は削除できません。</p>
        <div className="mt-5 space-y-3">
          {loadedData.methods.map((method, index) => (
            <div key={method.id} className="rounded-2xl bg-[#211e1b] p-3">
              <div className="flex items-center gap-2">
                <input
                  key={`${method.id}-${method.updatedAt}`}
                  defaultValue={method.name}
                  onBlur={(event) => void rename(method, event.target.value)}
                  className="min-w-0 flex-1 rounded-xl border border-white/5 bg-[#171513] px-3 py-3 outline-none focus:border-[#d4a04f]/70"
                />
                <button disabled={index === 0} onClick={() => void move(index, -1)} className="h-11 w-11 rounded-xl border border-white/10 disabled:opacity-25" aria-label="上へ">↑</button>
                <button disabled={index === loadedData.methods.length - 1} onClick={() => void move(index, 1)} className="h-11 w-11 rounded-xl border border-white/10 disabled:opacity-25" aria-label="下へ">↓</button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-[#716a64]">{method.isBuiltIn ? "標準" : "カスタム"}</span>
                {!method.isBuiltIn && (
                  <button onClick={() => void remove(method)} className="text-xs text-red-300">削除</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </KuraCard>
    </div>
  );
}
