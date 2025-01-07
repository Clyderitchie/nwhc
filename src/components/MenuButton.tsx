"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import UpdateProject from "./projects/UpdateProject";
// import DeleteProject from "./projects/DeleteProject";


interface MenuButtonProps {
  className?: string;
  projectId: string;
  projectName: string;
  projectLink: string;
  githubLink: string;
  bio: string;
}

export default function MenuButton({
  className,
  projectId,
  projectName,
  projectLink,
  bio,
}: MenuButtonProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible((prev) => !prev);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <button onClick={toggleTooltip} className={`p-2 ${className}`}>
        <Ellipsis />
      </button>
      {tooltipVisible && (
        <div className="absolute right-0 z-10 mt-2 flex w-40 items-baseline justify-around rounded-lg bg-gray-800 p-3 text-white shadow-lg">
          <UpdateProject
            projectId={projectId}
            projectName={""}
            githubLink={""}
            projectLink={""}
            bio={""}
          />
          {/* <DeleteProject projectId={projectId} /> */}
        </div>
      )}
    </div>
  );
}
