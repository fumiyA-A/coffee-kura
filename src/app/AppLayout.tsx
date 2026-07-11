import type { PropsWithChildren } from "react";
import type { RouteName } from "./routes";
import { Header } from "../components/layout/Header";
import { BottomNavigation } from "../components/layout/BottomNavigation";

type Props = PropsWithChildren<{
  route: RouteName;
}>;

export function AppLayout({ route, children }: Props) {
  return (
    <div className="mx-auto min-h-dvh max-w-xl bg-[#171513] shadow-2xl">
      <Header route={route} />
      <main className="px-5 pb-28 pt-5">{children}</main>
      {route !== "settings" && <BottomNavigation activeRoute={route} />}
    </div>
  );
}
