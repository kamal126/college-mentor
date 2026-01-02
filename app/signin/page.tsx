"use client";

import { useState, Suspense } from "react";
import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-blue-100 dark:bg-black/10">
      <div className="relative rounded-lg border bg-white p-10 shadow-md w-[350px]">

        {/* Toggle Button */}
        <button
          onClick={() => setIsLogin((prev) => !prev)}
          className="absolute right-4 top-4 text-sm text-blue-600 hover:underline"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>

        {/* Title */}
        <h2 className="mb-6 text-center text-2xl font-semibold text-red-500">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {/* Dialog */}
        <Dialog>
          <DialogTrigger className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-500">
            {isLogin ? "Login" : "Create Account"}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </DialogTitle>
            </DialogHeader>

            <Suspense>
              {isLogin ? <LoginForm /> : <SignupForm />}
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
