"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PowerIcon, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LeftSidebar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Expert", href: "/dashboard/mentor" },
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Join As Expert", href: "/dashboard/expert" },
    { name: "Chat", href: "/dashboard/chat" },
  ];

  if (status === "loading")
    return <div className="p-4">Loading...</div>;

  const handleSignout = async () => {
    setLoading(true);
    router.push("/");
    try {
      await signOut({ redirect: false });
      toast.success("Signed out successfully!");
    } catch {
      toast.error("Failed to sign out!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-[#0F172A] border-b dark:border-white/10">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
          Dashboard
        </h2>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="text-gray-800 dark:text-white" />
        </button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || typeof window !== "undefined") && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className={`
              fixed md:static z-50
              w-72 md:w-64
              h-screen
              bg-white dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B]
              border-r border-gray-200 dark:border-white/10
              p-5 space-y-6
              shadow-xl
              transition-colors duration-500
            `}
          >
            {/* Profile */}
            <div className="flex flex-col items-center text-center space-y-3">
              <Image
                src={session?.user?.avatar || "/default-avatar.png"}
                alt="User"
                width={80}
                height={80}
                className="rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {session?.user?.fullName || "Guest"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{session?.user?.username || "user"}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <ul className="space-y-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        block px-4 py-3 rounded-xl text-sm font-medium
                        transition-all duration-300
                        ${
                          active
                            ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Logout */}
            <button
              onClick={handleSignout}
              disabled={loading}
              className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
              bg-red-500 hover:bg-red-600 text-white font-medium
              transition-all duration-300 shadow-md"
            >
              <PowerIcon size={18} />
              {loading ? "Signing Out..." : "Sign Out"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
