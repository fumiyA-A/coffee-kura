import { useEffect, useState } from "react";
import { AppLayout } from "./AppLayout";
import { getRouteFromHash, type RouteName } from "./routes";
import { initializeDatabase } from "../db/database";
import { BeansPage } from "../pages/BeansPage";
import { CafePage } from "../pages/CafePage";
import { InsightsPage } from "../pages/InsightsPage";
import { SettingsPage } from "../pages/SettingsPage";

export default function App() {
  const [route, setRoute] = useState<RouteName>(getRouteFromHash());

  useEffect(() => {
    void initializeDatabase();

    if (!window.location.hash) {
      window.location.hash = "/beans";
    }

    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const page = {
    beans: <BeansPage />,
    cafe: <CafePage />,
    insights: <InsightsPage />,
    settings: <SettingsPage />,
  }[route];

  return <AppLayout route={route}>{page}</AppLayout>;
}
