import { navigate } from "../../app/routes";

const items = [
  ["beans", "Beans", "◉"],
  ["cafe", "Cafe", "☕"],
  ["insights", "Insights", "▥"],
] as const;

export function BottomNavigation({ active }: { active: "beans" | "cafe" | "insights" }) {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 mx-auto max-w-xl border-t border-white/10 bg-[#211e1b]/95 px-5 pt-3 backdrop-blur">
      <div className="grid grid-cols-3 gap-2">
        {items.map(([route, label, icon]) => (
          <button
            key={route}
            onClick={() => navigate(`/${route}`)}
            className={`flex min-h-14 flex-col items-center justify-center rounded-2xl text-xs ${active === route ? "bg-[#d4a04f]/15 text-[#e0ae5e]" : "text-[#9d958d]"}`}
          >
            <span className="text-xl">{icon}</span><span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
