"use client";

// import { useFormState } from "react-dom";
// import { createUser, State} from "@/lib/actions";
// import { Button } from "@/components/ui/button";

// const initialState: State = {
//   errors: {},
//   message: null,
// };

// export default function Page() {
//   const [state, formAction] = useFormState(createUser, initialState);
  
//   return (
//     <main className="flex flex-col w-full h-screen justify-center items-center bg-blue-100">
//       <div className="border-2 border-slate-300 p-10 rounded-lg">
//         <div className="flex justify-center mb-2 font-semibold rounded-sm bg-blue-300">
//           <h2 className="text-2xl">Test User</h2>
//         </div>
//         <form action={formAction} className="flex flex-col gap-2 w-75">
//           <label>Username</label>
//           <input
//             name="username"
//             className="border-2 border-slate-300 rounded-sm p-1 lowercase"
//           />

//           {state.errors?.username && (
//             <p className="text-red-500">{state.errors.username[0]}</p>
//           )}

//           <label>Full Name</label>
//           <input
//             name="fullName"
//             className="border-2 border-slate-300 rounded-sm p-1 capitalize"
//           />

//           {state.errors?.fullName && (
//             <p className="text-red-500">{state.errors.fullName[0]}</p>
//           )}

//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             className="border-2 border-slate-300 rounded-sm p-1"
//           />

//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             className="border-2 border-slate-300 rounded-sm p-1 lowercase"
//           />

//           {/* <label>Avatar</label>
//           <input
//             type="file"
//             name="avatar"
//             className="border-2 border-slate-300 rounded-sm p-1 lowercase"
//           /> */}

//           <Button type="submit">Create user</Button>

//           {state.message && <p className="text-red-500">{state.message}</p>}
//         </form>
//       </div>
//     </main>
//   );
// }


// ================================================================================
// ============================ Get User ===========================================
// ================================================================================
// import { NextRequest } from "next/server";
// import { useState } from "react";
// import axios from 'axios';
// import Link from "next/link";

// export default async function Page(){

//     const [data, setData] = useState("nothing");

//     const getUserDetails = async() =>{
//         const req = await axios.get('/auth/me');
//         console.log(req.data);
//         setData(req.data.data._id);
//     }

//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>Profile</h1>
//             <hr />
//             <p>Profile page</p>
//             <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
//             </Link>}</h2>
//         </div>
//     );
// }




// ==================================================================================
// ==================== -> right Sidebar <- =========================================
// ================================================================================== 
// import TopMentor from "@/components/dashboard/TopMentor";

// export default function page() {
//   return (
//    <main>
//     <TopMentor/>
//    </main>
//   )
// }

// =========================================================
// =========================================================
// =========================================================


import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";
import { Suspense, useState } from "react";

import React from 'react'

export default function LoginPage() {
  const [toogle, setToggle] = useState(true);
  
  return (
     <main className="relative flex flex-col w-full h-screen justify-center items-center bg-blue-100">
        <button 
        onClick={()=>setToggle(prev=>!prev)}
        className="bg-blue-600 absolute top-2 hover:bg-blue-500 transition-all p-2 px-5 m-5">{toogle?"Sign up":"Sign in"}</button>
        
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
