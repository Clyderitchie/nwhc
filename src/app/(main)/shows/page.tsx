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
      <div className="flex justify-center items-center">
        <CreateShow
          formData={formData}
          handleChange={handleChange}
          isSubmitting={false}
          setIsSubmitting={() => {}}
        />
      </div>
      <div className="flex max-h-screen min-h-screen min-w-full max-w-full items-start justify-center">
        <ShowList />
      </div>
    </>
  );
}
