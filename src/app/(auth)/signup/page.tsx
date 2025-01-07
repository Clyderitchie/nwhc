// In Next.Js a 'page.tsx' file creates a page under the url of the folder system you are in
// Since Auth is in () it will not show up in the url. But if wasn't it would look like this.
// /signup at the end of the url and where these page would render
// Sign up form must be in a different file. This is because THIS file is a server side render.
// It is smart to render as MUCH as you can on server side rather then client side render

import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign  up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="shadow-2xl flex h-ful max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to this Clone site</h1>
            <p className="text-muted-foreground">
              A lace where even <span className="italic">you</span> can find a
              friend
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm/>
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
       
      </div>
    </main>
  );
}
