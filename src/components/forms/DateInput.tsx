import { useRef } from "react";
import { toSlashDate } from "../../utils/date";

type InputWithPicker = HTMLInputElement & { showPicker?: () => void };

export function DateInput({
  label = "日付",
  value,
  onChange,
  optional = false,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    const input = inputRef.current as InputWithPicker | null;
    if (!input) return;
    if (typeof input.showPicker === "function") input.showPicker();
    else input.focus();
  }

  return (
    <div className="block">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">{label}</span>
      <button
        type="button"
        onClick={openPicker}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 text-left"
      >
        <span className={value ? "text-[#f5efe7]" : "text-[#716a64]"}>
          {value ? toSlashDate(value) : "YYYY/MM/DD"}
        </span>
        <span className="text-xl text-[#d4a04f]">▣</span>
      </button>
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute h-px w-px opacity-0"
        tabIndex={-1}
      />
      {optional && value && (
        <button type="button" onClick={() => onChange("")} className="mt-2 text-xs text-[#8f877f]">
          日付をクリア
        </button>
      )}
    </div>
  );
}
