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
        <div className="max-w-xl mx-auto sticky top-0 bg-gray-300 rounded-full px-4 py-2 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search mentors..."
            maxLength={200}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-transparent outline-none px-2"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 rounded-full border border-gray-600 hover:bg-gray-400 transition"
          >
            Search
          </button>
        </div>

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

        <div className="sticky top-10 h-screen hidden md:block">
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
              "fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 md:relative md:translate-x-0 md:block",
              open ? "translate-x-0" : "-translate-x-full",
              "md:w-[280px] w-64"
            )}
          >
            <LeftSidebar />
          </div>
        </div>

        {/* Main Content (Scrollable) */}
        <div className="ml-3 m-2 w-full">
          <div className="">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((m, idx) => (
                <div
                  key={idx}
                  className="text-black dark:text-white border-3 hover:shadow-2xl p-6 space-y-4 mt-2 flex flex-col gap-4 md:flex-row rounded-2xl"
                >
                  <div className="">
                    <div className="flex gap-4">
                      <div className="">
                        <img
                          src="https://www.geeksforgeeks.org/connect/_next/image?url=https%3A%2F%2Fmedia.geeksforgeeks.org%2Fauth%2Fprofile%2Fawaxza35wh9rn0zonena&w=96&q=75"
                          alt=""
                          height={100}
                          width={100}
                          className="rounded-full border border-green-700 border-4 bg-gray-500"
                        />
                      </div>
                      <div className="">
                        <h3 className="">{m.name}</h3>
                        <p className="">
                          {m.title} @ {m.company}
                        </p>
                        <p className="">
                          Companies:{" "}
                          <span>
                            {m.companies.map((company) => company).join(", ")}
                          </span>
                        </p>
                        <p className="">{m.experience} years experience</p>
                      </div>
                    </div>

                    <div className="">
                      <div className="">
                        <p className="">
                          I am a content creator , I create content around
                          education, career and Tech
                        </p>
                        <span className="bg-gray-400 p-1 border border-white rounded-2xl mx-1">
                          Career Guidance
                        </span>
                        <span className="bg-gray-400 p-1 border border-white rounded-2xl mx-1">
                          Career Guidance
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex justify-between bg-gray-300 p-4">
                      <div className="">Rating : 4.5 ⭐</div>
                      <div className="">Price : $10/hr</div>
                    </div>
                    <div className="">
                      <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2">
                        View Profile
                      </button>
                      <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No mentors found.</p>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className=" sticky top-10 h-screen hidden md:block">
          <RightSidebar />
        </div>
      </div>
    </section>
  );
}
