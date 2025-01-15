"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { DeleteShow } from "@/app/(main)/shows/actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface ShowDeleteProps {
  showId: string;
}

export default function ShowDelete({ showId }: ShowDeleteProps) {
  const { user } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!showId) return;
    setIsDeleting(true);
    try {
        await DeleteShow(showId);
        alert("Show was deleted.");
        window.location.reload();
    } catch (error) {
      console.error("Error deleting this show");
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
