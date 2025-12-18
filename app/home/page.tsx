"use client";
import React, { useState } from "react";
import { BadgeCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { mentors } from "@/data/data";
import { cn } from "@/lib/utils";

// ===== Dummy Data for Right and Middle =====

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    console.log("Searching for:", query);
    // TODO: call API or navigate to results page
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleHam = () => {
    setOpen((prev) => !prev);
  };
  const closeSidebar = () => setOpen(false);

  return (
    //  <div className="grid grid-cols-[250px_1fr_250px] w-full h-screen gap-4">
    <section className="">
      {/* search bar */}
      <nav className="flex sticky top-0">
        

        <button onClick={handleHam} className="md:hidden z-50 p-2 rounded">
          ☰
        </button>
      </nav>

      {/* ---------------------------------------------------------------------------- */}
      <div className="grid md:grid-cols-[280px_1fr_320px] grid-cols-1 gap-4 mx-auto">
        {/* Left Sidebar */}
        {/* <div className="sticky top-10 h-screen hidden md:block">
        </div> */}
        {/* <div
          className={cn(
            open ? "block" : "hidden",
            "md:block sticky top-10 h-screen"
          )}
        >
          <LeftSidebar />
        </div> */}

        
          {/* Overlay (Mobile Only) */}
          {open && (
            <div
              className="fixed inset-0 bg-black/60 md:hidden z-40"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar */}
          
          <div
            className={cn(
              "fixed top-10 left-0 h-screen bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 md:relative md:translate-x-0 md:block",
              open ? "translate-x-0" : "-translate-x-full",
              "md:w-[280px] w-64"
            )}
          >
            <LeftSidebar />
        </div>

        {/* Main Content (Scrollable) */}
        

        {/* Right Sidebar */}
        <div className=" sticky top-10 h-screen hidden md:block">
          <RightSidebar />
        </div>
      </div>
    </section>
  );
}
