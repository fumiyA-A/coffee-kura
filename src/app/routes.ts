export type RouteName = "beans" | "cafe" | "insights" | "settings";

export function getRouteFromHash(): RouteName {
  const route = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  if (route === "cafe" || route === "insights" || route === "settings") {
    return route;
  }
  return "beans";
}

export function navigate(route: RouteName): void {
  window.location.hash = `/${route}`;
}
