type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function KuraTextarea({
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-none rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 text-[#f5efe7] outline-none transition focus:border-[#d4a04f]/70"
      />
    </label>
  );
}
