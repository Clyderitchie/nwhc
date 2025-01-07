"use client"

import CreateBand from "@/components/band/CreateNewBand"
import { useState } from "react";


export default function Bands() {
    const [formData, setFormData] = useState({
        bandName: "",
        bandPic: "",
        bandBio: "",
        bandCampLink: "",
        bandAppleLink: "",
        bandSpotifyLink: "",
        bandOtherMusicLink: ""
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
        <h1>Bands</h1>
        <div>
            <CreateBand formData={formData}
              handleChange={handleChange}
              isSubmitting={false}
              setIsSubmitting={() => {}}
              />
        </div>
        </>
    )
}