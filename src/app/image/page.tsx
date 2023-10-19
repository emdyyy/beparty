"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Compressor from "compressorjs";

export default function ImagePage() {
  const [selectedImage, setSelectedImage] = useState<File>();
  const router = useRouter();

  const handleImageCompression = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const image = e.target.files[0];

    new Compressor(image, {
      quality: 0.7,
      success: (compressedResult) => {
        setSelectedImage(new File([compressedResult], "beparty.jpg"));
      },
    });
  };

  const handleClick = () => {
    if (!selectedImage) return;

    const data = new FormData();
    data.append("image", selectedImage);

    toast
      .promise(
        fetch("/api/image", {
          method: "POST",
          body: data,
        }),
        {
          loading: "Czekam...",
          success: "Sukces!",
          error: "Wystąpił błąd",
        }
      )
      .then(() => router.push("/board"));
  };

  return (
    <main>
      <button className="mb-5" onClick={() => router.push("/")}>
        Powrót
      </button>
      <div className="flex flex-col items-center justify-center">
        {selectedImage && (
          <div className="flex flex-col gap-5 justify-center">
            <Image
              className="rounded-lg"
              alt="not found"
              width={640}
              height={480}
              src={URL.createObjectURL(selectedImage)}
            />
            <button
              className="p-3 bg-black text-white"
              onClick={() => setSelectedImage(undefined)}
            >
              Usuń
            </button>
            <button
              onClick={() => handleClick()}
              className="p-3 bg-black text-white"
            >
              Wstaw
            </button>
          </div>
        )}
      </div>
      {!selectedImage && (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center cursor-pointer w-full"
          >
            <div className="bg-black text-white p-3 w-full text-center">
              Dodaj zdjęcie
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(event) => {
                handleImageCompression(event);
              }}
            />
          </label>
        </div>
      )}
    </main>
  );
}
