export function KuraInput({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: "text" | "number" | "date";
}) {
  return <label className="block">
    <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">{label}</span>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 outline-none focus:border-[#d4a04f]/70" />
  </label>;
}
