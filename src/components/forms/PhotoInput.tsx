import { useEffect, useRef, useState } from "react";

export function PhotoInput({ value, onChange }: { value?: Blob; onChange: (v?: Blob) => void }) {
  const [url, setUrl] = useState<string>();
  const library = useRef<HTMLInputElement>(null);
  const camera = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) { setUrl(undefined); return; }
    const next = URL.createObjectURL(value); setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [value]);

  return <div>
    <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">写真</span>
    <div className="overflow-hidden rounded-3xl border border-[#d4a04f]/25 bg-[#332a20]">
      {url ? <img src={url} className="h-56 w-full object-cover" alt="選択した写真" /> :
        <div className="grid h-44 place-items-center text-center text-[#d4a04f]"><div><div className="text-4xl">▧＋</div><div>写真を追加</div></div></div>}
      <div className="grid grid-cols-2 gap-2 p-3">
        <button type="button" onClick={() => library.current?.click()} className="rounded-xl bg-[#d4a04f] px-3 py-3 font-semibold text-[#1e1914]">アルバム</button>
        <button type="button" onClick={() => camera.current?.click()} className="rounded-xl border border-[#d4a04f]/40 px-3 py-3 text-[#e0ae5e]">カメラ</button>
      </div>
    </div>
    <input ref={library} className="hidden" type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} />
    <input ref={camera} className="hidden" type="file" accept="image/*" capture="environment" onChange={(e) => onChange(e.target.files?.[0])} />
    {value && <button type="button" onClick={() => onChange(undefined)} className="mt-2 text-sm text-[#aaa198]">写真を削除</button>}
  </div>;
}
