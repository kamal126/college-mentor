"use client";

import { useActionState, useState } from "react";
import { createExpert, State } from "@/lib/actions";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { lusitana } from "../font";

function SubmitButton(){
    const {pending} = useFormStatus();

    return(
      <button
      type="submit"
      disabled={pending}
      className={
        clsx(lusitana,
          "text-xl bg-blue-600 p-2 hover:bg-blue-500 cursor-pointer capatilize",
          pending && "opacity-60 cursor-not-allowed"
        )
      }>
        {pending ? "processing..." : "Join As Mentor"}
      </button>
    )
}

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createExpert, initialState);

  const [companies, setCompanies] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (!value) return;
      if(e.currentTarget.name === "inputCompany"){
      setCompanies(prev => [...prev, value]);
      }

      if(e.currentTarget.name === "inputSkill"){
        setSkills(prev => [...prev, value]);
      }

      e.currentTarget.value = "";
    }
  };

  return (
    <form action={formAction} className="space-y-4 flex flex-col">
      <label htmlFor="fullname" 
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >FullName:</label>
      <input name="fullName" placeholder="Full Name"
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
       />

      <label htmlFor="role"
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >Role/Title:</label>
      <input name="title" placeholder="Role / Title"
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
       />

      <label htmlFor="company"
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >Company:</label>
      <input name="company" placeholder="Company" 
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
      />

      {/* Companies input */}
      <label htmlFor="past Companies"
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >Past Companies:</label>
      <input
        name="inputCompany"
        placeholder="Type company and press Enter"
        onKeyDown={handleKeyDown}
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"

      />

      {/* Render tags */}
      <div className="flex gap-2 flex-wrap">
        {companies.map((c, i) => (
          <span key={i} className="px-2 py-1 bg-gray-200 rounded">
            {c}
          </span>
          
        ))}
      </div>

      {/* Hidden input to submit array */}
      {companies.map((c,i) => <input key={i} type="hidden" name="companies" value={c} />)}

      <label htmlFor="experience"
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >Experience:</label>
      <input
        name="experience"
        type="number"
        placeholder="exp (years)"
        step={0.1}
        min={0}
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"

      />

      <label htmlFor="skills"
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >Skills:</label>
      <input name="inputSkill"
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
       placeholder="Type Skill and press Enter" onKeyDown={handleKeyDown}/>
      {/* Render tags */}
      <div className="flex gap-2 flex-wrap">
        {skills.map((c, i) => (
          <span key={i} className="px-2 py-1 bg-gray-200 rounded">
            {c}
          </span>
        ))}
      </div>
      {skills.map((c,i) => <input key={i} type="hidden" name="skills" value={c} />)}

      {/* Price */}
      <label htmlFor="price"
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >Price($/hr):</label>
      <input
        name="price"
        type="number"
        placeholder="0.0"
        step={0.5}
        min={0}
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
      />

      <label htmlFor="bio"
      className="mb-3 mt-5 block text-md font-medium text-gray-900"
      >About Yourself: </label>
      <textarea name="bio" placeholder="bio" cols={10} rows={5}
      className="peer block w-full rounded-md border border-gray-200 capitalize py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
      />

      {/* <Button type="submit">Save Expert</Button> */}
      <SubmitButton/>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
