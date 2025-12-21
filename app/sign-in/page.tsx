"use client";

import { useFormState } from "react-dom";
import { createUser, State } from "@/lib/actions";
import { Button } from "@/components/ui/button";

const initialState: State = {
  errors: {},
  message: null,
};




export default function Page() {
  const [state, formAction] = useFormState(createUser, initialState);
  
  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-blue-100">
      <div className="border-2 border-slate-300 p-10 rounded-lg">
        <div className="flex justify-center mb-2 font-semibold rounded-sm bg-blue-300">
          <h2 className="text-2xl capitalize">sign in</h2>
        </div>
        <form action={formAction} className="flex flex-col gap-2 w-75">

          <label>Username / Email:</label>
          <input
            name="fullName"
            className="border-2 border-slate-300 rounded-sm p-1 capitalize"
            placeholder="username / email"
          />

          {state.errors?.fullName && (
            <p className="text-red-500">{state.errors.fullName[0]}</p>
          )}

          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="border-2 border-slate-300 rounded-sm p-1"
            placeholder="******"
          />


          {/* <label>Avatar</label>
          <input
            type="file"
            name="avatar"
            className="border-2 border-slate-300 rounded-sm p-1 lowercase"
          /> */}

          <Button type="submit">sign in</Button>

          {state.message && <p className="text-red-500">{state.message}</p>}
        </form>
      </div>
    </main>
  );
}