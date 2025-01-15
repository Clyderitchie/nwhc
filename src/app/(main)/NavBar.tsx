import Link from "next/link";
import { useEffect, useState } from "react";
//  TODO: Refactor layout think mobile first md: screen and larger will be the current layout you have now.
// Also refactor spacing between the icons
import { useSession } from "./SessionProvider";
import UserButton from "@/components/UserButton";
import SearchField from "@/components/SearchField";
import CreateBand from "@/components/band/CreateNewBand";
import NavMenu from "@/components/MenuButton";

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
    <header className="sticky top-0 z-20 bg-card shadow-lg px-2 py-2">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 ">
        <Link href="/" className="text-2xl font-bold text-primary">
          NWHC
        </Link>
        <div className="flex items-center justify-between">
          <div className="">
            <SearchField />
          </div>
          {user ? (
            <CreateBand
              formData={formData}
              handleChange={handleChange}
              isSubmitting={false}
              setIsSubmitting={() => {}}
            />
          ) : (
        <h5 className="mx-2">For the community by the community.</h5>
          )}
          <div className="mx-1">
            <UserButton className="sm:ms-auto" />
          </div>
        </div>
      </div>
    </header>
  );
}
