"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { NewShow } from "@/app/(main)/shows/actions";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CreateNewShowProps {
  className?: string;
  formData: {
    showName: string;
    flyerLink: string;
    showInfo: string;
    bandId: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateShow({
  className,
  formData,
  handleChange,
  isSubmitting,
  setIsSubmitting,
}: CreateNewShowProps) {
  const { user } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let showImageUrl = "";

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
          showImageUrl = data.url;
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        setIsSubmitting(false);
        return;
      }
    }

    const showData = {
      showName: formData.showName,
      flyerLink: showImageUrl,
      showInfo: formData.showInfo,
    };

    try {
      const newShow = await NewShow(showData);
      router.push(`/shows`);
      window.location.reload();
    } catch (error) {
      console.error("Error creating the show");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <CirclePlus className={className} onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">New Show Information:</h2>
            <div>
              <Input
                name="showName"
                placeholder="Show Name"
                value={formData.showName}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <input
                type="file"
                onChange={(e) => {
                  console.log(
                    "File selected:",
                    e.target.files ? e.target.files[0] : null,
                  );
                  setFile(e.target.files ? e.target.files[0] : null);
                }}
              />
              <Input
                name="showInfo"
                placeholder="Show Info"
                value={formData.showInfo}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
            </div>
            <Button
              type="button"
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
