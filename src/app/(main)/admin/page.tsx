"use client";
import CreateBand from "@/components/band/CreateNewBand";
import CreateShow from "@/components/show/CreateShow";
import { useSession } from "../SessionProvider";
import { useState } from "react";

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
      <h1>Admin page</h1>
      <div>
        <CreateBand
          formData={formData}
          handleChange={handleChange}
          isSubmitting={false}
          setIsSubmitting={() => {}}
        />
      </div>
      <div className="flex justify-center items-center border ">
      <CreateShow 
         formData={formData}
         handleChange={handleChange}
         isSubmitting={false}
         setIsSubmitting={() => {}}/>
      </div>
    </>
  );
}
