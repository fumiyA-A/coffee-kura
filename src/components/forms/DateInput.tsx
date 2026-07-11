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
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        {label}
      </span>

      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 text-[#f5efe7] outline-none focus:border-[#d4a04f]/70"
      />
    </label>
  );
}
