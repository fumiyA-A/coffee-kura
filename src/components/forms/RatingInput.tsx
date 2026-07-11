type Props = {
  label: string;
  value?: number;
  onChange: (value: number | undefined) => void;
};

export function RatingInput({ label, value, onChange }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#cfc6bd]">{label}</span>
        <button
          type="button"
          className="text-xs text-[#8f877f]"
          onClick={() => onChange(undefined)}
        >
          クリア
        </button>
      </div>
      <div className="flex justify-between gap-2">
        {[1, 2, 3, 4, 5].map((rating) => {
          const active = value !== undefined && rating <= value;
          return (
            <button
              type="button"
              key={rating}
              onClick={() => onChange(rating)}
              className={`text-4xl transition ${
                active ? "text-[#e0aa53]" : "text-[#4e4944]"
              }`}
              aria-label={`${label} ${rating}`}
            >
              ★
            </button>
          );
        })}
      </div>
    </div>
  );
}
