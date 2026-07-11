import { useEffect, useState } from "react";
import { navigate } from "../app/routes";
import { getBrew, saveBrew } from "../db/repositories/brewRepository";
import type { Brew } from "../models/Brew";
import type { BrewMethod, Rating, RepeatStatus } from "../models/enums";
import type { TasteValues } from "../components/forms/TasteProfileInput";
import { KuraCard } from "../components/ui/KuraCard";
import { KuraInput } from "../components/ui/KuraInput";
import { KuraTextarea } from "../components/ui/KuraTextarea";
import { PhotoInput } from "../components/forms/PhotoInput";
import { TasteProfileInput } from "../components/forms/TasteProfileInput";
import { RatingInput } from "../components/forms/RatingInput";
import { DateInput } from "../components/forms/DateInput";
import { normalizePhotos } from "../services/imageService";
import { slashDateToIso, todaySlash, toSlashDate } from "../utils/date";

export function BrewFormPage({ beanId, brewId }: { beanId: string; brewId?: string }) {
  const [date,setDate]=useState(todaySlash()); const [method,setMethod]=useState<BrewMethod>("hand_drip");
  const [beanAmount,setBeanAmount]=useState(""); const [waterAmount,setWaterAmount]=useState(""); const [temperature,setTemperature]=useState("");
  const [time,setTime]=useState(""); const [grind,setGrind]=useState(""); const [photos,setPhotos]=useState<Blob[]>([]);
  const [taste,setTaste]=useState<TasteValues>({}); const [overall,setOverall]=useState<Rating>(); const [repeat,setRepeat]=useState<RepeatStatus>("undecided");
  const [memo,setMemo]=useState(""); const [saving,setSaving]=useState(false); const [error,setError]=useState("");
  const [createdAt,setCreatedAt]=useState(new Date().toISOString());

  useEffect(() => {
    if (!brewId) return;
    void getBrew(brewId).then((brew) => {
      if (!brew) return;
      setDate(toSlashDate(brew.date)); setMethod(brew.brewMethod);
      setBeanAmount(brew.beanAmount?.toString() ?? ""); setWaterAmount(brew.waterAmount?.toString() ?? "");
      setTemperature(brew.waterTemperature?.toString() ?? ""); setTime(brew.brewTimeSeconds?.toString() ?? "");
      setGrind(brew.grindSize ?? ""); setPhotos(normalizePhotos(brew));
      setTaste({ acidity:brew.acidity, bitterness:brew.bitterness, sweetness:brew.sweetness, body:brew.body, aroma:brew.aroma });
      setOverall(brew.overallRating); setRepeat(brew.repeatStatus ?? "undecided"); setMemo(brew.memo ?? "");
      setCreatedAt(brew.createdAt);
    });
  }, [brewId]);

  async function save() {
    const iso = slashDateToIso(date);
    if (!iso) { setError("日付はYYYY/MM/DD形式で入力してください。"); return; }
    setSaving(true); const now=new Date().toISOString();
    const brew: Brew={ id:brewId ?? crypto.randomUUID(), beanId, date:iso, brewMethod:method,
      beanAmount:beanAmount?Number(beanAmount):undefined, waterAmount:waterAmount?Number(waterAmount):undefined,
      waterTemperature:temperature?Number(temperature):undefined, brewTimeSeconds:time?Number(time):undefined,
      grindSize:grind.trim()||undefined, photos, ...taste, overallRating:overall, repeatStatus:repeat,
      memo:memo.trim()||undefined, createdAt, updatedAt:now };
    await saveBrew(brew); navigate(`/beans/${beanId}`);
  }

  return <div className="space-y-5">
    <KuraCard><div className="space-y-5"><PhotoInput value={photos} onChange={setPhotos}/><DateInput value={date} onChange={setDate}/>
      <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">抽出方法</span>
        <select value={method} onChange={(e)=>setMethod(e.target.value as BrewMethod)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4">
          <option value="hand_drip">ハンドドリップ</option><option value="cold_brew">水出し</option><option value="espresso">エスプレッソ</option><option value="other">その他</option>
        </select></label>
      <div className="grid grid-cols-2 gap-3"><KuraInput label="豆量（g）" value={beanAmount} onChange={setBeanAmount} type="number"/><KuraInput label="湯量（ml）" value={waterAmount} onChange={setWaterAmount} type="number"/></div>
      <div className="grid grid-cols-2 gap-3"><KuraInput label="温度（℃）" value={temperature} onChange={setTemperature} type="number"/><KuraInput label="時間（秒）" value={time} onChange={setTime} type="number"/></div>
      <KuraInput label="挽き目" value={grind} onChange={setGrind} placeholder="例：中細挽き"/>
    </div></KuraCard>
    <KuraCard><h2 className="mb-5 font-serif text-xl">味のプロファイル</h2><TasteProfileInput value={taste} onChange={setTaste}/></KuraCard>
    <KuraCard><div className="space-y-6"><RatingInput label="総合評価" value={overall} onChange={(v)=>setOverall(v as Rating|undefined)}/>
      <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">リピート判定</span><select value={repeat} onChange={(e)=>setRepeat(e.target.value as RepeatStatus)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"><option value="undecided">保留</option><option value="want_again">また飲みたい</option><option value="maybe">気分次第</option><option value="no">飲まない</option></select></label>
      <KuraTextarea label="メモ" value={memo} onChange={setMemo}/></div></KuraCard>
    {error&&<p className="text-red-300">{error}</p>}
    <button disabled={saving} onClick={()=>void save()} className="sticky bottom-3 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">{saving?"保存中...":"保存"}</button>
  </div>;
}
