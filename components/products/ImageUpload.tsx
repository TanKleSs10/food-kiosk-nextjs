"use client";

import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
  image?: string | undefined;
};

export default function ImageUpload({ image }: ImageUploadProps) {
  const [imageURL, setImageURL] = useState<string>("");
  return (
    <CldUploadWidget
      uploadPreset="vz7to1ek"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          // @ts-expect-error error de tipado de cloudinary
          setImageURL(result.info?.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto:</label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition-all p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>
              {imageURL && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageURL}
                    alt="Imagen de Producto"
                  />
                </div>
              )}
            </div>
          </div>
          {image && !imageURL && (
            <div className="space-y-2 flex flex-col">
              <label>Imagen actual:</label>
              <div className="relative w-64 h-64 mx-auto">
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={getImagePath(image)}
                  alt="Imagen de Producto"
                />
              </div>
            </div>
          )}
          <input
            type="hidden"
            name="image"
            defaultValue={imageURL ? imageURL : image}
          />
        </>
      )}
    </CldUploadWidget>
  );
}
