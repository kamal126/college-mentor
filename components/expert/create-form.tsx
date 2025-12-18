"use client";

import React from "react";
import { useActionState } from "react";
import { createExpert, State } from "@/lib/actions";
import { Button } from "../ui/button";
import { Mentor } from "@/lib/types";

export default function Form() {
  const initialState: State = {
    message: null,
    errors: {},
  };

  const [state, formAction] = useActionState(createExpert, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {/* User ID */}
      <input type="hidden" name="userId" value='' />

      {/*  Name */}
      <div>
        <label className="block text-sm font-medium">UserName</label>
        <input
          name="name"
        //   defaultValue={expert.name}
          className="mt-1 w-full rounded-md border p-2"
        />
        {state.errors?.name?.map((e) => (
          <p key={e} className="text-sm text-red-500">{e}</p>
        ))}
      </div>

      {/* Role / Name */}
      <div>
        <label className="block text-sm font-medium">Role</label>
        <input
          name="name"
        //   defaultValue={expert.name}
          className="mt-1 w-full rounded-md border p-2"
        />
        {state.errors?.name?.map((e) => (
          <p key={e} className="text-sm text-red-500">{e}</p>
        ))}
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium">Company</label>
        <input
          name="company"
        //   defaultValue={expert.company}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm font-medium">Experience</label>
        <input
          name="experience"
          type="number"
        //   defaultValue={expert.experience}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          name="price"
          type="number"
        //   defaultValue={expert.price}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>

      {/* Companies */}
      {/* {(expert.companies ?? []).map((c, i) => (
        <input key={i} type="hidden" name="companies" value={c} />
      ))} */}

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          name="bio"
        //   defaultValue={expert.bio}
          className="mt-1 w-full rounded-md border p-2"
        />
      </div>

      {/* Rating (required by Zod) */}
      <input type="hidden" name="rating" value={0} />
      <input type="hidden" name="rating" value=''/>

      {/* Skills (required by Zod) */}
        <input type="hidden" name="skills" value='' />

      {/* Avatar (required by Zod) */}
      <input
        type="hidden"
        name="avatar"
        value={"https://randomuser.me/api/portraits/lego/1.jpg"}
      />

      <Button type="submit">Save Expert</Button>

      {state.message && (
        <p className="text-sm text-gray-600">{state.message}</p>
      )}
    </form>
  );
}
