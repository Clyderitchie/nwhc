"use client";
import CreateBand from "@/components/band/CreateNewBand";
import CreateShow from "@/components/show/CreateShow";
import { useSession } from "../SessionProvider";
import { useState } from "react";
import Link from "next/link";

interface AdminPageProps {
  bandId: string;
  showId: string;
}

export default function AdminPage({ bandId, showId }: AdminPageProps) {
  const { user } = useSession();
  const [formData, setFormData] = useState({
    bandName: "",
    bandPic: "",
    bandBio: "",
    bandOrigin: "",
    bandActive: "",
    bandYearsActive: "",
    bandCampLink: "",
    bandAppleLink: "",
    bandSpotifyLink: "",
    bandOtherMusicLink: "",
    showName: "",
    flyerLink: "",
    showInfo: "",
    bandId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-w-full max-w-full flex-col">
        <div className="my-5">
          <CreateBand
            formData={formData}
            handleChange={handleChange}
            isSubmitting={false}
            setIsSubmitting={() => {}}
          />
        </div>
        <div className="my-5">
          <CreateShow
            formData={formData}
            handleChange={handleChange}
            isSubmitting={false}
            setIsSubmitting={() => {}}
          />
        </div>
      </div>
    </>
  );
}
