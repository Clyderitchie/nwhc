// "use client";

// import CreateBand from "@/components/band/CreateNewBand";
// import CreateShow from "@/components/show/CreateShow";
// import { useSession } from "../SessionProvider";
// import { useState } from "react";

// export default function AdminPage() {
//   const { user } = useSession();
//   const [formData, setFormData] = useState({
//     bandName: "",
//     bandPic: "",
//     bandBio: "",
//     bandOrigin: "",
//     bandActive: false,
//     bandYearsActive: "",
//     appleMusic: "",
//     spotifyMusic: "",
//     bandCamp: "",
//     twitter: "",
//     instagram: "",
//     shop: "",
//     showName: "",
//     showImageUrl: "",
//     showInfo: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
// const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   return (
//     <>
//       <div className="min-w-full max-w-full flex-col">
//         <div className="my-5">
//           <CreateBand
//             formData={formData}
//             setFormData={setFormData}
//             handleChange={handleChange}
//             isSubmitting={false}
//             setIsSubmitting={() => {}}
//           />
//         </div>
//         <div className="my-5">
//           <CreateShow
//             formData={formData}
//             handleChange={handleChange}
//             isSubmitting={false}
//             setIsSubmitting={() => {}}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import CreateBand from "@/components/band/CreateNewBand";
import CreateShow from "@/components/show/CreateShow";
import { useSession } from "../SessionProvider";
import { useState } from "react";
import CreateInterview from "@/components/interview/createInterview";

export default function AdminPage() {
  const { user } = useSession();
  const [formData, setFormData] = useState({
    bandName: "",
    bandPic: "",
    bandBio: "",
    bandOrigin: "",
    bandActive: false,
    bandYearsActive: "",
    appleMusic: "",
    spotifyMusic: "",
    bandCamp: "",
    twitter: "",
    instagram: "",
    shop: "",
    showName: "",
    showImageUrl: "",
    showInfo: "",
    title: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="min-w-full max-w-full flex-col">
        <div className="my-5">
          <CreateBand
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </div>
        <div className="my-5">
          <CreateShow
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </div>
        <div className="my-5">
          <CreateInterview
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </div>
      </div>
    </>
  );
}
