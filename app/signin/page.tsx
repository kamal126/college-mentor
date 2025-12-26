"use client";

import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";
import { Suspense, useState } from "react";

export default function LoginPage() {
  const [toogle, setToggle] = useState(true);
  
  return (
     <main className="relative flex flex-col w-full h-screen justify-center items-center bg-blue-100">
        <button 
        onClick={()=>setToggle(prev=>!prev)}
        className="bg-blue-600 absolute top-2 left-5 hover:bg-blue-500 transition-all p-2 px-5 m-5">{toogle?"Sign up":"Sign in"}</button>
        
      <div className="border-2 border-slate-300 p-10 rounded-lg bg-white">
        <div className="flex justify-center mb-3 font-semibold rounded-sm bg-blue-300">
          <h2 className="text-2xl">{!toogle?"Sign up":"Sign in"}</h2>
        </div>
        <Suspense>
          {(toogle? <LoginForm/> : <SignupForm/>)}
        </Suspense>
      </div>
    </main>
  )
}








// import LoginForm from "@/components/login-form";
// import { Suspense } from "react";

// export default function Page() {
  
//   return (
//     <main className="flex flex-col w-full h-screen justify-center items-center bg-blue-100">
//       <div className="border-2 border-slate-300 p-10 rounded-lg bg-white">
//         <div className="flex justify-center mb-2 font-semibold rounded-sm bg-blue-300">
//           <h2 className="text-2xl capitalize">sign in</h2>
//         </div>

//         <Suspense>
//           <LoginForm/>
//         </Suspense>
//       </div>
//     </main>
//   );
// }
