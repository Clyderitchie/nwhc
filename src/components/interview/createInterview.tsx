" use client";

import { NewInterview } from "@/app/(main)/interviews/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CreateNewInterviewProps {
  className?: string;
  formData: {
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
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: (formData: CreateNewInterviewProps["formData"]) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateInterview({
  className,
  formData,
  handleChange,
  setFormData,
  isSubmitting,
  setIsSubmitting,
}: CreateNewInterviewProps) {
  const { user } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const interviewData = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
      questions: formData.questions,
      answers: formData.answers,
      pics: formData.pics,
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
    };

    try {
      const newInterview = await NewInterview(interviewData);
      console.log("New interview created: ", newInterview);
      router.push(`/interviews`);
    } catch (error) {
      console.error("With interview: ", error);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <CirclePlus
          className={className}
          onClick={() => setIsModalOpen(true)}
        />
        <span className="mx-3 text-lg">Create new Interview</span>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="max-h-96 min-h-96 w-96 overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">New Interview Information:</h2>
            <div>
              <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="questions"
                placeholder="Questions"
                value={formData.questions}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <Input
                name="answers"
                placeholder="Answers"
                value={formData.answers}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
               <Input
                name="pics"
                placeholder="Pics"
                value={formData.pics}
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
