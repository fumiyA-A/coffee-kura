import { useCallback } from "react";
import { navigate } from "../app/routes";
import { getAllBrewMethods } from "../db/repositories/brewMethodRepository";
import { getAllBrewTemplates } from "../db/repositories/brewTemplateRepository";
import { useData } from "../hooks/useData";
import { KuraCard } from "../components/ui/KuraCard";
import { getBrewMethodLabel } from "../constants/brewMethods";
import { formatBrewRatio, formatBrewTime } from "../utils/brew";

export function RecipeTemplatesPage() {
  const loader = useCallback(async () => ({
    templates: await getAllBrewTemplates(),
    methods: await getAllBrewMethods(),
  }), []);
  const { data, loading } = useData(loader);

  if (loading || !data) return <p className="text-center text-[#aaa198]">読み込み中...</p>;

  return (
    <div className="space-y-5">
      <button
        onClick={() => navigate("/settings/templates/new")}
        className="w-full rounded-2xl bg-[#d4a04f] px-5 py-4 font-semibold text-[#1e1914]"
      >
        ＋ テンプレートを作成
      </button>
      {data.templates.length === 0 ? (
        <KuraCard>
          <p className="text-[#aaa198]">まだテンプレートがありません。よく使う抽出条件を登録すると、次回の入力がすぐ終わります。</p>
        </KuraCard>
      ) : (
        data.templates.map((template) => {
          const recipe = [
            template.beanAmount !== undefined ? `${template.beanAmount}g` : undefined,
            template.waterAmount !== undefined ? `${template.waterAmount}ml` : undefined,
            formatBrewRatio(template.beanAmount, template.waterAmount),
            template.waterTemperature !== undefined ? `${template.waterTemperature}℃` : undefined,
            formatBrewTime(template.brewTimeSeconds),
            template.grindSize,
          ].filter(Boolean);
          return (
            <KuraCard key={template.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl">{template.name}</h2>
                  <p className="mt-1 text-sm text-[#e0ae5e]">{getBrewMethodLabel(template.brewMethod, data.methods)}</p>
                  {recipe.length > 0 && <p className="mt-3 text-sm leading-6 text-[#aaa198]">{recipe.join(" ・ ")}</p>}
                </div>
                <button
                  onClick={() => navigate(`/settings/templates/${template.id}/edit`)}
                  className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-sm"
                >
                  編集
                </button>
              </div>
            </KuraCard>
          );
        })
      )}
    </div>
  );
}
