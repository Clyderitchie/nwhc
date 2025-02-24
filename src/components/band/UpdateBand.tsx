"use client";

import { UpdateBandActions } from "@/app/(main)/bands/actions";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UpdateBandProps {
  bandId: string;
  bandName: string;
  bandPic: string;
  bandBio: string;
  bandOrigin: string;
  bandActive: boolean;
  bandYearsActive: string;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function UpdateBand({
  bandId,
  bandName,
  bandPic,
  bandBio,
  bandOrigin,
  bandActive,
  bandYearsActive,
  isSubmitting,
  setIsSubmitting,
}: UpdateBandProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    bandId,
    bandName,
    bandPic,
    bandBio,
    bandOrigin,
    bandActive,
    bandYearsActive,
  });
  const [file, setFile] = useState<File | null>(null);

  const handleUpdateClick = () => {
    console.log("Band ID: ", bandId);
    console.log("Band Name: ", bandYearsActive);
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bandId = formData.bandId!;

    const updateBandData: Partial<typeof formData> = { bandId };

    if (formData.bandName.trim() !== "") {
      updateBandData.bandName = formData.bandName;
    }
    if (formData.bandBio.trim() !== "") {
      updateBandData.bandBio = formData.bandBio;
    }

    if (file) {
      const cloudName = "your-cloud-name";
      const uploadPreset = "your-upload-preset";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dgayr62l");
      formData.append("api_key", "684664141884165");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData },
        );
        if (res.ok) {
          const data = await res.json();
          updateBandData.bandPic = data.url;
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        setIsSubmitting(false);
        return;
      }
    } else {
      updateBandData.bandPic = formData.bandPic;
    }

    if (formData.bandOrigin.trim() !== "") {
      updateBandData.bandOrigin = formData.bandOrigin;
    }

    updateBandData.bandActive = formData.bandActive;

    if (formData.bandYearsActive.trim() !== "") {
      updateBandData.bandYearsActive = formData.bandYearsActive;
    }

    try {
      const updatedBand = await UpdateBandActions(updateBandData);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error update: ", error);
      throw Error;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Pencil onClick={handleUpdateClick} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 flex-col rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">Band Edit</h2>
            <div className="my-4">
              <Input
                name="bandName"
                placeholder="Band Name"
                value={formData.bandName}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandBio"
                placeholder="Band Bio"
                value={formData.bandBio}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandOrigin"
                placeholder="Band Origin"
                value={formData.bandOrigin}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandYearsActive"
                placeholder="Band Years Active"
                value={formData.bandYearsActive}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
            </div>
            <Button
              type="button"
              className="me-4 mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}
