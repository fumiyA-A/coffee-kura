import { useEffect, useState } from "react";

export function Toast() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<string>;
      setMessage(custom.detail);
      window.setTimeout(() => setMessage(""), 2200);
    };
    window.addEventListener("coffee-kura-toast", handler);
    return () => window.removeEventListener("coffee-kura-toast", handler);
  }, []);
  if (!message) return null;
  return <div className="fixed inset-x-5 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto max-w-md rounded-2xl bg-[#d4a04f] px-5 py-4 text-center font-semibold text-[#1e1914] shadow-2xl">{message}</div>;
}
