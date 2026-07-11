import { useRef, useState } from "react";
import { clearAllStores } from "../db/database";
import { exportBackup, importBackup } from "../services/backupService";
import { KuraCard } from "../components/ui/KuraCard";

export function SettingsPage() {
  const input=useRef<HTMLInputElement>(null); const [message,setMessage]=useState("");
  return <div className="space-y-5"><KuraCard><h2 className="font-serif text-xl">この端末のデータ</h2><p className="mt-3 leading-7 text-[#aaa198]">記録と写真は、このiPhoneのブラウザ内に保存されます。ブラウザデータを消す前にバックアップしてください。</p></KuraCard>
    <KuraCard><div className="space-y-3"><button onClick={()=>void exportBackup()} className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">バックアップを書き出す</button>
      <button onClick={()=>input.current?.click()} className="w-full rounded-2xl border border-[#d4a04f]/40 px-5 py-4 text-[#e0ae5e]">バックアップを読み込む</button>
      <input ref={input} type="file" accept="application/json" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) void importBackup(f).then(()=>setMessage("読み込みました。アプリを再読み込みしてください。")).catch(()=>setMessage("読み込みに失敗しました。")); }}/>
    </div></KuraCard>
    <KuraCard><button onClick={()=>{ if(window.confirm("すべての記録を削除しますか？")) void clearAllStores().then(()=>setMessage("すべて削除しました。")); }} className="w-full rounded-2xl border border-red-400/30 px-5 py-4 text-red-300">すべてのデータを削除</button></KuraCard>
    {message&&<p className="rounded-2xl bg-white/5 p-4 text-[#cfc6bd]">{message}</p>}
    <p className="text-center text-xs text-[#716a64]">Coffee Kura v1.0.0</p>
  </div>;
}
