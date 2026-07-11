import { useRef } from "react";
import { toSlashDate } from "../../utils/date";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

export function DateInput({
  label = "日付",
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    const input = inputRef.current;
    if (!input) return;

    if ("showPicker" in input) {
      input.showPicker();
    } else {
      input.click();
    }
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        {label}
      </span>

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
        className="sr-only"
        tabIndex={-1}
      />
    </label>
  );
}
