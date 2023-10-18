"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>();

  const handleClick = () => {
    if (!selectedImage) return;

    const data = new FormData();
    data.append("image", selectedImage);

    toast.promise(
      fetch("/api/image", {
        method: "POST",
        body: data,
      }),
      {
        loading: "Loading...",
        success: "Success!",
        error: "Error occured",
      }
    );
  };

  return (
    <div>
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
        accept="image/*"
        name="myImage"
        onChange={(event) => {
          if (!event.target.files) return;
          setSelectedImage(event.target.files[0]);
        }}
      />
      <button onClick={() => handleClick()}>Upload to drive</button>
    </div>
  );
}
