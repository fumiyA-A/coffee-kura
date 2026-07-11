import { toSlashDate } from "../../utils/date";

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
  return (
    <div className="block">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        {label}
      </span>

      <div className="relative">
        {/* ユーザーに見せる表示 */}
        <div
          className="pointer-events-none flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 text-left"
          aria-hidden="true"
        >
          <span className={value ? "text-[#f5efe7]" : "text-[#716a64]"}>
            {value ? toSlashDate(value) : "YYYY/MM/DD"}
          </span>

          <span className="text-xl text-[#d4a04f]">▣</span>
        </div>

        {/* 実際にiPhoneが直接タップを受け取る入力欄 */}
        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      {optional && value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-2 text-xs text-[#8f877f]"
        >
          日付をクリア
        </button>
      )}
    </div>
  );
}