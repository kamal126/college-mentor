import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PowerIcon } from "lucide-react";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import { fetchUserById } from "@/lib/data"; // ✅ NORMAL IMPORT

export default async function LeftSidebar() {
  const session = await auth();

  let user = null;
  if (session?.user?.id) {
    user = await fetchUserById(session.user.id);
  }

  return (
    <div className="relative w-full h-screen md:w-[250px] p-4 md:p-2 space-y-4">

      {/* Profile Card */}
      <div className="border rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">

          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt={user?.fullName || "User"}
            width={64}
            height={64}
            priority
            className="rounded-full object-cover bg-gray-400"
          />

          <div>
            <p className="uppercase font-semibold text-sm">
              {user?.fullName || "Guest"}
            </p>
            <p className="text-sm opacity-70">
              @{user?.username || "user"}
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
          ["Join as Expert", "/dashboard/expert"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block text-center p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="absolute bottom-10 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-red-400 p-3 text-sm font-medium">
          <PowerIcon className="w-5" />
          <span className="hidden md:block">Sign Out</span>
        </button>
      </form>
    </div>
  );
}
