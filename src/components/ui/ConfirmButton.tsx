export function ConfirmButton({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  return <button type="button" onClick={() => { if (window.confirm(`${label}してよいですか？`)) onConfirm(); }}
    className="w-full rounded-2xl border border-red-400/30 px-5 py-4 text-red-300">{label}</button>;
}
