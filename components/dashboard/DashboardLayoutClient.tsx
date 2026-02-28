"use client";

import { Suspense, useState } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import { Menu } from "lucide-react";
import { LeftSidebarSkeleton } from "../ui/skeleton";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

       {/* Desktop Sidebar */}
        {/* <div className="hidden lg:flex lg:flex-col w-64 border-r overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Suspense fallback={<LeftSidebarSkeleton />}>
            <LeftSidebar />
          </Suspense>
        </div> */}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed md:hidden z-50 top-0 left-0 h-full w-72
          bg-white dark:bg-[#0F172A]
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <LeftSidebar closeSidebar={() => setIsOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1">

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 border-b bg-white dark:bg-[#0F172A]">
          <h2 className="font-semibold">Dashboard</h2>
          <button onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}