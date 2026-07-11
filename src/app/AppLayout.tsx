import type { PropsWithChildren } from "react";
import type { Route } from "./routes";
import { Header } from "../components/layout/Header";
import { BottomNavigation } from "../components/layout/BottomNavigation";

type Props = PropsWithChildren<{ route: Route }>;

export function AppLayout({ route, children }: Props) {
  const hideBottomNav =
    route.name === "bean-new" ||
    route.name === "bean-detail" ||
    route.name === "settings";

  return (
    <div className="mx-auto min-h-dvh max-w-xl bg-[#171513] shadow-2xl">
      <Header route={route} />
      <main className={`px-5 pt-5 ${hideBottomNav ? "pb-10" : "pb-28"}`}>
        {children}
      </main>
      {!hideBottomNav && <BottomNavigation activeRoute={route.name} />}
    </div>
  );
}
