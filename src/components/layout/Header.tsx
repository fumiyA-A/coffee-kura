import type { Route } from "../../app/routes";
import { navigate } from "../../app/routes";

function title(route: Route) {
  switch (route.name) {
    case "bean-new": return "豆カードを追加";
    case "bean-edit": return "豆カードを編集";
    case "bean-detail": return "豆カード";
    case "brew-new": return route.sourceBrewId ? "レシピを複製" : "一杯を記録";
    case "brew-edit": return "一杯を編集";
    case "cafe-new": return "カフェの一杯を追加";
    case "cafe-edit": return "カフェの一杯を編集";
    case "cafe-detail": return "カフェの一杯";
    case "cafe": return "カフェの記録";
    case "insights": return "Insights";
    case "settings": return "設定";
    case "recipe-templates": return "レシピテンプレート";
    case "recipe-template-new": return "テンプレートを作成";
    case "recipe-template-edit": return "テンプレートを編集";
    case "brew-methods": return "抽出方法";
    default: return "Coffee Kura";
  }
}

function backPath(route: Route) {
  if (route.name === "brew-new" || route.name === "brew-edit") return `/beans/${route.beanId}`;
  if (route.name === "bean-edit") return `/beans/${route.id}`;
  if (route.name === "cafe-new") return "/cafe";
  if (route.name === "cafe-edit") return `/cafe/${route.id}`;
  if (route.name === "cafe-detail") return "/cafe";
  if (route.name === "recipe-templates" || route.name === "brew-methods") return "/settings";
  if (route.name === "recipe-template-edit") return "/settings/templates";
  if (route.name === "recipe-template-new") return route.returnBeanId ? `/beans/${route.returnBeanId}` : "/settings/templates";
  return "/beans";
}

export function Header({ route }: { route: Route }) {
  const root = ["beans", "cafe", "insights"].includes(route.name);
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#171513]/95 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur">
      {root ? <div className="h-11 w-11" /> : (
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-xl" onClick={() => navigate(backPath(route))} aria-label="戻る">←</button>
      )}
      <h1 className="max-w-[70%] text-center font-serif text-2xl tracking-wide">{title(route)}</h1>
      {root ? (
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-xl text-[#d4a04f]" onClick={() => navigate("/settings")} aria-label="設定">⚙</button>
      ) : <div className="h-11 w-11" />}
    </header>
  );
}
