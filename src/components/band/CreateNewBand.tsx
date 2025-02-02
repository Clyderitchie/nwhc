"use client";

import { NewBand } from "@/app/(main)/bands/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CreateNewBandProps {
  className?: string;
  formData: {
    bandName: string;
    bandPic: string;
    bandBio: string;
    bandOrigin: string;
    bandActive: boolean;
    bandYearsActive: string;
    appleMusic?: string;
    spotifyMusic?: string;
    bandCamp?: string;
    twitter?: string;
    instagram?: string;
    shop?: string;
    showName?: string;
    showImageUrl?: string;
    showInfo?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: (formData: CreateNewBandProps["formData"]) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateBand({
  className,
  formData,
  handleChange,
  setFormData,
  isSubmitting,
  setIsSubmitting,
}: CreateNewBandProps) {
  const { user } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let imageUrl = "";

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
          imageUrl = data.url;
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        setIsSubmitting(false);
        return;
      }
    }

    const bandData = {
      bandName: formData.bandName,
      bandPic: imageUrl,
      bandBio: formData.bandBio,
      bandOrigin: formData.bandOrigin,
      bandActive: formData.bandActive,
      bandYearsActive: formData.bandYearsActive,
      link: [
        {
          appleMusic: formData.appleMusic || "",
          spotifyMusic: formData.spotifyMusic || "",
          bandCamp: formData.bandCamp || "",
          twitter: formData.twitter || "",
          instagram: formData.instagram || "",
          shop: formData.shop || "",
        },
      ],
      show: formData.showName
        ? [
            {
              showName: formData.showName,
              flyerLink: formData.showImageUrl,
              showInfo: formData.showInfo,
            },
          ]
        : [],
    };

    try {
      const newBand = await NewBand(bandData);
      console.log("Creating new band: ", bandData);
      router.push(`/bands`);
      window.location.reload();
    } catch (error) {
      console.error("Failed to create a band");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const handleBooleanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true"; // Convert string to boolean
    setFormData({ ...formData, bandActive: value });
  };

  return (
    <>
      <div className="flex items-center">
        <CirclePlus
          className={className}
          onClick={() => setIsModalOpen(true)}
        />
        <span className="mx-3 text-lg">Create new band</span>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="max-h-96 min-h-96 w-96 overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">New Band Information:</h2>
            <div>
              <Input
                name="bandName"
                placeholder="Band Name"
                value={formData.bandName}
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
                name="bandBio"
                placeholder="Band Bio"
                value={formData.bandBio}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandOrigin"
                placeholder="Band Origin"
                value={formData.bandOrigin}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <label
                htmlFor="bandActive"
                className="block text-sm font-medium text-gray-700"
              >
                Band Active
              </label>
              <select
                name="bandActive"
                value={formData.bandActive ? "true" : "false"} // Convert boolean to string for display
                onChange={handleBooleanChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <Input
                name="bandYearsActive"
                placeholder="Band Years Active"
                value={formData.bandYearsActive}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="appleMusic"
                placeholder="Apple Music link"
                value={formData.appleMusic || ""}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="spotifyMusic"
                placeholder="Spotify Music link"
                value={formData.spotifyMusic || ""}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandCamp"
                placeholder="BandCamp link"
                value={formData.bandCamp || ""}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="twitter"
                placeholder="Twitter link"
                value={formData.twitter || ""}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="instagram"
                placeholder="Instagram link"
                value={formData.instagram || ""}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="shop"
                placeholder="Shop link"
                value={formData.shop || ""}
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
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
