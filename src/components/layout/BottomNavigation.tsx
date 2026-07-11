import { navigate } from "../../app/routes";

type ActiveRoute = "beans" | "cafe" | "insights";

const items: Array<{ route: ActiveRoute; label: string; icon: string }> = [
  { route: "beans", label: "Beans", icon: "◉" },
  { route: "cafe", label: "Cafe", icon: "☕" },
  { route: "insights", label: "Insights", icon: "▥" },
];

export function BottomNavigation({
  activeRoute,
}: {
  activeRoute: ActiveRoute;
}) {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 mx-auto max-w-xl border-t border-white/10 bg-[#211e1b]/95 px-5 pt-3 backdrop-blur">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const active = item.route === activeRoute;
          return (
            <button
              key={item.route}
              type="button"
              onClick={() => navigate(`/${item.route}`)}
              className={`flex min-h-14 flex-col items-center justify-center rounded-2xl text-xs transition ${
                active
                  ? "bg-[#d4a04f]/15 text-[#e0ae5e]"
                  : "text-[#9d958d]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
