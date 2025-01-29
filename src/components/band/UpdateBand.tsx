"use client";

import { UpdateBand } from "@/app/(main)/bands/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";

interface BandUpdateProps {
  formData: {
    bandId: string;
    bandName?: string;
    bandPic?: string;
    bandBio?: string;
    bandOrigin?: string;
    bandActive?: string;
    bandYearsActive?: string;
    bandCampLink?: string;
    bandAppleLink?: string;
    bandSpotifyLink?: string;
    bandOtherMusicLink?: string;
  };

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function BandUpdate({
  formData,
  handleChange,
  isSubmitting,
  setIsSubmitting,
}: BandUpdateProps) {
  //   const [formData, setFormData] = useState({
  //     bandId: "",
  //     bandName: "",
  //     bandPic: "",
  //     bandBio: "",
  //     bandOrigin: "",
  //     bandActive: "",
  //     bandYearsActive: "",
  //     bandCampLink: "",
  //     bandAppleLink: "",
  //     bandSpotifyLink: "",
  //     bandOtherMusicLink: "",
  //   });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let imageUrl = formData.bandPic;

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

    const updatedBandData = {
      bandId: formData.bandId,
      bandName: formData.bandName,
      bandPic: imageUrl,
      bandBio: formData.bandBio,
      bandOrigin: formData.bandOrigin,
      bandActive: formData.bandActive,
      bandYearsActive: formData.bandYearsActive,
      bandCampLink: formData.bandCampLink,
      bandAppleLink: formData.bandAppleLink,
      bandSpotifyLink: formData.bandSpotifyLink,
      bandOtherMusicLink: formData.bandOtherMusicLink,
    };

    try {
      const UpdatedBand = await UpdateBand(updatedBandData);
      //   router.push(`/bands`);
      window.location.reload();
    } catch (error) {
      console.error("Failed to created a band");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <CirclePlus onClick={() => setIsModalOpen(true)} />
        <span className="mx-3 text-lg">Update</span>
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
              <Input
                name="bandActive"
                placeholder="Band Active"
                value={formData.bandActive}
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
              <Input
                name="bandCampLink"
                placeholder="Band Camp link"
                value={formData.bandCampLink}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandAppleLink"
                placeholder="Apple Music link"
                value={formData.bandAppleLink}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandSpotifyLink"
                placeholder="Spotify Link"
                value={formData.bandSpotifyLink}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="bandOtherMusicLink"
                placeholder="Other music link"
                value={formData.bandOtherMusicLink}
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
