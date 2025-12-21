"use client";

import { useFormState } from "react-dom";
import { login, State } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { lusitana } from "@/components/font";

const initialState: State = {
  errors: {},
  message: null,
};




export default function Page() {
  // const [state, formAction] = useFormState(login, initialState);
  const [state, formAction] = useFormState(login, initialState);
  
  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-blue-100">
      <div className="border-2 border-slate-300 p-10 rounded-lg">
        <div className="flex justify-center mb-2 font-semibold rounded-sm bg-blue-300">
          <h2 className="text-2xl capitalize">sign in</h2>
        </div>
        <form action={formAction} className="flex flex-col gap-2 w-75">

          <label>Username / Email:</label>
          <input
            name="username"
            className="border-2 border-slate-300 rounded-sm p-1"
            placeholder="username / email"
          />

          {state?.errors?.username && (
            <p className="text-red-500">{state.errors.username[0]}</p>
          )}

          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="border-2 border-slate-300 rounded-sm p-1"
            placeholder="******"
          />

          <Button type="submit" className={clsx(lusitana, "text-xl bg-blue-600 hover:bg-blue-500 cursor-pointer capitalize")}>sign in</Button>

          {state?.message && <p className="text-red-500">{state.message}</p>}
        </form>
      </div>
    </main>
  );
}