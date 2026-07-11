import type { Route } from "../../app/routes";
import { navigate } from "../../app/routes";

function titleForRoute(route: Route): string {
  switch (route.name) {
    case "bean-new":
      return "豆カードを追加";
    case "bean-detail":
      return "豆カード";
    case "cafe":
      return "カフェの記録";
    case "insights":
      return "Insights";
    case "settings":
      return "設定";
    default:
      return "Coffee Kura";
  }
}

function isSubPage(route: Route): boolean {
  return (
    route.name === "bean-new" ||
    route.name === "bean-detail" ||
    route.name === "settings"
  );
}

export function Header({ route }: { route: Route }) {
  const subPage = isSubPage(route);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#171513]/95 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur">
      {subPage ? (
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-xl text-[#f5efe7]"
          onClick={() => navigate("/beans")}
          aria-label="戻る"
        >
          ←
        </button>
      ) : (
        <div className="h-11 w-11" />
      )}

      <h1 className="font-serif text-2xl tracking-wide text-[#f5efe7]">
        {titleForRoute(route)}
      </h1>

      {!subPage ? (
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-xl text-[#d4a04f]"
          onClick={() => navigate("/settings")}
          aria-label="設定を開く"
        >
          ⚙
        </button>
      ) : (
        <div className="h-11 w-11" />
      )}
    </header>
  );
}
