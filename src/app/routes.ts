export type Route =
  | { name: "beans" }
  | { name: "bean-new" }
  | { name: "bean-detail"; id: string }
  | { name: "bean-edit"; id: string }
  | { name: "brew-new"; beanId: string }
  | { name: "brew-edit"; beanId: string; brewId: string }
  | { name: "cafe" }
  | { name: "cafe-new" }
  | { name: "cafe-detail"; id: string }
  | { name: "cafe-edit"; id: string }
  | { name: "insights" }
  | { name: "settings" };

export function parseRoute(): Route {
  const p = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  if (p[0] === "beans" && p[1] === "new") return { name: "bean-new" };
  if (p[0] === "beans" && p[1] && p[2] === "edit") return { name: "bean-edit", id: p[1] };
  if (p[0] === "beans" && p[1] && p[2] === "brews" && p[3] === "new") {
    return { name: "brew-new", beanId: p[1] };
  }
  if (p[0] === "beans" && p[1] && p[2] === "brews" && p[3]) {
    return { name: "brew-edit", beanId: p[1], brewId: p[3] };
  }
  if (p[0] === "beans" && p[1]) return { name: "bean-detail", id: p[1] };
  if (p[0] === "cafe" && p[1] === "new") return { name: "cafe-new" };
  if (p[0] === "cafe" && p[1] && p[2] === "edit") return { name: "cafe-edit", id: p[1] };
  if (p[0] === "cafe" && p[1]) return { name: "cafe-detail", id: p[1] };
  if (p[0] === "cafe") return { name: "cafe" };
  if (p[0] === "insights") return { name: "insights" };
  if (p[0] === "settings") return { name: "settings" };
  return { name: "beans" };
}

export function navigate(path: string) {
  window.location.hash = path.startsWith("/") ? path : `/${path}`;
}
