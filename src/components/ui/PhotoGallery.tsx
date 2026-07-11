import { useEffect, useState } from "react";

function GalleryImage({ blob, alt }: { blob: Blob; alt: string }) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const next = URL.createObjectURL(blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url ? <img src={url} alt={alt} className="h-64 min-w-[88%] snap-center rounded-[1.75rem] object-cover" /> : null;
}

export function PhotoGallery({
  photos,
  alt,
}: {
  photos: Blob[];
  alt: string;
}) {
  if (!photos.length) {
    return <div className="grid h-56 place-items-center rounded-[1.75rem] bg-[#332e29] text-5xl">☕</div>;
  }
  return (
    <div className="flex snap-x gap-3 overflow-x-auto pb-2">
      {photos.map((photo, index) => (
        <GalleryImage key={`${photo.size}-${index}`} blob={photo} alt={`${alt} ${index + 1}`} />
      ))}
    </div>
  );
}
