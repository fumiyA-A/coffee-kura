import { useEffect, useState } from "react";

type Props = {
  value?: Blob;
  onChange: (value: Blob | undefined) => void;
};

export function PhotoInput({ value, onChange }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    if (!value) {
      setPreviewUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        写真
      </span>
      <span className="flex min-h-48 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-[#d4a04f]/25 bg-[#332a20]">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="選択した豆の写真"
            className="h-56 w-full object-cover"
          />
        ) : (
          <span className="text-center text-[#d4a04f]">
            <span className="block text-4xl">▧＋</span>
            <span className="mt-2 block">写真を追加</span>
          </span>
        )}
      </span>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          onChange(file);
        }}
      />
      {value && (
        <button
          type="button"
          className="mt-2 text-sm text-[#aaa198]"
          onClick={() => onChange(undefined)}
        >
          写真を削除
        </button>
      )}
    </label>
  );
}
