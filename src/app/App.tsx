import { useEffect, useState } from "react";
import { AppLayout } from "./AppLayout";
import { parseRoute, type Route } from "./routes";
import { initializeDatabase } from "../db/database";
import { BeansPage } from "../pages/BeansPage";
import { BeanFormPage } from "../pages/BeanFormPage";
import { BeanDetailPage } from "../pages/BeanDetailPage";
import { CafePage } from "../pages/CafePage";
import { InsightsPage } from "../pages/InsightsPage";
import { SettingsPage } from "../pages/SettingsPage";

export default function App() {
  const [route, setRoute] = useState<Route>(parseRoute());

  useEffect(() => {
    void initializeDatabase();

    if (!window.location.hash) {
      window.location.hash = "/beans";
    }

    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  let page;
  switch (route.name) {
    case "bean-new":
      page = <BeanFormPage />;
      break;
    case "bean-detail":
      page = <BeanDetailPage beanId={route.beanId} />;
      break;
    case "cafe":
      page = <CafePage />;
      break;
    case "insights":
      page = <InsightsPage />;
      break;
    case "settings":
      page = <SettingsPage />;
      break;
    default:
      page = <BeansPage />;
  }

  return <AppLayout route={route}>{page}</AppLayout>;
}
