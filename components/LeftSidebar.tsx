import React from "react";
import Link from "next/link";
import { LogOut, PowerIcon } from "lucide-react";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@/models/user.model";
import connectDB from "@/lib/connectDB";


export default async function LeftSidebar() {
  const session = await auth();
  if(!session) redirect("/login");

  await connectDB()
  const user = await User.findOne({email: session.user.email});

  return (
    <div className=" relative w-full  h-screen md:w-[250px] p-4 md:p-2 space-y-4">

      {/* Profile Card */}
      <div className="border rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <img
            src="https://avatars.githubusercontent.com/u/54989946?v=4"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover bg-gray-400"
          />

          <div>
            <p className="uppercase font-semibold text-sm">{user?.fullName}</p>
            <p className="text-sm opacity-70">@{user?.username}</p>
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
        {[["Home", "/dashboard"], ["Expert", "/dashboard/mentor"], ["Profile", "/dashboard/profile"],, ["Join as Expert","/dashboard/expert"]].map((item, i) => (
          <button
            key={i}
            className="w-full text-center p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <Link
            href={item?item[1]: ''}>
            {item?item[0]:''}
            </Link>
          </button>
        ))}
      </div>

      {/* Logout */}
      {/* <div className=" absolute bottom-0 w-64 border bottom-0 rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm">
        <Link
          href={"/"}
          className="block text-center w-full p-3 rounded-xl border border-red-500 text-red-600 font-medium
          hover:bg-red-600 hover:text-white transition"
        >
          Logout
        <LogOut className="text-black inline"/>
        </Link>
      </div> */}
      <form action= {async ()=>{
        'use server';
        await signOut({redirectTo: '/'});
      }}>
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6"/>
            <div className="hidden md:block">Sign Out</div>
          </button>
      </form>

    </div>
  );
}
