"use client";
import { useState } from "react";
import { Music } from "lucide-react";
import { Button } from "../ui/button"; // Adjust the import path as necessary
import Link from "next/link";

interface BandLinkProps {
  links: {
    id: string;
    appleMusic: string | null;
    spotifyMusic: string | null;
    bandCamp: string | null;
    twitter: string | null;
    instagram: string | null;
    shop: string | null;
  }[];
}

export default function BandLinks({ links = [] }: BandLinkProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMusicIconClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Music onClick={handleMusicIconClick} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 flex-col rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">Band Links</h2>
            <div className="my-4">
              {links.map((link) => (
                <div key={link.id} className="my-2 p-5">
                  {link.appleMusic && (
                    <div className="my-2 rounded-lg bg-card text-center shadow-lg">
                      <Link
                        href={link.appleMusic ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apple Music
                      </Link>
                    </div>
                  )}
                  {link.spotifyMusic && (
                    <div className="my-2 rounded-lg bg-card text-center shadow-lg">
                      <Link
                        href={link.spotifyMusic ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Spotify
                      </Link>
                    </div>
                  )}
                  {link.bandCamp && (
                    <div className="my-2 rounded-lg bg-card text-center shadow-lg">
                      <Link
                        href={link.bandCamp ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BandCamp
                      </Link>
                    </div>
                  )}
                  {link.instagram && (
                    <div className="my-2 rounded-lg bg-card text-center shadow-lg">
                      <Link
                        href={link.instagram ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </Link>
                    </div>
                  )}
                  {link.twitter && (
                    <div className="my-2 rounded-lg bg-card text-center shadow-lg">
                      <Link
                        href={link.twitter ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </Link>
                    </div>
                  )}
                  {link.shop && (
                    <div className="my-2 rounded-lg bg-card text-center shadow-lg">
                      <Link
                        href={link.shop ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Shop
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}
