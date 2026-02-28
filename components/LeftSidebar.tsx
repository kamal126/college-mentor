"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PowerIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

export default function LeftSidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Expert", href: "/dashboard/mentor" },
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Inbox", href: "/dashboard/inbox" },
    { name: "Join As Expert", href: "/dashboard/expert" },
    { name: "Chat", href: "/dashboard/chat" },
  ];

  if (status === "loading") return null;

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
    <div className="h-full flex flex-col p-5 space-y-6">

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
          <p className="font-semibold">
            {session?.user?.fullName}
          </p>
          <p className="text-sm text-gray-500">
            @{session?.user?.username}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <ul className="space-y-2 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={closeSidebar}
                className={`
                  block px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${
                    active
                      ? "bg-indigo-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-white/10"
                  }
                `}
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
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
        bg-red-500 hover:bg-red-600 text-white font-medium"
      >
        <PowerIcon size={18} />
        {loading ? "Signing Out..." : "Sign Out"}
      </button>
    </div>
  );
}