import type { PropsWithChildren } from "react";
import type { Route } from "./routes";
import { Header } from "../components/layout/Header";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import { Toast } from "../components/ui/Toast";

export function AppLayout({ route, children }: PropsWithChildren<{ route: Route }>) {
  const root = ["beans", "cafe", "insights"].includes(route.name);
  return (
    <div className="mx-auto min-h-dvh max-w-xl bg-[#171513] shadow-2xl">
      <Toast />
      <Header route={route} />
      <main className={`fade-in px-5 pt-5 ${root ? "pb-28" : "pb-36"}`}>{children}</main>
      {root && <BottomNavigation active={route.name as "beans" | "cafe" | "insights"} />}
    </div>
  );
}
