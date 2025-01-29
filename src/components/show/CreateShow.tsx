"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { NewShow } from "@/app/(main)/shows/actions";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FindAllBands, getBand } from "@/app/(main)/bands/actions";
import { BandData } from "@/lib/types";

interface CreateNewShowProps {
  className?: string;
  formData: {
    showName: string;
    flyerLink: string;
    showInfo: string;
    bandId: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export default function CreateShow({
  className,
  formData,
  handleChange,
  isSubmitting,
  setIsSubmitting,
}: CreateNewShowProps) {
  const { user } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [bands, setBands] = useState<BandData[]>([]);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const bandList = await FindAllBands();
        setBands(bandList);
      } catch (error) {
        console.error("Error fetching bands");
      }
    };
    fetchBands();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let showImageUrl = "";

    if (file) {
      const cloudName = "your-cloud-name";
      const uploadPreset = "your-upload-preset";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dgayr62l");
      formData.append("api_key", "684664141884165");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData },
        );
        if (res.ok) {
          const data = await res.json();
          showImageUrl = data.url;
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        setIsSubmitting(false);
        return;
      }
    }

    const showData = {
      showName: formData.showName,
      flyerLink: showImageUrl,
      showInfo: formData.showInfo,
      bandId: formData.bandId
    };

    try {
      const newShow = await NewShow(showData);
      router.push(`/shows`);
      window.location.reload();
    } catch (error) {
      console.error("Error creating the show");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

//   return (
//     <>
//       <div className="flex items-center">
//         <CirclePlus
//           className={className}
//           onClick={() => setIsModalOpen(true)}
//         />
//         <span className="mx-3 text-lg">Create new Show</span>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-opacity-50">
//           <div className="max-h-fit w-96 rounded-lg bg-white p-6 shadow-lg">
//             <h2 className="text-center text-2xl">New Show Information:</h2>
//             <div>
//               <Input
//                 name="showName"
//                 placeholder="Show Name"
//                 value={formData.showName}
//                 onChange={handleChange}
//                 className="my-7 min-w-full"
//               />
//               <input
//                 type="file"
//                 onChange={(e) => {
//                   console.log(
//                     "File selected:",
//                     e.target.files ? e.target.files[0] : null,
//                   );
//                   setFile(e.target.files ? e.target.files[0] : null);
//                 }}
//               />
//               <Input
//                 name="showInfo"
//                 placeholder="Show Info"
//                 value={formData.showInfo}
//                 onChange={handleChange}
//                 className="my-7 min-w-full"
//               />
//             </div>
//             <Button
//               type="button"
//               className="me-4 mt-4 rounded bg-blue-500 px-4 py-2 text-white"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </Button>
//             <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
//               Cancel
//             </Button>
//           </div>
//         </div>
//       )}
//     </>
//   );


return (
    <>
      <div className="flex items-center">
        <CirclePlus
          className={className}
          onClick={() => setIsModalOpen(true)}
        />
        <span className="mx-3 text-lg">Create new Show</span>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-opacity-50">
          <div className="max-h-fit w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl">New Show Information:</h2>
            <div>
              <Input
                name="showName"
                placeholder="Show Name"
                value={formData.showName}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
              <input
                type="file"
                onChange={(e) => {
                  console.log(
                    "File selected:",
                    e.target.files ? e.target.files[0] : null,
                  );
                  setFile(e.target.files ? e.target.files[0] : null);
                }}
              />
              <Input
                name="showInfo"
                placeholder="Show Info"
                value={formData.showInfo}
                onChange={handleChange}
                className="my-7 min-w-full"
              />
               <label htmlFor="bandId" className="block text-sm font-medium text-gray-700">
                Band
              </label>
              <select
                name="bandId"
                value={formData.bandId}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a band</option>
                {bands.map((band) => (
                  <option key={band.id} value={band.id}>
                    {band.bandName}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="button"
              className="me-4 mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
