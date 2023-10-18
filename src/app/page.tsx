"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>();

  const handleClick = () => {
    if (!selectedImage) return;

    const data = new FormData();
    data.append("image", selectedImage);

    fetch("/api/image", {
      method: "POST",
      body: data,
    });
  };

  return (
    <main>
      <h1>Upload and Display Image</h1>
      {selectedImage && (
        <div>
          <Image
            alt="not found"
            width={250}
            height={250}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}{" "}
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          if (!event.target.files) return;
          setSelectedImage(event.target.files[0]);
        }}
      />
      <button onClick={() => handleClick()}>Upload to drive</button>
    </main>
  );
}
