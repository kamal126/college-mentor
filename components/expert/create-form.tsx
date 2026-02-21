"use client";

import { useActionState, useEffect, useState } from "react";
import { createExpert, State } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { lusitana } from "../font";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FloatingInput from "../ui/FloatingInput";


/* ---------------- Submit Button ---------------- */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        lusitana.className,
        "text-xl px-5 py-2 rounded-lg transition-all duration-200 shadow-md",
        "bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400",
        pending && "opacity-60 cursor-not-allowed shadow-none"
      )}
    >
      {pending ? "Processing..." : "Join As Mentor"}
    </button>
  );
}

/* ---------------- Floating Input ---------------- */


/* ---------------- Main Form ---------------- */
export default function Form() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status, router]);

  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createExpert, initialState);

  const [companies, setCompanies] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (!value) return;

      if (e.currentTarget.name === "inputCompany") setCompanies((prev) => [...prev, value]);
      if (e.currentTarget.name === "inputSkill") setSkills((prev) => [...prev, value]);

      e.currentTarget.value = "";
    }
  };

  const removeTag = (index: number, type: "company" | "skill") => {
    if (type === "company") setCompanies(companies.filter((_, i) => i !== index));
    if (type === "skill") setSkills(skills.filter((_, i) => i !== index));
  };

  if (status === "loading") {
    return <p className="flex justify-center items-center h-32 text-gray-500 dark:text-gray-300">Loading...</p>;
  }

  const tagClasses =
    "px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2";

  return (
    <form action={formAction} className="space-y-4 flex flex-col max-w-xl mx-auto">
      {/* Full Name */}
      <FloatingInput label="" name="fullname" placeholder="FullName" value={session?.user.fullName} disabled/>


      {/* Role / Title */}
      <FloatingInput label="Role / Title" name="title" placeholder="Software Engineer" />

      {/* Current Company */}
      <FloatingInput label="Current Company" name="company" placeholder="Google" />

      {/* Past Companies */}
      <FloatingInput
        label="Past Companies"
        name="inputCompany"
        placeholder="Type & press Enter"
        onKeyDown={handleKeyDown}
      />
      <div className="flex gap-2 flex-wrap mt-2">
        <AnimatePresence>
          {companies.map((c, i) => (
            <motion.span
              key={i}
              className={tagClasses}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {c}
              <button type="button" onClick={() => removeTag(i, "company")} className="font-bold">×</button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      {companies.map((c, i) => <input key={i} type="hidden" name="companies" value={c} />)}

      {/* Experience */}
      <FloatingInput label="Experience (years)" name="experience" type="number" step={0.1} min={0} />

      {/* Skills */}
      <FloatingInput
        label="Skills"
        name="inputSkill"
        placeholder="Type & press Enter"
        onKeyDown={handleKeyDown}
      />
      <div className="flex gap-2 flex-wrap mt-2">
        <AnimatePresence>
          {skills.map((s, i) => (
            <motion.span
              key={i}
              className={tagClasses}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {s}
              <button type="button" onClick={() => removeTag(i, "skill")} className="font-bold">×</button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      {skills.map((s, i) => <input key={i} type="hidden" name="skills" value={s} />)}

      {/* Price */}
      <FloatingInput label="Price ($/hr)" name="price" type="number" step={0.5} min={0} />

      {/* About */}
      <div className="relative w-full mt-5">
        <textarea
          name="bio"
          rows={5}
          placeholder=" "
          className="peer w-full rounded-lg border p-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all shadow-sm"
        />
        <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 text-md transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 dark:peer-focus:text-blue-400 pointer-events-none">
          About Yourself
        </label>
      </div>

      {/* Submit */}
      <SubmitButton />

      {/* Success Message */}
      {state.message && (
        <p className="text-green-600 font-medium dark:text-green-400">{state.message}</p>
      )}
    </form>
  );
}
