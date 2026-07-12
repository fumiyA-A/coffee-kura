export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent("coffee-kura-toast", { detail: message }));
}
