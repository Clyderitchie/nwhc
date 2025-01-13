import Link from "next/link";
import { useEffect, useState } from "react";

import { useSession } from "./SessionProvider";
import UserButton from "@/components/UserButton";
import SearchField from "@/components/SearchField";
import CreateBand from "@/components/band/CreateNewBand";

export default function Navbar() {
  const { user } = useSession() || { user: null };
  const [formData, setFormData] = useState({
    bandName: "",
    bandPic: "",
    bandBio: "",
    bandCampLink: "",
    bandAppleLink: "",
    bandSpotifyLink: "",
    bandOtherMusicLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <header className="sticky top-0 z-20 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          NWHC
        </Link>
        <div>
          <SearchField />
        </div>
        <div className="flex items-center justify-between px-2">
          <UserButton className="sm:ms-auto" />
          <CreateBand
            formData={formData}
            handleChange={handleChange}
            isSubmitting={false}
            setIsSubmitting={() => {}}
          />
        </div>
      </div>
    </header>
  );
}
