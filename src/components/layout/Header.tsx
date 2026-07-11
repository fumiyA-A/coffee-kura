import type { RouteName } from "../../app/routes";
import { navigate } from "../../app/routes";

const titles: Record<RouteName, string> = {
  beans: "Coffee Kura",
  cafe: "カフェの記録",
  insights: "Insights",
  settings: "設定",
};

export function Header({ route }: { route: RouteName }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-[#171513]/95 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur">
      {route === "settings" ? (
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-xl text-[#f5efe7]"
          onClick={() => navigate("beans")}
          aria-label="設定を閉じる"
        >
          ←
        </button>
      ) : (
        <div className="h-11 w-11" />
      )}

      <h1 className="font-serif text-2xl tracking-wide text-[#f5efe7]">
        {titles[route]}
      </h1>

      {route === "settings" ? (
        <div className="h-11 w-11" />
      ) : (
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-xl text-[#d4a04f]"
          onClick={() => navigate("settings")}
          aria-label="設定を開く"
        >
          ⚙
        </button>
      )}
    </header>
  );
}
