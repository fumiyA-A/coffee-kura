import { useEffect, useState } from "react";
export function RecordImage({ blob, alt, className = "" }: { blob?: Blob; alt: string; className?: string }) {
  const [url,setUrl] = useState<string>();
  useEffect(() => {
    if (!blob) { setUrl(undefined); return; }
    const next = URL.createObjectURL(blob); setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url ? <img src={url} alt={alt} className={className} /> : <div className={`grid place-items-center bg-[#332e29] text-5xl ${className}`}>☕</div>;
}
