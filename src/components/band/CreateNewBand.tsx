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
    bandCampLink: string;
    bandAppleLink: string;
    bandSpotifyLink: string;
    bandOtherMusicLink: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateBand({
  className,
  formData,
  handleChange,
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
      bandCampLink: formData.bandCampLink,
      bandAppleLink: formData.bandAppleLink,
      bandSpotifyLink: formData.bandSpotifyLink,
      bandOtherMusicLink: formData.bandOtherMusicLink,
    };

    try {
      const newBand = await NewBand(bandData);
      router.push(`/bands`);
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
      <CirclePlus className={className} onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">New Band Information:</h2>
            <div>
              <Input
                name="bandName"
                placeholder="Band Name"
                value={formData.bandName}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              {/* <Input
                name="bandPic"
                placeholder="Band Pic"
                value={formData.bandPic}
                onChange={handleChange}
                className="my-7 min-w-full"
              /> */}
              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="my-7 min-w-full"
              />
              <Input
                name="bandBio"
                placeholder="Band Bio"
                value={formData.bandBio}
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
