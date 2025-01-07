import Link from "next/link";
import { useEffect, useState } from "react";

import { useSession } from "./SessionProvider";

export default function Navbar() {
  const { user } = useSession() || { user: null };
//   const [formData, setFormData] = useState({
//     projectName: "",
//     projectLink: "",
//     githubLink: "",
//     bio: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  return (
    <header className="sticky top-0 z-20 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          NWHC
        </Link>
        <div className="flex items-center justify-around px-2">
        </div>
      </div>
    </header>
  );
}
