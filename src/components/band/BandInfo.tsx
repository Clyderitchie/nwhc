"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import BandLinks from "./BandLinks";

interface BandInfoProps {
  bandName: string;
  bandBio: string;
  bandOrigin: string;
  bandYearsActive: string;
}

export default function BandIno({
  bandName,
  bandBio,
  bandOrigin,
  bandYearsActive,
}: BandInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <InfoIcon onClick={handleClick} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 flex-col rounded-lg bg-white p-6 shadow-lg">
          <h1 className="font-bold text-2xl text-center">{bandName}</h1>
            <div className="my-4 flex-col p-2">
              <p>Bio: {bandBio}</p>
              <p>Years Active: {bandYearsActive}</p>
              <p>From: {bandOrigin}</p>
            </div>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}
