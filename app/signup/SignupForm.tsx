"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle avatar file change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.info("Only JPG, PNG, or WEBP allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.info("Avatar must be <= 2MB");
      return;
    }

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
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
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed");

      toast.success("Account created successfully! Redirecting...");

      // Auto-login after signup
      await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-black/20 dark:via-gray-900 dark:to-black/30 p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-fit backdrop-blur-md bg-white/40 dark:bg-gray-900/50 border border-white/20 dark:border-gray-700/40 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
          Create Account
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Sign up to get personalized AI guidance for your academic and career journey.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex w-full gap-2">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {preview && (
            <motion.img
              src={preview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-xl font-semibold mt-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? "Creating account..." : "Register"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}