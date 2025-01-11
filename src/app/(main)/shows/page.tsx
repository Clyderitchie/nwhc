"use client";

import CreateShow from "@/components/show/CreateShow";
import ShowList from "@/components/show/ShowList";
import { useState } from "react";

export default function Shows() {
  const [formData, setFormData] = useState({
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
      <h1>Shows</h1>
      <div>
        <CreateShow
          formData={formData}
          handleChange={handleChange}
          isSubmitting={false}
          setIsSubmitting={() => {}}
        />
        <ShowList />
      </div>
    </>
  );
}
