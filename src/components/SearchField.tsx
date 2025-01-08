"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push(`/bands?q=${query}`);
    setIsModalOpen(false);
  }

  return (
    <>
      <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <form onSubmit={handleSubmit} method="GET" action="/customers">
              <div className="relative">
                <Input
                  name="q"
                  placeholder="Search"
                  className="pe-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
