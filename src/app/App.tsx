import { useEffect, useState } from "react";
import { parseRoute, type Route } from "./routes";
import { AppLayout } from "./AppLayout";
import { initializeDatabase } from "../db/database";
import { BeansPage } from "../pages/BeansPage";
import { BeanFormPage } from "../pages/BeanFormPage";
import { BeanDetailPage } from "../pages/BeanDetailPage";
import { BrewFormPage } from "../pages/BrewFormPage";
import { CafePage } from "../pages/CafePage";
import { CafeFormPage } from "../pages/CafeFormPage";
import { CafeDetailPage } from "../pages/CafeDetailPage";
import { InsightsPage } from "../pages/InsightsPage";
import { SettingsPage } from "../pages/SettingsPage";

export default function App() {
  const [route, setRoute] = useState<Route>(parseRoute());

  useEffect(() => {
    void initializeDatabase();
    if (!window.location.hash) window.location.hash = "/beans";
    const handler = () => setRoute(parseRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  let page;
  switch (route.name) {
    case "bean-new": page = <BeanFormPage />; break;
    case "bean-edit": page = <BeanFormPage beanId={route.id} />; break;
    case "bean-detail": page = <BeanDetailPage beanId={route.id} />; break;
    case "brew-new": page = <BrewFormPage beanId={route.beanId} />; break;
    case "brew-edit": page = <BrewFormPage beanId={route.beanId} brewId={route.brewId} />; break;
    case "cafe-new": page = <CafeFormPage />; break;
    case "cafe-edit": page = <CafeFormPage cafeCupId={route.id} />; break;
    case "cafe-detail": page = <CafeDetailPage id={route.id} />; break;
    case "cafe": page = <CafePage />; break;
    case "insights": page = <InsightsPage />; break;
    case "settings": page = <SettingsPage />; break;
    default: page = <BeansPage />;
  }

  return <AppLayout route={route}>{page}</AppLayout>;
}
