import type { Rating } from "../../models/enums";
import { RatingInput } from "./RatingInput";

export type TasteValues = {
  acidity?: Rating; bitterness?: Rating; sweetness?: Rating; body?: Rating; aroma?: Rating;
};

export function TasteProfileInput({ value, onChange }: {
  value: TasteValues; onChange: (v: TasteValues) => void;
}) {
  const rows: Array<[keyof TasteValues, string]> = [
    ["acidity","酸味"],["bitterness","苦味"],["sweetness","甘味"],["body","コク"],["aroma","香り"]
  ];
  return <div className="space-y-5">
    {rows.map(([key,label]) => <RatingInput key={key} label={label} value={value[key]}
      onChange={(v) => onChange({ ...value, [key]: v as Rating | undefined })} />)}
  </div>;
}
