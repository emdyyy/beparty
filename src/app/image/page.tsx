"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ImagePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const router = useRouter();

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
          loading: "Loading...",
          success: "Success!",
          error: "Error occured",
        }
      )
      .then(() => router.push("/board"));
  };

  return (
    <main>
      <button onClick={() => router.push("/")}>Powrót</button>
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
              onClick={() => setSelectedImage(null)}
            >
              Remove image
            </button>
            <button
              onClick={() => handleClick()}
              className="p-3 bg-black text-white"
            >
              Share
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
              Add image
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(event) => {
                if (!event.target.files) return;
                setSelectedImage(event.target.files[0]);
              }}
            />
          </label>
        </div>
      )}
    </main>
  );
}
