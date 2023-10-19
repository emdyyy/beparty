import { downloadImages } from "@/services/DriveService";
import Image from "next/image";

export default async function BoardPage() {
  const images = await downloadImages();

  return (
    <>
      {images &&
        images.map((image: { imageUrl: string; imageData: string }) => {
          if (!image.imageData || !image.imageUrl) return;
          return (
            <Image
              className="rounded-lg"
              key={image.imageUrl}
              src={`data:image/png;base64,${image.imageData}`}
              width={"640"}
              height={"480"}
              unoptimized
              alt=""
            />
          );
        })}
    </>
  );
}
