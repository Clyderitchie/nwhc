"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Band {
  bandName: string;
  bandPic: string;
  bandBio: string;
  bandCampLink: string;
  bandAppleLink: string;
  bandSpotifyLink: string;
  bandOtherMusicLink: string;
}

export default function SearchField() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push(`/bands?q=${query}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/customers">
      <div className="relative">
        <Input
          name="q"
          placeholder="Search"
          className="pe-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}
