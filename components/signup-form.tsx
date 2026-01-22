"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     Submit
  ====================== */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData, // ✅ NOT JSON
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      toast.success("Account created successfully");
      router.push("/signin");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     Avatar Handler
  ====================== */

  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Avatar must be under 2MB");
      return;
    }

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ======================
     UI
  ====================== */

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="border p-2 rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="Avatar preview"
            className="w-20 h-20 rounded-full object-cover mx-auto"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded mt-2"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <a href="/signin" className="underline">
          Login
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
