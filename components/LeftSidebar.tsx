"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PowerIcon } from "lucide-react";
// import { fetchUserById } from "@/lib/data"; // ✅ NORMAL IMPORT
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LeftSidebar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  if (status == "loading") return <div className="p-4">Loading...</div>;

  const handleSignout = async () => {
    setLoading(true);
    router.push("/");
    try {
      await signOut({ redirect: false });
      toast.success("Signed out successfully!");
      // router.push("/");
    } catch {
      toast.error("Failed to sign out!");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen md:w-62 p-4 md:p-2 space-y-4">
      {/* Profile Card */}
      <div className="border rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <Image
            src={session?.user?.avatar || "/default-avatar.png"}
            alt={session?.user?.fullName || "User"}
            width={64}
            height={64}
            priority
            className="rounded-full object-cover bg-gray-400"
          />

          <div>
            <p className="uppercase font-semibold text-sm">
              {session?.user?.fullName || "Guest"}
            </p>
            <p className="text-sm opacity-70">
              @{session?.user?.username || "user"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm">
        {[
          ["Home", "/dashboard"],
          ["Expert", "/dashboard/mentor"],
          ["Profile", "/dashboard/profile"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block text-center p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {label}
          </Link>
        ))}

        {!session?.user?.isMentor && (
          <Link
            href="/dashboard/expert"
            className="block text-center p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Join as Expert
          </Link>
        )}
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleSignout}
        className="absolute bottom-10 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-red-400 p-3 cursor-pointer text-sm font-medium"
      >
        <PowerIcon/> Sign Out
      </button>
    </div>
  );
}
