import React from "react";
import Link from "next/link";

export default function LeftSidebar() {
  return (
    <div className="w-full md:w-[250px] p-4 md:p-2 space-y-4">

      {/* Profile Card */}
      <div className="border rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <img
            src="https://avatars.githubusercontent.com/u/54989946?v=4"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover bg-gray-400"
          />

          <div>
            <p className="uppercase font-semibold text-lg">Kamal</p>
            <p className="text-sm opacity-70">@Kamal126</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center md:justify-between gap-6 mt-4 text-xs">
          {[
            { label: "Balance", value: "$50" },
            { label: "Followers", value: "122" },
            { label: "Following", value: "901" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <p className="font-semibold">{item.value}</p>
              <p className="opacity-70 text-[11px]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm">
        {["Home", "Expert", "Wallet", "Join as Expert"].map((item, i) => (
          <button
            key={i}
            className="w-full text-center p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="border rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm">
        <Link
          href="/"
          className="block text-center w-full p-3 rounded-xl border border-red-500 text-red-600 font-medium
          hover:bg-red-600 hover:text-white transition"
        >
          Logout
        </Link>
      </div>

    </div>
  );
}
