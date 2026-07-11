import { useEffect, useRef, useState } from "react";
import { compressImages } from "../../services/imageService";

function Preview({ blob, onDelete }: { blob: Blob; onDelete: () => void }) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const next = URL.createObjectURL(blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#332a20]">
      {url && <img src={url} className="h-32 w-full object-cover" alt="選択画像" />}
      <button
        type="button"
        onClick={onDelete}
        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white"
        aria-label="画像を削除"
      >
        ×
      </button>
    </div>
  );
}

export function PhotoInput({
  value,
  onChange,
}: {
  value: Blob[];
  onChange: (value: Blob[]) => void;
}) {
  const albumRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);

  async function append(files?: FileList | null) {
    if (!files?.length) return;
    setProcessing(true);
    const compressed = await compressImages(files);
    onChange([...value, ...compressed]);
    setProcessing(false);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        写真（複数可）
      </span>

      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3">
          {value.map((blob, index) => (
            <Preview
              key={`${blob.size}-${index}`}
              blob={blob}
              onDelete={() => onChange(value.filter((_, i) => i !== index))}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => albumRef.current?.click()}
          className="rounded-xl bg-[#d4a04f] px-3 py-3 font-semibold text-[#1e1914]"
        >
          アルバムから追加
        </button>
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="rounded-xl border border-[#d4a04f]/40 px-3 py-3 text-[#e0ae5e]"
        >
          カメラで追加
        </button>
      </div>

      {processing && <p className="mt-2 text-sm text-[#aaa198]">画像を処理中...</p>}

      <input
        ref={albumRef}
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => void append(event.target.files)}
      />
      <input
        ref={cameraRef}
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(event) => void append(event.target.files)}
      />
    </div>
  );
}
