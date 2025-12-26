"use client";

// import { useFormState } from "react-dom";
import SignupForm from "@/components/signup-form";
import { Suspense } from "react";
export default function Page() {

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-blue-100">
      <div className="border-2 border-slate-300 p-10 rounded-lg bg-white">
        <div className="flex justify-center mb-3 font-semibold rounded-sm bg-blue-300">
          <h2 className="text-2xl">Sign Up</h2>
        </div>
        <Suspense>
            <SignupForm/>
        </Suspense>
      </div>
    </main>
  );
}
