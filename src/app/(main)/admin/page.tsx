"use client";

  import CreateBand from "@/components/band/CreateNewBand";
  import CreateShow from "@/components/show/CreateShow";
  import { useSession } from "../SessionProvider";
  import { useState } from "react";
  import CreateInterview from "@/components/interview/createInterview";

  export default function AdminPage() {
    const { user } = useSession();
    const [bandFormData, setBandFormData] = useState<{
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
    }>({
      bandName: "",
      bandPic: "",
      bandBio: "",
      bandOrigin: "",
      bandActive: false,
      bandYearsActive: "",
      appleMusic: "",
      spotifyMusic: "",
      bandCamp: "",
      twitter: "",
      instagram: "",
      shop: "",
    });

    const [interviewFormdata, setInterviewFormData] = useState<{
      title: string;
      content: string;
      author: string;
      questions: string;
      answers: string;
      pics: string;
      appleMusic?: string;
      spotifyMusic?: string;
      bandCamp?: string;
      twitter?: string;
      instagram?: string;
      shop?: string;
    }>({
      title: "",
      content: "",
      author: "",
      questions: "",
      answers: "",
      pics: "",
      appleMusic: "",
      spotifyMusic: "",
      bandCamp: "",
      twitter: "",
      instagram: "",
      shop: "",
    });

    const [showFormData, setShowFormData] = useState<{
      showName: string;
      flyerLink: string;
      showInfo: string;
      bandId: string;
      showTime: string;
      showLocation: string;
      appleMusic?: string;
      spotifyMusic?: string;
      bandCamp?: string;
      twitter?: string;
      instagram?: string;
      shop?: string;
    }>({
      showName: "",
      flyerLink: "",
      showInfo: "",
      bandId: "",
      showTime: "",
      showLocation: "",
      appleMusic: "",
      spotifyMusic: "",
      bandCamp: "",
      twitter: "",
      instagram: "",
      shop: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBandChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      setBandFormData({ ...bandFormData, [e.target.name]: e.target.value });
    };

    const handleShowChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      setShowFormData({ ...showFormData, [e.target.name]: e.target.value });
    };

    const handleInterviewChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      setInterviewFormData({
        ...interviewFormdata,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <>
        <div className="min-w-full max-w-full flex-col">
          <div className="my-5">
            <CreateBand
              formData={bandFormData}
              setFormData={setBandFormData}
              handleChange={handleBandChange}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
          <div className="my-5">
            <CreateShow
              formData={showFormData}
              setFormData={setShowFormData}
              handleChange={handleShowChange}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
          <div className="my-5">
            <CreateInterview
              formData={interviewFormdata}
              setFormData={setInterviewFormData}
              handleChange={handleInterviewChange}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
        </div>
      </>
    );
  }