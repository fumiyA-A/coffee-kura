import { useEffect, useRef, useState } from "react";
import { navigate } from "../app/routes";
import { clearAllStores } from "../db/database";
import { exportBackup, importBackup } from "../services/backupService";
import { getStorageSummary, formatBytes } from "../services/storageService";
import { KuraCard } from "../components/ui/KuraCard";
import { showToast } from "../services/toastService";

type Summary = Awaited<ReturnType<typeof getStorageSummary>>;

export function SettingsPage() {
  const input = useRef<HTMLInputElement>(null);
  const [summary, setSummary] = useState<Summary>();
  const [lastBackup, setLastBackup] = useState(localStorage.getItem("coffee-kura-last-backup") ?? "");

  async function reload() {
    setSummary(await getStorageSummary());
  }
  useEffect(() => {
    let active = true;
    getStorageSummary().then((value) => { if (active) setSummary(value); });
    return () => { active = false; };
  }, []);

  async function handleExport() {
    await exportBackup();
    const now = new Date().toLocaleString("ja-JP");
    localStorage.setItem("coffee-kura-last-backup", now);
    setLastBackup(now);
    showToast("バックアップを書き出しました");
  }

  return (
    <div className="space-y-5">
      <KuraCard>
        <p className="text-sm font-semibold text-[#d4a04f]">BREW LAB</p>
        <h2 className="mt-2 font-serif text-2xl">レシピを育てる</h2>
        <p className="mt-3 leading-7 text-[#aaa198]">よく使う抽出条件をテンプレート化し、器具に合わせて抽出方法を自由に管理できます。</p>
        <div className="mt-5 grid gap-3">
          <button onClick={() => navigate("/settings/templates")} className="flex items-center justify-between rounded-2xl bg-[#211e1b] px-5 py-4 text-left">
            <span><strong className="block">レシピテンプレート</strong><span className="mt-1 block text-sm text-[#8f877f]">{summary?.templateCount ?? 0}件</span></span><span className="text-[#e0ae5e]">→</span>
          </button>
          <button onClick={() => navigate("/settings/methods")} className="flex items-center justify-between rounded-2xl bg-[#211e1b] px-5 py-4 text-left">
            <span><strong className="block">抽出方法を管理</strong><span className="mt-1 block text-sm text-[#8f877f]">追加・名前変更・並べ替え</span></span><span className="text-[#e0ae5e]">→</span>
          </button>
        </div>
      </KuraCard>

      <KuraCard>
        <h2 className="font-serif text-xl">この端末のデータ</h2>
        <p className="mt-3 leading-7 text-[#aaa198]">記録と写真は、このiPhoneのブラウザ内に保存されます。ブラウザデータを消す前にバックアップしてください。</p>
        {summary && (
          <dl className="mt-5 space-y-3">
            {[
              ["豆", summary.beanCount],
              ["自宅の一杯", summary.brewCount],
              ["カフェ", summary.cafeCount],
              ["テンプレート", summary.templateCount],
              ["写真", summary.photoCount],
              ["写真容量", formatBytes(summary.bytes)],
            ].map(([key, value]) => (
              <div key={String(key)} className="flex justify-between"><dt className="text-[#8f877f]">{key}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        )}
      </KuraCard>

      <KuraCard>
        <div className="space-y-3">
          <button onClick={() => void handleExport()} className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">バックアップを書き出す</button>
          <button onClick={() => input.current?.click()} className="w-full rounded-2xl border border-[#d4a04f]/40 px-5 py-4 text-[#e0ae5e]">バックアップを読み込む</button>
          <input
            ref={input}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file && window.confirm("現在のデータをバックアップ内容で置き換えますか？")) {
                void importBackup(file)
                  .then(() => {
                    showToast("バックアップを読み込みました");
                    void reload();
                  })
                  .catch(() => window.alert("読み込みに失敗しました。"));
              }
            }}
          />
          <p className="text-sm text-[#8f877f]">最終バックアップ：{lastBackup || "未実施"}</p>
        </div>
      </KuraCard>

      <KuraCard>
        <button
          onClick={() => {
            if (window.confirm("すべての記録を削除しますか？")) {
              void clearAllStores().then(() => {
                showToast("すべて削除しました");
                void reload();
              });
            }
          }}
          className="w-full rounded-2xl border border-red-400/30 px-5 py-4 text-red-300"
        >
          すべてのデータを削除
        </button>
      </KuraCard>
      <p className="text-center text-xs text-[#716a64]">Coffee Kura v1.4.0</p>
    </div>
  );
}
