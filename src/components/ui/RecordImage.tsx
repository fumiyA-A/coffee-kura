import { useObjectUrl } from "../../hooks/useObjectUrl";

export function RecordImage({ blob, alt, className = "" }: { blob?: Blob; alt: string; className?: string }) {
  const url = useObjectUrl(blob);
  return url ? <img src={url} alt={alt} className={className} /> : <div className={`grid place-items-center bg-[#332e29] text-5xl ${className}`}>☕</div>;
}
