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
      <div className="relative rounded-lg border bg-white p-10 shadow-md w-87.5">

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


// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       console.log(result.error);
//     } else {
//       router.push("/dashboard");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//         className="bg-black text-white p-1 rounded-md hover:bg-black/80 cursor-pointer"
//          type="submit">Login</button>
//       </form>
//       <div>
//         Dont have an account ?
//         <button 
//         className="bg-black text-white p-1 rounded-md hover:bg-black/80 cursor-pointer"
//         onClick={() => router.push("/register")}>Register</button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
