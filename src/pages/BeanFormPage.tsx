import { useEffect, useState } from "react";
import { navigate } from "../app/routes";
import { getBean, saveBean } from "../db/repositories/beanRepository";
import type { Bean } from "../models/Bean";
import type { Rating, RepeatStatus } from "../models/enums";
import type { TasteValues } from "../components/forms/TasteProfileInput";
import type { OriginValue } from "../components/forms/OriginInput";
import { normalizePhotos } from "../services/imageService";
import { KuraCard } from "../components/ui/KuraCard";
import { KuraInput } from "../components/ui/KuraInput";
import { KuraTextarea } from "../components/ui/KuraTextarea";
import { PhotoInput } from "../components/forms/PhotoInput";
import { RatingInput } from "../components/forms/RatingInput";
import { TasteProfileInput } from "../components/forms/TasteProfileInput";
import { OriginInput } from "../components/forms/OriginInput";
import { DateInput } from "../components/forms/DateInput";
import { slashDateToIso, toSlashDate } from "../utils/date";

export function BeanFormPage({ beanId }: { beanId?: string }) {
  const [name,setName]=useState(""); const [roaster,setRoaster]=useState("");
  const [origin,setOrigin]=useState<OriginValue>({ originType:"single", origins:[], originDetail:"" });
  const [roastLevel,setRoastLevel]=useState(""); const [process,setProcess]=useState(""); const [variety,setVariety]=useState("");
  const [purchaseDate,setPurchaseDate]=useState(""); const [price,setPrice]=useState(""); const [weight,setWeight]=useState("");
  const [isGround,setIsGround]=useState(false); const [photos,setPhotos]=useState<Blob[]>([]); const [taste,setTaste]=useState<TasteValues>({});
  const [overall,setOverall]=useState<Rating>(); const [repeat,setRepeat]=useState<RepeatStatus>("undecided");
  const [favorite,setFavorite]=useState(false); const [memo,setMemo]=useState(""); const [error,setError]=useState(""); const [saving,setSaving]=useState(false);
  const [createdAt,setCreatedAt]=useState(new Date().toISOString());

  useEffect(() => {
    if (!beanId) return;
    void getBean(beanId).then((b) => {
      if (!b) return;
      setName(b.name); setRoaster(b.roaster ?? "");
      setOrigin({
        originType: b.originType ?? (b.origin ? "single" : "unknown"),
        origins: b.origins?.length ? b.origins : b.origin ? [b.origin] : [],
        originDetail: b.originDetail ?? "",
      });
      setRoastLevel(b.roastLevel ?? ""); setProcess(b.process ?? ""); setVariety(b.variety ?? "");
      setPurchaseDate(toSlashDate(b.purchaseDate)); setPrice(b.price?.toString() ?? ""); setWeight(b.weight?.toString() ?? "");
      setIsGround(b.isGround ?? false); setPhotos(normalizePhotos(b));
      setTaste({ acidity:b.acidity, bitterness:b.bitterness, sweetness:b.sweetness, body:b.body, aroma:b.aroma });
      setOverall(b.overallRating); setRepeat(b.repeatStatus ?? "undecided"); setFavorite(b.favorite ?? false); setMemo(b.memo ?? "");
      setCreatedAt(b.createdAt);
    });
  }, [beanId]);

  async function save() {
    if (!name.trim()) { setError("豆の名前を入力してください。"); return; }
    const purchaseDateIso = purchaseDate ? slashDateToIso(purchaseDate) : undefined;
    if (purchaseDate && !purchaseDateIso) { setError("購入日はYYYY/MM/DD形式で入力してください。"); return; }
    if (origin.originType === "single" && origin.origins.length > 1) { setError("シングルオリジンは産地を1つ選んでください。"); return; }

    setSaving(true); const now = new Date().toISOString();
    const bean: Bean = {
      id: beanId ?? crypto.randomUUID(),
      name:name.trim(), roaster:roaster.trim()||undefined,
      originType:origin.originType, origins:origin.origins, originDetail:origin.originDetail.trim()||undefined,
      roastLevel:roastLevel||undefined, process:process.trim()||undefined, variety:variety.trim()||undefined,
      purchaseDate:purchaseDateIso, price:price?Number(price):undefined, weight:weight?Number(weight):undefined,
      isGround, photos, ...taste, overallRating:overall, repeatStatus:repeat, favorite,
      memo:memo.trim()||undefined, createdAt, updatedAt:now
    };
    try { await saveBean(bean); navigate(`/beans/${bean.id}`); }
    catch { setError("保存に失敗しました。"); setSaving(false); }
  }

  return <div className="space-y-5">
    <KuraCard><div className="space-y-5">
      <PhotoInput value={photos} onChange={setPhotos}/>
      <KuraInput label="豆の名前（必須）" value={name} onChange={setName} placeholder="例：マンデリン ブルー・アチェ"/>
      <KuraInput label="ロースター" value={roaster} onChange={setRoaster} placeholder="例：HIRO"/>
      <OriginInput value={origin} onChange={setOrigin}/>
      <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">焙煎度</span>
        <select value={roastLevel} onChange={(e)=>setRoastLevel(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4">
          <option value="">未選択</option>{["浅煎り","中浅煎り","中煎り","中深煎り","深煎り"].map(x=><option key={x}>{x}</option>)}
        </select></label>
      <KuraInput label="精製方法" value={process} onChange={setProcess} placeholder="例：ウォッシュド"/>
      <KuraInput label="品種" value={variety} onChange={setVariety} placeholder="例：ゲイシャ"/>
      <DateInput label="購入日" value={purchaseDate} onChange={setPurchaseDate}/>
      <div className="grid grid-cols-2 gap-3"><KuraInput label="価格（円）" value={price} onChange={setPrice} type="number"/><KuraInput label="内容量（g）" value={weight} onChange={setWeight} type="number"/></div>
      <label className="flex items-center gap-3 text-[#cfc6bd]"><input type="checkbox" checked={isGround} onChange={(e)=>setIsGround(e.target.checked)}/>粉で購入</label>
      <label className="flex items-center gap-3 text-[#e0ae5e]"><input type="checkbox" checked={favorite} onChange={(e)=>setFavorite(e.target.checked)}/>お気に入り</label>
    </div></KuraCard>
    <KuraCard><h2 className="mb-5 font-serif text-xl">味のプロファイル</h2><TasteProfileInput value={taste} onChange={setTaste}/></KuraCard>
    <KuraCard><div className="space-y-6"><RatingInput label="総合評価" value={overall} onChange={(v)=>setOverall(v as Rating|undefined)}/>
      <label className="block"><span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">リピート判定</span>
        <select value={repeat} onChange={(e)=>setRepeat(e.target.value as RepeatStatus)} className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4">
          <option value="undecided">保留</option><option value="want_again">また買いたい</option><option value="maybe">気分次第</option><option value="no">買わない</option>
        </select></label>
      <KuraTextarea label="メモ" value={memo} onChange={setMemo} placeholder="味の印象や次回試したいこと"/>
    </div></KuraCard>
    {error && <p className="text-red-300">{error}</p>}
    <button disabled={saving} onClick={()=>void save()} className="sticky bottom-3 w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914] shadow-xl disabled:opacity-50">{saving?"保存中...":"保存"}</button>
  </div>;
}
