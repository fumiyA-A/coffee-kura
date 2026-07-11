import { useEffect, useRef, useState } from "react";
import { compressImages } from "../../services/imageService";

function Preview({
  blob,
  index,
  cover,
  onDelete,
  onCover,
}: {
  blob: Blob;
  index: number;
  cover: boolean;
  onDelete: () => void;
  onCover: () => void;
}) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const next = URL.createObjectURL(blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#332a20]">
      {url && <img src={url} className="h-32 w-full object-cover" alt={`選択画像 ${index + 1}`} />}
      <div className="grid grid-cols-2 gap-1 p-2">
        <button type="button" onClick={onCover} className={`rounded-lg px-2 py-2 text-xs ${cover ? "bg-[#d4a04f] text-[#1e1914]" : "bg-white/5 text-[#aaa198]"}`}>
          {cover ? "表紙" : "表紙にする"}
        </button>
        <button type="button" onClick={onDelete} className="rounded-lg bg-red-400/10 px-2 py-2 text-xs text-red-300">削除</button>
      </div>
    </div>
  );
}

export function PhotoInput({ value, onChange, maxPhotos = 10 }: {
  value: Blob[];
  onChange: (value: Blob[]) => void;
  maxPhotos?: number;
}) {
  const albumRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  async function append(files?: FileList | null) {
    if (!files?.length) return;
    if (value.length + files.length > maxPhotos) {
      setError(`写真は最大${maxPhotos}枚です。`);
      return;
    }
    setProcessing(true);
    const compressed = await compressImages(files);
    onChange([...value, ...compressed]);
    setProcessing(false);
    setError("");
  }

  function makeCover(index: number) {
    const next = [...value];
    const [selected] = next.splice(index, 1);
    next.unshift(selected);
    onChange(next);
  }

  return <div>
    <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">写真（複数可・最大{maxPhotos}枚）</span>
    {value.length > 0 && <div className="mb-3 grid grid-cols-2 gap-3">{value.map((blob, index) => (
      <Preview key={`${blob.size}-${index}`} blob={blob} index={index} cover={index === 0}
        onCover={() => makeCover(index)} onDelete={() => onChange(value.filter((_, i) => i !== index))} />
    ))}</div>}
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={() => albumRef.current?.click()} className="rounded-xl bg-[#d4a04f] px-3 py-3 font-semibold text-[#1e1914]">アルバムから追加</button>
      <button type="button" onClick={() => cameraRef.current?.click()} className="rounded-xl border border-[#d4a04f]/40 px-3 py-3 text-[#e0ae5e]">カメラで追加</button>
    </div>
    {processing && <p className="mt-2 text-sm text-[#aaa198]">画像を処理中...</p>}
    {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    <input ref={albumRef} className="hidden" type="file" accept="image/*" multiple onChange={(e) => void append(e.target.files)} />
    <input ref={cameraRef} className="hidden" type="file" accept="image/*" capture="environment" onChange={(e) => void append(e.target.files)} />
  </div>;
}
