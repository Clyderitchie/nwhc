// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { useTheme } from "next-themes";
// import Link from "next/link";

// interface NavMenuProps {
//   className?: string;
// }

// export default function NavMenu({ className }: NavMenuProps) {
//   const { user } = useSession();

//   const { theme, setTheme } = useTheme();

//   return (
//     <>
//       <div className="fixed bottom-0 right-0 px-10 py-3">
//         <div className="flex-col items-center">
//           <Link href="/projects">
//             <h3 className="py-5">Projects</h3>
//           </Link>
//           <Link href="/about">
//             <h3 className="py-5">About</h3>
//           </Link>
//           <Link href="/resume">
//             <h3 className="py-5">Resume</h3>
//           </Link>
//           <Link href="/contact">
//             <h3 className="py-5">Contact</h3>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
