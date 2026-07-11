export type Route =
  | { name: "beans" }
  | { name: "bean-new" }
  | { name: "bean-detail"; beanId: string }
  | { name: "cafe" }
  | { name: "insights" }
  | { name: "settings" };

export function parseRoute(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const parts = raw.split("/").filter(Boolean);

  if (parts[0] === "beans" && parts[1] === "new") {
    return { name: "bean-new" };
  }

  if (parts[0] === "beans" && parts[1]) {
    return { name: "bean-detail", beanId: parts[1] };
  }

  if (parts[0] === "cafe") return { name: "cafe" };
  if (parts[0] === "insights") return { name: "insights" };
  if (parts[0] === "settings") return { name: "settings" };

  return { name: "beans" };
}

export function navigate(path: string): void {
  window.location.hash = path.startsWith("/") ? path : `/${path}`;
}
