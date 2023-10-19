"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Compressor from "compressorjs";

export default function ImagePage() {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [uploading, setUploading] = useState<boolean>(false);
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
    setUploading(true);

    const data = new FormData();
    data.append("image", selectedImage);

    fetch("/api/image", {
      method: "POST",
      body: data,
    })
      .then(() => {
        setUploading(false);
        router.push("/");
        toast.success("Sukces 🎈");
      })
      .catch((err) => {
        setUploading(false);
        toast.error("Wystąpił błąd");
      });
  };

  return (
    <>
      <button className="mb-5 self-start" onClick={() => router.push("/")}>
        Powrót
      </button>
      <main className="grow flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
          {selectedImage && (
            <div className="flex flex-col gap-5 justify-center">
              <p className="text-center">Wszystko cacy? To wstawiamy!</p>
              <Image
                className="rounded-2xl"
                alt="not found"
                width={640}
                height={480}
                src={URL.createObjectURL(selectedImage)}
              />
              <button
                className="p-3 text-white rounded-2xl border border-solid border-2 font-bold"
                onClick={() => setSelectedImage(undefined)}
              >
                Powtórka
              </button>
              <button
                onClick={() => handleClick()}
                disabled={uploading}
                className={`p-3 bg-white text-bg rounded-2xl font-bold disabled:opacity-75`}
              >
                {uploading ? "Przesyłam..." : "Wstaw"}
              </button>
            </div>
          )}
        </div>
        {!selectedImage && (
          <label htmlFor="dropzone-file" className="cursor-pointer">
            <div className="flex items-center justify-center bg-white font-bold text-bg text-2xl text-center rounded-2xl p-5">
              Uśmiechnij się!
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              capture="user"
              onChange={(event) => {
                handleImageCompression(event);
              }}
            />
          </label>
        )}
      </main>
    </>
  );
}
