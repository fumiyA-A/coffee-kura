import type { OriginType } from "../../models/enums";
import { ORIGIN_OPTIONS } from "../../constants/origins";
import { KuraInput } from "../ui/KuraInput";

export type OriginValue = {
  originType: OriginType;
  origins: string[];
  originDetail: string;
};

export function OriginInput({
  value,
  onChange,
}: {
  value: OriginValue;
  onChange: (value: OriginValue) => void;
}) {
  const toggle = (origin: string) => {
    const selected = value.origins.includes(origin)
      ? value.origins.filter((item) => item !== origin)
      : [...value.origins, origin];
    onChange({ ...value, origins: selected });
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
          産地タイプ
        </span>
        <select
          value={value.originType}
          onChange={(event) =>
            onChange({
              originType: event.target.value as OriginType,
              origins: [],
              originDetail: "",
            })
          }
          className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"
        >
          <option value="single">シングルオリジン</option>
          <option value="blend">ブレンド</option>
          <option value="unknown">不明</option>
        </select>
      </label>

      {value.originType === "single" && (
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
            産地
          </span>
          <select
            value={value.origins[0] ?? ""}
            onChange={(event) =>
              onChange({
                ...value,
                origins: event.target.value ? [event.target.value] : [],
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-[#201d1a] px-4 py-4"
          >
            <option value="">未選択</option>
            {ORIGIN_OPTIONS.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </label>
      )}

      {value.originType === "blend" && (
        <div>
          <span className="mb-2 block text-sm font-semibold text-[#cfc6bd]">
            ブレンドに含まれる産地
          </span>
          <div className="grid grid-cols-2 gap-2">
            {ORIGIN_OPTIONS.map((origin) => {
              const active = value.origins.includes(origin);
              return (
                <button
                  key={origin}
                  type="button"
                  onClick={() => toggle(origin)}
                  className={`rounded-xl border px-3 py-3 text-sm ${
                    active
                      ? "border-[#d4a04f] bg-[#d4a04f]/15 text-[#e0ae5e]"
                      : "border-white/10 bg-[#201d1a] text-[#aaa198]"
                  }`}
                >
                  {active ? "✓ " : ""}
                  {origin}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {value.originType !== "unknown" && (
        <KuraInput
          label="地域・農園・補足"
          value={value.originDetail}
          onChange={(originDetail) => onChange({ ...value, originDetail })}
          placeholder="例：イルガチェフェ、グジ、マンデリン"
        />
      )}
    </div>
  );
}
