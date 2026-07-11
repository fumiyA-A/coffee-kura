import { useEffect, useRef, useState } from "react";
import { clearAllStores } from "../db/database";
import { exportBackup, importBackup } from "../services/backupService";
import { getStorageSummary, formatBytes } from "../services/storageService";
import { KuraCard } from "../components/ui/KuraCard";
import { showToast } from "../components/ui/Toast";

export function SettingsPage() {
  const input=useRef<HTMLInputElement>(null);
  const [summary,setSummary]=useState<{beanCount:number;brewCount:number;cafeCount:number;photoCount:number;bytes:number}>();
  const [lastBackup,setLastBackup]=useState(localStorage.getItem("coffee-kura-last-backup") ?? "");

  async function reload() { setSummary(await getStorageSummary()); }
  useEffect(()=>{ void reload(); },[]);

  async function handleExport() {
    await exportBackup();
    const now=new Date().toLocaleString("ja-JP");
    localStorage.setItem("coffee-kura-last-backup",now);
    setLastBackup(now);
    showToast("バックアップを書き出しました");
  }

  return <div className="space-y-5">
    <KuraCard><h2 className="font-serif text-xl">この端末のデータ</h2>
      <p className="mt-3 leading-7 text-[#aaa198]">記録と写真は、このiPhoneのブラウザ内に保存されます。ブラウザデータを消す前にバックアップしてください。</p>
      {summary&&<dl className="mt-5 space-y-3">{[["豆",summary.beanCount],["自宅の一杯",summary.brewCount],["カフェ",summary.cafeCount],["写真",summary.photoCount],["写真容量",formatBytes(summary.bytes)]].map(([k,v])=><div key={String(k)} className="flex justify-between"><dt className="text-[#8f877f]">{k}</dt><dd>{v}</dd></div>)}</dl>}
    </KuraCard>
    <KuraCard><div className="space-y-3">
      <button onClick={()=>void handleExport()} className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">バックアップを書き出す</button>
      <button onClick={()=>input.current?.click()} className="w-full rounded-2xl border border-[#d4a04f]/40 px-5 py-4 text-[#e0ae5e]">バックアップを読み込む</button>
      <input ref={input} type="file" accept="application/json" className="hidden" onChange={(e)=>{const f=e.target.files?.[0];if(f&&window.confirm("現在のデータをバックアップ内容で置き換えますか？"))void importBackup(f).then(()=>{showToast("バックアップを読み込みました");void reload();}).catch(()=>window.alert("読み込みに失敗しました。"));}}/>
      <p className="text-sm text-[#8f877f]">最終バックアップ：{lastBackup||"未実施"}</p>
    </div></KuraCard>
    <KuraCard><button onClick={()=>{if(window.confirm("すべての記録を削除しますか？"))void clearAllStores().then(()=>{showToast("すべて削除しました");void reload();});}} className="w-full rounded-2xl border border-red-400/30 px-5 py-4 text-red-300">すべてのデータを削除</button></KuraCard>
    <p className="text-center text-xs text-[#716a64]">Coffee Kura v1.3.0</p>
  </div>;
}
