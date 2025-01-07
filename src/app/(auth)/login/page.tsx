// Code that renders to the user side.
// Path in the URL for this page is /login

import { Metadata } from "next";
import LoginForm from "./LoginForm";



export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return(
  <main className="flex h-screen items-center justify-center p-5">
    <div className=" flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
      <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
        <h1 className="text-center text-3xl font-bold">
          Log in
        </h1>
        <div className="space-y-5">
          <LoginForm />
        </div>
      </div>
     
    </div>
  </main>
  )
}
