export async function compressImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const maxSize = 1600;
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    return await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob ?? file), "image/jpeg", 0.82);
    });
  } catch {
    return file;
  }
}

export async function compressImages(files: FileList | File[]): Promise<Blob[]> {
  return Promise.all(Array.from(files).map(compressImage));
}

export function normalizePhotos(record: {
  photos?: Blob[];
  photo?: Blob;
}): Blob[] {
  if (record.photos?.length) return record.photos;
  return record.photo ? [record.photo] : [];
}
