"use client";
import { useActionState, useState } from "react";
import { createUser, State } from "@/lib/actions";
import { Button } from "@/components/ui/button";
const initialState: State = {
  errors: {},
  message: null,
};

export default function SignupForm() {
  const [state, formAction] = useActionState(createUser, initialState);
  const [preview, setPreview] = useState<string | null>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  return (
    <form
      action={formAction}
      // encType="multipart/form-data"
      className="flex flex-col gap-2 space-y-1"
    >
      <label>Username</label>
      <input
        name="username"
        className="border-2 border-slate-300 rounded-sm p-1 lowercase"
      />
      {state.errors?.username && (
        <p className="text-red-500">{state.errors.username[0]}</p>
      )}

      <label>Full Name</label>
      <input
        name="fullName"
        className="border-2 border-slate-300 rounded-sm p-1 capitalize"
      />
      {state.errors?.fullName && (
        <p className="text-red-500">{state.errors.fullName[0]}</p>
      )}

      <label>Email</label>
      <input
        type="email"
        name="email"
        className="border-2 border-slate-300 rounded-sm p-1 lowercase"
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
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

      <Button type="submit" className="mt-2">
        Sign Up
      </Button>

      {state.message && (
        <p className="text-red-500 text-center">{state.message}</p>
      )}
    </form>
  );
}
