"use client";

import { lusitana } from "./font";
import { AtSignIcon, KeyIcon, FileExclamationPointIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Suspense, useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { authenticate, State } from "@/lib/actions";
import { toast } from "sonner";
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={clsx(
        lusitana,
        "mt-4 w-full text-white bg-black ",
        pending && "opacity-60 cursor-not-allowed bg-gray-800"
      )}
    >
      {pending ? "Signing in..." : "Sign in"}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const [state, formAction] = useActionState(authenticate, {
    message: null,
  });

  useEffect(() => {
    if (state?.success === true) {
      toast.success("Login successful");
    }
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <SubmitButton/>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
            <div className="flex items-center gap-1 text-red-500">
              <FileExclamationPointIcon className="h-5 w-5" />
              <p className="text-sm">{state.message}</p>
            </div>
          )}
        </div>
      </div>
    </form>
    // <form action={formAction} className="flex flex-col gap-2 w-72">
    //       <label htmlFor="identifier">Username / Email</label>
    //       <input
    //         id="identifier"
    //         name="identifier"
    //         required
    //         autoComplete="username"
    //         // aria-invalid={!!state?.errors?.identifier}
    //         className="border-2 border-slate-300 rounded-sm p-1"
    //         placeholder="username or email"
    //       />

    //       {/* {state?.errors?.identifier && (
    //         <p className="text-red-500">
    //           {state.errors.identifier[0]}
    //         </p>
    //       )} */}

    //       <label htmlFor="password">Password</label>
    //       <input
    //         id="password"
    //         type="password"
    //         name="password"
    //         required
    //         autoComplete="current-password"
    //         // aria-invalid={!!state?.errors?.password}
    //         className="border-2 border-slate-300 rounded-sm p-1"
    //         placeholder="******"
    //       />

    //       {/* {state?.errors?.password && (
    //         <p className="text-red-500">
    //           {state.errors.password[0]}
    //         </p>
    //       )} */}

    //       <SubmitButton />

    //       {/* {state?.message && (
    //         <p className="text-red-500 text-center">
    //           {state.message}
    //         </p>
    //       )} */}
    //     </form>
  );
}
