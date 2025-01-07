// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { cn } from "@/lib/utils";
// import { useQueryClient } from "@tanstack/react-query";
// import {
//   Check,
//   LogIn,
//   LogOutIcon,
//   Monitor,
//   Moon,
//   Sun,
//   UserIcon,
// } from "lucide-react";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import UserAvatar from "./UserAvatar";
// import { logout } from "@/app/(auth)/actions";

// interface UserButtonProps {
//   className?: string;
// }

// export default function UserButton({ className }: UserButtonProps) {
//   const { user } = useSession() || { user: null };

//   const { theme, setTheme } = useTheme();

//   return (
//     <>
//       {user ? (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className={cn("flex-none rounded-full", className)}>
//               <UserAvatar avatarUrl={user.avatarUrl} size={40} />
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuSub>
//               <DropdownMenuSubTrigger>
//                 <Monitor className="mr-2 size-4">Theme</Monitor>
//               </DropdownMenuSubTrigger>
//               <DropdownMenuPortal>
//                 <DropdownMenuSubContent>
//                   <DropdownMenuItem onClick={() => setTheme("system")}>
//                     <Monitor className="mr-2 size-4" /> System default
//                     {theme === "system" && <Check className="ms-2 size-4" />}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setTheme("light")}>
//                     <Sun className="mr-2 size-4" /> Light
//                     {theme === "light" && <Check className="ms-2 size-4" />}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setTheme("dark")}>
//                     <Moon className="mr-2 size-4" /> Dark
//                     {theme === "dark" && <Check className="ms-2 size-4" />}
//                   </DropdownMenuItem>
//                 </DropdownMenuSubContent>
//               </DropdownMenuPortal>
//             </DropdownMenuSub>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               onClick={() => {
//                 logout();
//               }}
//             >
//               <LogOutIcon className="mr-2 size-4" /> Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ) : (
//         <Link href="/login">
//           <LogIn
//             size={28}
//             className={cn("flex-none rounded-full", className)}
//           />
//         </Link>
//       )}
//     </>
//   );
// }
