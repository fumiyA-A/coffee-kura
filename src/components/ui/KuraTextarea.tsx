export function KuraTextarea({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return <label className="block">
    <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">{label}</span>
    <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full resize-none rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4 outline-none focus:border-[#d4a04f]/70" />
  </label>;
}
