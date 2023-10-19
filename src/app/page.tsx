"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [images, setImages] = useState<
    { imageUrl: string; imageData: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);

      const res = await fetch("/api/image", {
        method: "GET",
      });
      const data = await res.json();
      setImages(data);
      setLoading(false);
    };
    getImages();
  }, []);

  return (
    <main className="max-w-sm mx-auto bg-bg min-h-screen">
      <h2 className="font-bold text-center py-3">Najnowsze relacje</h2>
      <div className="flex flex-col gap-3 h-full items-center">
        {loading ? (
          <Image
            className="animate-spin mx-auto mt-24"
            src={"/loading-icon.svg"}
            height={100}
            width={100}
            alt=""
          />
        ) : (
          images.map((image: { imageUrl: string; imageData: string }) => {
            if (!image.imageData || !image.imageUrl) return;
            return (
              <Image
                className="rounded-2xl"
                key={image.imageUrl}
                src={`data:image/png;base64,${image.imageData}`}
                width={"640"}
                height={"480"}
                unoptimized
                alt=""
              />
            );
          })
        )}
      </div>
      <div className="flex justify-center items-center">
        <Link
          href="/image"
          className="flex flex-col items-center justify-center fixed bottom-0 mb-10 hover:cursor-pointer"
        >
          <Image src={"/camera-icon.svg"} height={100} width={100} alt="" />
        </Link>
      </div>
    </main>
  );
}
