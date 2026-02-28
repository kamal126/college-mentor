"use client";

import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/components/expert/breadcrumbs";
import {
  ArrowUpRight,
  AwardIcon,
  BookOpenTextIcon,
  TargetIcon,
  TrendingUp,
  Menu,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  // const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return null; // or a loader
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: "Home", href: "/dashboard", active: true }]}
      />

      <div className="p-6 md:p-8 border-b border-slate-200 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-slate-900 dark:text-white mb-2">
            Welcome back,{" "}
            <span className="font-bold">
              {session?.user?.fullName?.toUpperCase()}
            </span>
          </h1>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Questions Asked */}
            <div className="bg-card flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpenTextIcon className="w-5 h-5 text-blue-600" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-slate-900 dark:text-white mb-1">47</p>
              <p className="text-sm text-slate-600 dark:text-white mb-1">
                Questions Asked
              </p>
              <p className="text-xs text-slate-500 dark:text-white">
                +12 this week
              </p>
            </div>

            {/* Learning Streak */}
            <div className="bg-card flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TargetIcon className="w-5 h-5 text-green-600" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-slate-900 dark:text-white mb-1">15 days</p>
              <p className="text-sm text-slate-600 dark:text-white mb-1">
                Learning Streak
              </p>
              <p className="text-xs text-slate-500 dark:text-white">
                Keep it up!
              </p>
            </div>

            {/* Resources Saved */}
            <div className="bg-card flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                  <AwardIcon className="w-5 h-5 text-violet-600" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-slate-900 dark:text-white mb-1">23</p>
              <p className="text-sm text-slate-600 dark:text-white mb-1">
                Resources Saved
              </p>
              <p className="text-xs text-slate-500 dark:text-white">
                +5 new
              </p>
            </div>

            {/* Progress */}
            <div className="bg-card flex flex-col gap-6 rounded-xl border p-6 hover:shadow-lg transition-shadow border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-slate-900 dark:text-white mb-1">68%</p>
              <p className="text-sm text-slate-600 dark:text-white mb-1">
                Progress
              </p>
              <p className="text-xs text-slate-500 dark:text-white">
                On track
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}