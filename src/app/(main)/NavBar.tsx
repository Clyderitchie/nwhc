import Link from "next/link";
import UserButton from "@/components/UserButton";
import SearchField from "@/components/SearchField";
import NavMenu from "@/components/NavMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-card px-2 py-2 shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-between gap-5 lg:flex-row">
        <Link href="/" className="text-2xl font-bold text-primary">
          NWHC
        </Link>
        <div className="flex items-center justify-between">
          <h5 className="pe-2">For the community by the community.</h5>
          <UserButton className="sm:ms-auto" />
          <SearchField />
          <NavMenu/>
        </div>
      </div>
    </header>
  );
}
