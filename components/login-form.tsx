// "use client";



// import { lusitana } from "./font";
// import { AtSignIcon, KeyIcon, FileExclamationPointIcon } from "lucide-react";
// import { ArrowRightIcon } from "lucide-react";
// import { Button } from "./ui/button";
// import { Suspense, useActionState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { useFormStatus } from "react-dom";
// import clsx from "clsx";
// import { authenticate, State } from "@/lib/actions";
// import { toast } from "sonner";
// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button
//       type="submit"
//       aria-disabled={pending}
//       className={clsx(
//         lusitana,
//         "mt-4 w-full text-white bg-black ",
//         pending && "opacity-60 cursor-not-allowed bg-gray-800"
//       )}
//     >
//       {pending ? "Signing in..." : "Sign in"}
//       <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//     </Button>
//   );
// }

// export default function LoginForm() {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
//   const [state, formAction] = useActionState(authenticate, {
//     message: null,
//   });

//   useEffect(() => {
//     if (state?.success === true) {
//       toast.success("Login successful");
//     }
//     if (state?.message) {
//       toast.error(state.message);
//     }
//   }, [state]);

//   return (
//     <form action={formAction} className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//           Please log in to continue.
//         </h1>
//         <div className="w-full">
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 required
//               />
//               <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="password"
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 required
//                 minLength={6}
//               />
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//         <input type="hidden" name="redirectTo" value={callbackUrl} />
//         <SubmitButton/>
//         <div
//           className="flex h-8 items-end space-x-1"
//           aria-live="polite"
//           aria-atomic="true"
//         >
//           {state?.message && (
//             <div className="flex items-center gap-1 text-red-500">
//               <FileExclamationPointIcon className="h-5 w-5" />
//               <p className="text-sm">{state.message}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </form>
//     // <form action={formAction} className="flex flex-col gap-2 w-72">
//     //       <label htmlFor="identifier">Username / Email</label>
//     //       <input
//     //         id="identifier"
//     //         name="identifier"
//     //         required
//     //         autoComplete="username"
//     //         // aria-invalid={!!state?.errors?.identifier}
//     //         className="border-2 border-slate-300 rounded-sm p-1"
//     //         placeholder="username or email"
//     //       />

//     //       {/* {state?.errors?.identifier && (
//     //         <p className="text-red-500">
//     //           {state.errors.identifier[0]}
//     //         </p>
//     //       )} */}

//     //       <label htmlFor="password">Password</label>
//     //       <input
//     //         id="password"
//     //         type="password"
//     //         name="password"
//     //         required
//     //         autoComplete="current-password"
//     //         // aria-invalid={!!state?.errors?.password}
//     //         className="border-2 border-slate-300 rounded-sm p-1"
//     //         placeholder="******"
//     //       />

//     //       {/* {state?.errors?.password && (
//     //         <p className="text-red-500">
//     //           {state.errors.password[0]}
//     //         </p>
//     //       )} */}

//     //       <SubmitButton />

//     //       {/* {state?.message && (
//     //         <p className="text-red-500 text-center">
//     //           {state.message}
//     //         </p>
//     //       )} */}
//     //     </form>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { Button } from "./ui/button";
// import clsx from "clsx";
// import { lusitana } from "./font";
// import { ArrowRightIcon, AtSignIcon, KeyIcon } from "lucide-react";



// export default function LoginForm(){
//   const router = useRouter();
//   const [user, setUser] = useState({email:"", password:""});
//   const [buttonDisabled, setButtonDisabled] = useState(false);
//   const [loading, setLoading] = useState(false);


//   const onLogin = async ()=>{
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/user/login", user);
//       console.log("Login success", response.data);
//       toast.success("Login success");
//       router.push("/dashboard");
//     } catch (error:any) {
//       console.log("Login failed", error.message);
//       toast.error(error.message);
//     }finally{
//       setLoading(false);
//     }
//   }

//   useEffect(()=>{
//     if(user.email.length>0 && user.password.length>=6){
//       setButtonDisabled(false);
//     }else{
//       setButtonDisabled(true);
//     }
//   },[user]);


//   return(
//     // <div className="flex flex-col items-center justify-center min-h-screen py-2">
//     //   <h1>{loading? "processing...":"Login"}</h1>
//     //   <hr />
//     //   <label htmlFor="email">email</label>
//     //   <input type="text"
//     //         id="email"
//     //         value={user.email}
//     //         onChange={(e)=>setUser({...user, email: e.target.value})}
//     //         placeholder="email"
//     //   />

//     //   <label htmlFor="password">password</label>
//     //   <input type="password"
//     //           id="password"
//     //           value={user.password}
//     //           onChange={(e)=>setUser({...user, password:e.target.value})}
//     //           placeholder="password"
//     //   />
//     //   <button
//     //   onClick={onLogin}
//     //   className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
//     //   >Login here</button>

//     //   <Link href={"/signup"}>Visit Signup Page</Link>

//     //   {/* <Button
//     //   type="submit"
//     //   aria-disabled={buttonDisabled}
//     //   className={clsx(
//     //     lusitana,
//     //     "mt-4 w-full text-white bg-black ",
//     //     buttonDisabled && "opacity-60 cursor-not-allowed bg-gray-800"
//     //   )}
//     // >
//     //   {buttonDisabled ? "Signing in..." : "Sign in"}
//     //   <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//     // </Button> */}
//     // </div>
//     <div>
//       <div className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//            Please log in to continue.
//          </h1>
//          <div className="w-full">
//           {/* email */}
//            <div>
//              <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 value={user.email}
//                 onChange={(e)=>setUser({...user, email:e.target.value})}
//                 required
//               />
//               <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           {/* password */}
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="password"
//                 type="password"
//                 name="password"
//                 value={user.password}
//                 onChange={(e)=>setUser({...user, password:e.target.value})}
//                 placeholder="Enter password"
//                 required
//                 minLength={6}
//               />
              
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//         {/* <input type="hidden" name="redirectTo" /> */}
        
//         <Button onClick={onLogin}>{buttonDisabled? "Sign In":"Sign In..."}</Button>
//         <div
//           className="flex h-8 items-end space-x-1"
//           aria-live="polite"
//           aria-atomic="true"
//         >
//           {/* {state?.message && (
//             <div className="flex items-center gap-1 text-red-500">
//               <FileExclamationPointIcon className="h-5 w-5" />
//               <p className="text-sm">{state.message}</p>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import clsx from "clsx";
import { lusitana } from "./font";
import { ArrowRightIcon, AtSignIcon, KeyIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
  try {
    setLoading(true);

    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (!res ||  res.error || res.url?.includes("error")) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful");
    router.push("/dashboard");

  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (user.email.length > 0 && user.password.length >= 6) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <div className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please log in to continue.
          </h1>

          <div className="w-full">
            {/* Email */}
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>

              <div className="relative">
                <input
                  className="peer text-black block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  required
                />
                <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>

              <div className="relative">
                <input
                  className="peer text-black block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Button */}
          <Button
            disabled={buttonDisabled || loading}
            onClick={onLogin}
            className="mt-5 w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && (
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            )}
          </Button>

          <p className="mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
