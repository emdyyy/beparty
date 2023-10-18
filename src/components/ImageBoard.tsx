"use client";
import Image from "next/image";

export default function ImageBoard(props: any) {
  return (
    <div>
      {props.images.map((image: { imageUrl: string; imageData: string }) => {
        if (!image.imageData || !image.imageUrl) return;
        return (
          <Image
            key={image.imageUrl}
            src={`data:image/png;base64,${image.imageData}`}
            width={"250"}
            height={"250"}
            unoptimized
            alt=""
          />
        );
      })}
    </div>
  );
}
