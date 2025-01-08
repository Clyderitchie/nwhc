"use client";

import { DeleteBand } from "@/app/(main)/bands/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface BandDeleteProps {
  bandId: string;
}

export default function BandDelete({ bandId }: BandDeleteProps) {
  const { user } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!bandId) return;
    setIsDeleting(true);
    try {
      await DeleteBand(bandId);
      alert("Band was successfully deleted");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete the band");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
    <Trash2 onClick={handleDelete} />
    </>
  )
}
