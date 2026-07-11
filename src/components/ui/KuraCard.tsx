import type { PropsWithChildren } from "react";
export function KuraCard({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <section className={`rounded-[1.75rem] border border-white/5 bg-[#292623] p-5 shadow-xl shadow-black/20 ${className}`}>{children}</section>;
}
