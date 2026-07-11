export function RatingInput({ label, value, onChange }: {
  label: string; value?: number; onChange: (v: number | undefined) => void;
}) {
  return <div>
    <div className="mb-2 flex justify-between"><span className="text-sm font-semibold text-[#cfc6bd]">{label}</span>
      <button type="button" className="text-xs text-[#8f877f]" onClick={() => onChange(undefined)}>クリア</button></div>
    <div className="flex justify-between">
      {[1,2,3,4,5].map((n) => <button type="button" key={n} onClick={() => onChange(n)}
        className={`text-4xl ${value && n <= value ? "text-[#e0aa53]" : "text-[#4e4944]"}`}>★</button>)}
    </div>
  </div>;
}
