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
    <div className="w-full min-w-0">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        {label}
      </span>

      <div
        className="
          relative
          w-full
          min-w-0
          max-w-full
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#201d1a]
          focus-within:border-[#d4a04f]/70
        "
      >
        {/* 画面に表示する日付 */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            flex
            min-h-16
            w-full
            items-center
            justify-between
            px-4
            py-4
          "
        >
          <span className={value ? "text-[#f5efe7]" : "text-[#716a64]"}>
            {value ? toSlashDate(value) : "YYYY/MM/DD"}
          </span>

          <span className="text-xl text-[#d4a04f]">
            ▣
          </span>
        </div>

        {/* iPhoneが直接タップを受け取る本物の日付入力 */}
        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="
            absolute
            inset-0
            z-10
            block
            h-full
            w-full
            cursor-pointer
            opacity-[0.01]
          "
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