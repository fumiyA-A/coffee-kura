import { useEffect, useState } from "react";
import { navigate } from "../app/routes";
import { getCafeCup, saveCafeCup } from "../db/repositories/cafeRepository";
import { findOrCreateCafe, getAllCafes } from "../db/repositories/cafeShopRepository";
import type { CafeCup } from "../models/CafeCup";
import type { Rating, RepeatStatus } from "../models/enums";
import type { TasteValues } from "../components/forms/TasteProfileInput";
import type { OriginValue } from "../components/forms/OriginInput";
import { KuraCard } from "../components/ui/KuraCard";
import { KuraInput } from "../components/ui/KuraInput";
import { KuraTextarea } from "../components/ui/KuraTextarea";
import { PhotoInput } from "../components/forms/PhotoInput";
import { TasteProfileInput } from "../components/forms/TasteProfileInput";
import { RatingInput } from "../components/forms/RatingInput";
import { OriginInput } from "../components/forms/OriginInput";
import { DateInput } from "../components/forms/DateInput";
import { normalizePhotos } from "../services/imageService";
import { slashDateToIso, todaySlash, toSlashDate } from "../utils/date";

export function CafeFormPage({ cafeCupId }: { cafeCupId?: string }) {
  const [drinkName,setDrinkName]=useState(""); const [cafes,setCafes]=useState<Array<{id:string;name:string;locationName?:string}>>([]);
  const [selectedCafeId,setSelectedCafeId]=useState(""); const [newCafeName,setNewCafeName]=useState("");
  const [location,setLocation]=useState(""); const [origin,setOrigin]=useState<OriginValue>({originType:"unknown",origins:[],originDetail:""});
  const [roast,setRoast]=useState(""); const [price,setPrice]=useState(""); const [date,setDate]=useState(todaySlash());
  const [photos,setPhotos]=useState<Blob[]>([]); const [taste,setTaste]=useState<TasteValues>({}); const [overall,setOverall]=useState<Rating>();
  const [repeat,setRepeat]=useState<RepeatStatus>("undecided"); const [memo,setMemo]=useState(""); const [error,setError]=useState("");
  const [createdAt,setCreatedAt]=useState(new Date().toISOString());

  useEffect(()=>{ void getAllCafes().then(setCafes); },[]);
  useEffect(()=>{
    if(!cafeCupId) return;
    void getCafeCup(cafeCupId).then((cup)=>{
      if(!cup) return;
      setDrinkName(cup.drinkName); setSelectedCafeId(cup.cafeId ?? "");
      if (!cup.cafeId && cup.cafeName) setNewCafeName(cup.cafeName);
      setLocation(cup.locationName ?? ""); setOrigin({
        originType:cup.originType ?? (cup.origin ? "single":"unknown"),
        origins:cup.origins?.length ? cup.origins : cup.origin ? [cup.origin] : [],
        originDetail:cup.originDetail ?? "",
      });
      setRoast(cup.roastLevel ?? ""); setPrice(cup.price?.toString() ?? ""); setDate(toSlashDate(cup.date));
      setPhotos(normalizePhotos(cup)); setTaste({acidity:cup.acidity,bitterness:cup.bitterness,sweetness:cup.sweetness,body:cup.body,aroma:cup.aroma});
      setOverall(cup.overallRating); setRepeat(cup.repeatStatus ?? "undecided"); setMemo(cup.memo ?? ""); setCreatedAt(cup.createdAt);
    });
  },[cafeCupId]);

  async function save() {
    if (!drinkName.trim()) { setError("コーヒー名を入力してください。"); return; }
    const iso=slashDateToIso(date); if(!iso){setError("日付はYYYY/MM/DD形式で入力してください。");return;}
    let cafeId=selectedCafeId||undefined; let cafeName:string|undefined;
    if(selectedCafeId){
      cafeName=cafes.find(c=>c.id===selectedCafeId)?.name;
    } else if(newCafeName.trim()){
      const cafe=await findOrCreateCafe(newCafeName,location); cafeId=cafe.id; cafeName=cafe.name;
    }
    const now=new Date().toISOString();
    const cup:CafeCup={id:cafeCupId??crypto.randomUUID(),cafeId,cafeName,drinkName:drinkName.trim(),
      originType:origin.originType,origins:origin.origins,originDetail:origin.originDetail.trim()||undefined,
      roastLevel:roast||undefined,price:price?Number(price):undefined,date:iso,locationName:location.trim()||undefined,
      photos,...taste,overallRating:overall,repeatStatus:repeat,memo:memo.trim()||undefined,createdAt,updatedAt:now};
    await saveCafeCup(cup); navigate(`/cafe/${cup.id}`);
  }

  return <div className="space-y-5"><KuraCard><div className="space-y-5">
    <PhotoInput value={photos} onChange={setPhotos}/>
    <KuraInput label="コーヒー名（必須）" value={drinkName} onChange={setDrinkName} placeholder="例：本日のコーヒー"/>
    <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">お店</span>
      <select value={selectedCafeId} onChange={(e)=>{setSelectedCafeId(e.target.value); if(e.target.value)setNewCafeName("");}} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4">
        <option value="">新しいお店を入力</option>{cafes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select></label>
    {!selectedCafeId&&<KuraInput label="新しいお店の名前" value={newCafeName} onChange={setNewCafeName} placeholder="一度保存すると次回から選べます"/>}
    <KuraInput label="場所" value={location} onChange={setLocation} placeholder="例：大阪・梅田"/>
    <OriginInput value={origin} onChange={setOrigin}/>
    <DateInput value={date} onChange={setDate}/>
    <KuraInput label="価格（円）" value={price} onChange={setPrice} type="number"/>
    <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">焙煎度</span><select value={roast} onChange={(e)=>setRoast(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"><option value="">未選択</option>{["浅煎り","中浅煎り","中煎り","中深煎り","深煎り"].map(x=><option key={x}>{x}</option>)}</select></label>
  </div></KuraCard>
  <KuraCard><h2 className="mb-5 font-serif text-xl">味のプロファイル</h2><TasteProfileInput value={taste} onChange={setTaste}/></KuraCard>
  <KuraCard><div className="space-y-6"><RatingInput label="総合評価" value={overall} onChange={(v)=>setOverall(v as Rating|undefined)}/>
    <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">リピート判定</span><select value={repeat} onChange={(e)=>setRepeat(e.target.value as RepeatStatus)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"><option value="undecided">保留</option><option value="want_again">また飲みたい</option><option value="maybe">気分次第</option><option value="no">飲まない</option></select></label>
    <KuraTextarea label="メモ" value={memo} onChange={setMemo}/></div></KuraCard>
  {error&&<p className="text-red-300">{error}</p>}<button onClick={()=>void save()} className="sticky bottom-3 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]">保存</button></div>;
}
