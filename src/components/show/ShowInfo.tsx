"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface ShowInfoProps {
  showName: string;
  showInfo: string;
  showTime: string;
  showLocation: string;
}

export default function ShowInfo({
  showName,
  showInfo,
  showTime,
  showLocation,
}: ShowInfoProps) {
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
            <h1 className="text-center text-2xl font-bold">{showName}</h1>
            <div className="my-4 flex-col p-2">
              <p>Info: {showInfo}</p>
              <p>Time: {showTime}</p>
              <p>Location: {showLocation}</p>
            </div>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
}
