"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const router = useRouter();

  // Enable button only if email/password are valid
  useEffect(() => {
    setButtonDisabled(!(email.length > 0 && password.length >= 6));
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (buttonDisabled) return;

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false, // prevent auto redirect
        email,
        password,
      });

      if (result?.error) {
        toast.error(result.error || "Login failed!");
        return;
      }

      toast.success("Logged in successfully! Redirecting...");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
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
        className="w-full max-w-md backdrop-blur-md bg-white/40 dark:bg-gray-900/50 border border-white/20 dark:border-gray-700/40 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center">
          Sign In
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

          <Button
            type="submit"
            disabled={buttonDisabled || loading}
            className={clsx(
              "flex flex-row items-center justify-center p-3 rounded-xl font-semibold mt-3 shadow-lg hover:shadow-xl transition-all duration-300",
              buttonDisabled
                ? "bg-gray-600 dark:bg-gray-500 text-white cursor-not-allowed"
                : "bg-blue-600 dark:bg-blue-500 text-white cursor-pointer"
            )}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}