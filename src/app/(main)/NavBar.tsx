import Link from "next/link";
import UserButton from "@/components/UserButton";
import SearchField from "@/components/SearchField";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-card px-2 py-2 shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
        <Link href="/" className="text-2xl font-bold text-primary">
          NWHC
        </Link>
        <div className="flex items-center justify-between">
          <div className="">
            <SearchField />
          </div>
          <h5 className="mx-2">For the community by the community.</h5>
          <div className="mx-1">
            <UserButton className="sm:ms-auto" />
          </div>
        </div>
      </div>
    </header>
  );
}
