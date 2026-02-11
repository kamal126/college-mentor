"use client";

import { useActionState, useEffect, useState } from "react";
import { createExpert, State } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { lusitana } from "../font";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/* ---------------- Submit Button ---------------- */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        lusitana.className,
        "text-xl bg-blue-600 p-2 hover:bg-blue-500 cursor-pointer capitalize",
        pending && "opacity-60 cursor-not-allowed"
      )}
    >
      {pending ? "Processing..." : "Join As Mentor"}
    </button>
  );
}

/* ---------------- Main Form ---------------- */
export default function Form() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createExpert, initialState);

  const [companies, setCompanies] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  /* -------- Handle Enter / Comma for Tags -------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (!value) return;

      if (e.currentTarget.name === "inputCompany") {
        setCompanies((prev) => [...prev, value]);
      }

      if (e.currentTarget.name === "inputSkill") {
        setSkills((prev) => [...prev, value]);
      }

      e.currentTarget.value = "";
    }
  };

  if (status === "loading") {
    return <p className="flex justify-center items-center">Loading...</p>;
  }

  return (
    <form action={formAction} className="space-y-4 flex flex-col">
      {/* Full Name */}
      <label className="mt-5 text-md font-medium">Full Name</label>
      <input
        name="fullName"
        defaultValue={session?.user?.fullName}
        readOnly
        className="cursor-not-allowed rounded-md border p-2 capitalize"
      />

      {/* Title */}
      <label className="mt-5 text-md font-medium">Role / Title</label>
      <input
        name="title"
        placeholder="Software Engineer"
        className="rounded-md border p-2"
      />

      {/* Current Company */}
      <label className="mt-5 text-md font-medium">Current Company</label>
      <input
        name="company"
        placeholder="Google"
        className="rounded-md border p-2"
      />

      {/* Past Companies */}
      <label className="mt-5 text-md font-medium">Past Companies</label>
      <input
        name="inputCompany"
        placeholder="Type & press Enter"
        onKeyDown={handleKeyDown}
        className="rounded-md border p-2"
      />

      <div className="flex gap-2 flex-wrap">
        {companies.map((c, i) => (
          <span key={i} className="px-2 py-1 bg-gray-200 rounded">
            {c}
          </span>
        ))}
      </div>

      {companies.map((c, i) => (
        <input key={i} type="hidden" name="companies" value={c} />
      ))}

      {/* Experience */}
      <label className="mt-5 text-md font-medium">Experience (years)</label>
      <input
        name="experience"
        type="number"
        step={0.1}
        min={0}
        className="rounded-md border p-2"
      />

      {/* Skills */}
      <label className="mt-5 text-md font-medium">Skills</label>
      <input
        name="inputSkill"
        placeholder="Type & press Enter"
        onKeyDown={handleKeyDown}
        className="rounded-md border p-2"
      />

      <div className="flex gap-2 flex-wrap">
        {skills.map((s, i) => (
          <span key={i} className="px-2 py-1 bg-gray-200 rounded">
            {s}
          </span>
        ))}
      </div>

      {skills.map((s, i) => (
        <input key={i} type="hidden" name="skills" value={s} />
      ))}

      {/* Price */}
      <label className="mt-5 text-md font-medium">Price ($/hr)</label>
      <input
        name="price"
        type="number"
        step={0.5}
        min={0}
        className="rounded-md border p-2"
      />

      {/* About */}
      <label className="mt-5 text-md font-medium">About Yourself</label>
      <textarea
        name="about"
        rows={5}
        className="rounded-md border p-2"
      />

      <SubmitButton />

      {state.message && (
        <p className="text-green-600 font-medium">{state.message}</p>
      )}
    </form>
  );
}
