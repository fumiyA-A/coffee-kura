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

      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="block w-full cursor-pointer rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 text-[#f5efe7] outline-none focus:border-[#d4a04f]/70"
      />

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
