"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SignupForm(){
  const router = useRouter();
  const [user, setUser] = useState({
    email:"",password:"",username:"",avatar:"", fullname:""
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onSignup = async ()=>{
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup",user);
      console.log("signup success", res.data);
      toast.success(res.data);
      router.push("/dashboard");
    } catch (error:any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.fullname.length>0 && user.password.length>=6 && user.username.length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  },[user]);

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ client-side safety
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Only JPG, PNG, WEBP allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB");
      e.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));
  }

  return(
    <div className="">
      <div className="flex flex-col gap-2 space-y-1"
    >
      <label>Username</label>
      <input
        name="username"
        type="text"
        value={user.username}
        onChange={(e)=>setUser({...user, username:e.target.value})}
        placeholder="username"
        className="border-2 border-slate-300 rounded-sm p-1 lowercase"
      />

      <label>Full Name</label>
      <input
        name="fullName"
        className="border-2 border-slate-300 rounded-sm p-1 capitalize"
      />

      <label>Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        className="border-2 border-slate-300 rounded-sm p-1 lowercase"
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        className="border-2 border-slate-300 rounded-sm p-1"
      />

      {/* ✅ Avatar Upload */}
      <label>Avatar</label>
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleAvatarChange}
        className="border-2 border-slate-300 rounded-sm p-1"
      />

      {preview && (
        <img
          src={preview}
          alt="Avatar preview"
          className="w-20 h-20 rounded-full object-cover mt-2 mx-auto border"
        />
      )}

      <Button 
      type="submit" 
      className="mt-2"
      aria-disabled={buttonDisabled}
      onClick={onSignup}>
        {buttonDisabled ? "Signup":"Signup..."}
      </Button>
    </div>

    <Link href="/signup">Visit Login Page</Link>
    </div>
  )
}

// "use client";
// import { useActionState, useState } from "react";
// import { createUser, State } from "@/lib/actions";
// import { Button } from "@/components/ui/button";
// const initialState: State = {
//   errors: {},
//   message: null,
// };

// export default function SignupForm() {
//   const [state, formAction] = useActionState(createUser, initialState);
//   const [preview, setPreview] = useState<string | null>(null);

//   function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // ✅ client-side safety
//     if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
//       alert("Only JPG, PNG, WEBP allowed");
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       alert("Max file size is 2MB");
//       e.target.value = "";
//       return;
//     }

//     setPreview(URL.createObjectURL(file));
//   }

//   return (
//     <form
//       action={formAction}
//       // encType="multipart/form-data"
//       className="flex flex-col gap-2 space-y-1"
//     >
//       <label>Username</label>
//       <input
//         name="username"
//         className="border-2 border-slate-300 rounded-sm p-1 lowercase"
//       />
//       {state.errors?.username && (
//         <p className="text-red-500">{state.errors.username[0]}</p>
//       )}

//       <label>Full Name</label>
//       <input
//         name="fullName"
//         className="border-2 border-slate-300 rounded-sm p-1 capitalize"
//       />
//       {state.errors?.fullName && (
//         <p className="text-red-500">{state.errors.fullName[0]}</p>
//       )}

//       <label>Email</label>
//       <input
//         type="email"
//         name="email"
//         className="border-2 border-slate-300 rounded-sm p-1 lowercase"
//       />

//       <label>Password</label>
//       <input
//         type="password"
//         name="password"
//         className="border-2 border-slate-300 rounded-sm p-1"
//       />

//       {/* ✅ Avatar Upload */}
//       <label>Avatar</label>
//       <input
//         type="file"
//         name="avatar"
//         accept="image/*"
//         onChange={handleAvatarChange}
//         className="border-2 border-slate-300 rounded-sm p-1"
//       />

//       {preview && (
//         <img
//           src={preview}
//           alt="Avatar preview"
//           className="w-20 h-20 rounded-full object-cover mt-2 mx-auto border"
//         />
//       )}

//       <Button type="submit" className="mt-2">
//         Sign Up
//       </Button>

//       {state.message && (
//         <p className="text-red-500 text-center">{state.message}</p>
//       )}
//     </form>
//   );
// }

