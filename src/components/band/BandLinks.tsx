"use client";
import { useState } from "react";
import { Music } from "lucide-react";
import { Button } from "../ui/button"; // Adjust the import path as necessary
import Link from "next/link";

interface BandLinkProps {
  bandCampLink: string | null;
  bandAppleLink: string | null;
  bandSpotifyLink: string | null;
  bandOtherMusicLink: string | null;
}

export default function BandLinks({
  bandCampLink,
  bandAppleLink,
  bandSpotifyLink,
  bandOtherMusicLink,
}: BandLinkProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMusicIconClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Music onClick={handleMusicIconClick} />
        <span className="ms-1">Music links.</span>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 flex-col rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">Band Links</h2>
            <div className="my-4">
              <div>
                <Link
                  href={bandAppleLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Music
                </Link>
              </div>
              <div>
                <Link
                  href={bandSpotifyLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </Link>
              </div>

              <div>
                <Link
                  href={bandCampLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BandCamp
                </Link>
              </div>
              <div>
                <Link
                  href={bandOtherMusicLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Other Media
                </Link>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}
