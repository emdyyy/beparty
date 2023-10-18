import { downloadImages } from "@/services/DownloadService";
import ImageUploader from "@/components/ImageUploader";
import ImageBoard from "@/components/ImageBoard";

export default async function Home() {
  const images = await downloadImages();

  return (
    <main>
      <ImageUploader />
      <ImageBoard images={images} />
    </main>
  );
}
