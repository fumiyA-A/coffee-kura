import { slashDateToIso } from "../../utils/date";

export function DateInput({
  label = "日付",
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const valid = !value || slashDateToIso(value) !== undefined;
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        {label}
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="YYYY/MM/DD"
        className={`w-full rounded-2xl border bg-[#201d1a] px-4 py-4 outline-none ${
          valid ? "border-white/10" : "border-red-400/50"
        }`}
      />
      {!valid && (
        <span className="mt-2 block text-xs text-red-300">
          YYYY/MM/DD形式で入力してください。
        </span>
      )}
    </label>
  );
}
