import { useState } from "react";
import { navigate } from "../app/routes";
import { saveCafeCup } from "../db/repositories/cafeRepository";
import type { CafeCup } from "../models/CafeCup";
import type { Rating, RepeatStatus } from "../models/enums";
import type { TasteValues } from "../components/forms/TasteProfileInput";
import { KuraCard } from "../components/ui/KuraCard";
import { KuraInput } from "../components/ui/KuraInput";
import { KuraTextarea } from "../components/ui/KuraTextarea";
import { PhotoInput } from "../components/forms/PhotoInput";
import { TasteProfileInput } from "../components/forms/TasteProfileInput";
import { RatingInput } from "../components/forms/RatingInput";

export function CafeFormPage() {
  const [drinkName,setDrinkName]=useState(""); const [cafeName,setCafeName]=useState(""); const [origin,setOrigin]=useState(""); const [roast,setRoast]=useState("");
  const [price,setPrice]=useState(""); const [date,setDate]=useState(new Date().toISOString().slice(0,10)); const [location,setLocation]=useState("");
  const [photo,setPhoto]=useState<Blob>(); const [taste,setTaste]=useState<TasteValues>({}); const [overall,setOverall]=useState<Rating>();
  const [repeat,setRepeat]=useState<RepeatStatus>("undecided"); const [memo,setMemo]=useState(""); const [error,setError]=useState("");

  async function save() {
    if (!drinkName.trim()) { setError("コーヒー名を入力してください。"); return; }
    const now=new Date().toISOString();
    const cup: CafeCup={ id:crypto.randomUUID(), drinkName:drinkName.trim(), cafeName:cafeName.trim()||undefined, origin:origin.trim()||undefined,
      roastLevel:roast||undefined, price:price?Number(price):undefined, date, locationName:location.trim()||undefined, photo, ...taste,
      overallRating:overall, repeatStatus:repeat, memo:memo.trim()||undefined, createdAt:now, updatedAt:now };
    await saveCafeCup(cup); navigate(`/cafe/${cup.id}`);
  }

  return <div className="space-y-5"><KuraCard><div className="space-y-5"><PhotoInput value={photo} onChange={setPhoto}/>
    <KuraInput label="コーヒー名（必須）" value={drinkName} onChange={setDrinkName} placeholder="例：本日のコーヒー"/>
    <KuraInput label="カフェ名" value={cafeName} onChange={setCafeName}/><KuraInput label="場所" value={location} onChange={setLocation}/>
    <KuraInput label="産地" value={origin} onChange={setOrigin}/><KuraInput label="日付" value={date} onChange={setDate} type="date"/>
    <KuraInput label="価格（円）" value={price} onChange={setPrice} type="number"/>
    <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">焙煎度</span><select value={roast} onChange={(e)=>setRoast(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"><option value="">未選択</option>{["浅煎り","中浅煎り","中煎り","中深煎り","深煎り"].map(x=><option key={x}>{x}</option>)}</select></label>
  </div></KuraCard>
  <KuraCard><h2 className="mb-5 font-serif text-xl">味のプロファイル</h2><TasteProfileInput value={taste} onChange={setTaste}/></KuraCard>
  <KuraCard><div className="space-y-6"><RatingInput label="総合評価" value={overall} onChange={(v)=>setOverall(v as Rating|undefined)}/>
    <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">リピート判定</span><select value={repeat} onChange={(e)=>setRepeat(e.target.value as RepeatStatus)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"><option value="undecided">保留</option><option value="want_again">また飲みたい</option><option value="maybe">気分次第</option><option value="no">飲まない</option></select></label>
    <KuraTextarea label="メモ" value={memo} onChange={setMemo}/></div></KuraCard>
  {error&&<p className="text-red-300">{error}</p>}<button onClick={()=>void save()} className="sticky bottom-3 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">保存</button></div>;
}
