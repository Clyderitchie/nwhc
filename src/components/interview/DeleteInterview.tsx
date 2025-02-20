"use client";

import { DeleteInterview } from "@/app/(main)/interviews/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface InterviewDeleteProps {
  interviewId: string;
}

export default function InterviewDelete({ interviewId }: InterviewDeleteProps) {
  const { user } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!interviewId) return;
    setIsDeleting(true);
    try {
      await DeleteInterview(interviewId);
      alert("Interview was deleted successfully");
      window.location.href = "/interviews";
    } catch (error) {
      console.error("Failed to delete: ", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Trash2 onClick={handleDelete} />
    </>
  );
}
