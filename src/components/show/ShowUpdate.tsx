"use client";

import { UpdateShowActions } from "@/app/(main)/shows/actions";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ShowUpdateProps {
  showId: string;
  showName: string;
  flyerLink: string | null;
  showInfo: string;
  showTime: string;
  showLocation: string;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function ShowUpdate({
  showId,
  showName,
  flyerLink,
  showInfo,
  showTime,
  showLocation,
  isSubmitting,
  setIsSubmitting,
}: ShowUpdateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    showId,
    showName,
    flyerLink,
    showInfo,
    showTime,
    showLocation,
  });
  const [file, setFile] = useState<File | null>(null);

  const handleUpdateClick = () => {
    console.log("Show id: ", showId);
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

    const showId: string = formData.showId!;

    const updateShowData: {
      showId: string;
      showName?: string;
      flyerLink?: string | undefined;
      showInfo?: string;
      showTime?: string;
      showLocation?: string;
    } = { showId };

    if (formData.showName.trim() !== "") {
      updateShowData.showName = formData.showName;
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
          updateShowData.flyerLink = data.url;
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        setIsSubmitting(false);
        return;
      }
    } else {
      updateShowData.flyerLink =
        formData.flyerLink !== null ? formData.flyerLink : undefined;
    }

    if (formData.showInfo.trim() !== "") {
      updateShowData.showInfo = formData.showInfo;
    }

    if (formData.showTime.trim() !== "") {
      updateShowData.showTime = formData.showTime;
    }

    if (formData.showLocation.trim() !== "") {
      updateShowData.showLocation = formData.showLocation;
    }

    try {
      const updateShow = await UpdateShowActions(updateShowData);
      setIsModalOpen(false);
      window.location.reload();
      return updateShow;
    } catch (error) {
      console.error("Could not update: ", error);
      throw error;
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
            <h2 className="text-center text-2xl">Show Edit</h2>
            <div className="my-4">
              <Input
                name="showName"
                placeholder="Show Name"
                value={formData.showName}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="showInfo"
                placeholder="Show Info"
                value={formData.showInfo}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="showTime"
                placeholder="Show Time"
                value={formData.showTime}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="showLocation"
                placeholder="Show Location"
                value={formData.showLocation}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <input
                type="file"
                onChange={handleFileChange}
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
