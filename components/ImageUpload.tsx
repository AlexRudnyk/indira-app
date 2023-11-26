"use client";

import React, { useState } from "react";
import Success from "../public/success-check.png";
import Image from "next/image";

interface InitialStateProps {
  title: string;
  text: string;
  description: string;
  photoURL: string;
  price: number;
}

interface FormikProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const ImageUpload = ({ setFieldValue }: FormikProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const uploadImage = async () => {
    if (!image) {
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ""
    );
    data.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ""
    );
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setFieldValue("photoURL", res.url);
      setIsUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.currentTarget;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const file = fileInput.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result as string);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
    setIsUploaded(false);
  };

  return (
    <div>
      <div>
        <div>
          <input
            hidden
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          {!preview && (
            <label htmlFor="hidden-input">
              <p>Upload_file</p>
            </label>
          )}
          {preview && (
            <div>
              <div>
                <Image src={preview} alt="preview" width={70} height={70} />
                <Image
                  src={Success}
                  alt="Success"
                  width={20}
                  height={20}
                  //   $isUploaded={isUploaded}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={uploadImage}
                  disabled={isUploaded}
                  className=""
                >
                  Upload
                </button>
                <button type="button" onClick={handleResetClick} className="">
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
