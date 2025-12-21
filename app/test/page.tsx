"use client";

// import { useFormState } from "react-dom";
// import { createUser, State } from "@/lib/actions";
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


