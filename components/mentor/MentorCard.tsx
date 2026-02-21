"use client";

import React from "react";
import { Mentor } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheckIcon, Star } from "lucide-react";
import { motion } from "framer-motion";

function MentorCard({ mentor, id }: { mentor: Mentor; id: string }) {

  // ✅ SAFE fallback
  const rating: number = mentor.rating ?? 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="relative group w-full p-px rounded-2xl bg-linear-to-r from-indigo-500/40 via-cyan-500/40 to-purple-500/40"
    >
      <div className="rounded-2xl p-6 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-lg transition-all duration-500 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6">

        {/* LEFT */}
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Image
                src={mentor.avatar || "/default-avatar.png"}
                alt={mentor.fullName}
                width={80}
                height={80}
                className="rounded-full object-cover ring-2 ring-indigo-500"
              />

              {mentor.active && (
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white dark:border-black" />
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {mentor.fullName}
                <BadgeCheckIcon size={16} className="inline ml-1 text-blue-500" />
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mentor.title} @ {mentor.company}
              </p>

              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                {mentor.experience}+ years experience
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {mentor.bio.slice(0,30)} ...
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {mentor.skills?.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* AI Recommended */}
          {rating > 4.7 && (
            <span className=" mt-5 inline-block text-xs px-3 py-1 rounded-full bg-linear-to-r from-indigo-500 to-cyan-500 text-white">
              🤖 AI Recommended
            </span>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between space-y-4">

          {/* Rating */}
          <div>
            <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Star size={14} fill="currentColor" className="text-yellow-500" />
                {rating.toFixed(1)}
              </span>
              <span>${mentor.price}/min</span>
            </div>

            <div className=" mt-5 w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rating * 20}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-linear-to-r from-yellow-400 to-orange-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link href={`/dashboard/mentor/${id}`} className="w-full">
              <button className="w-full py-2 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition">
                View
              </button>
            </Link>

            <Link href={`/dashboard/mentor/${id}/chat`} className="w-full">
              <button className="w-full py-2 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-300">
                Connect
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



// function TopMentorCard({ mentor, id }: { mentor: Mentor; id: string }) {
//   return (
//     <div>
//       <Link href={`/dashboard/mentor/${id}`}>
//         <div className="flex gap-3">
//           <div className="">
//             <Image
//   src={mentor.avatar || "/default-avatar.png"}
//   alt={mentor.fullName}
//   width={64}
//   height={64}
//   className={clsx(
//     "rounded-full border-2 object-cover",
//     { "border-green-700": mentor.active }
//   )}
// />

//           </div>
//           <div className="">
//             <span className="">
//               {mentor.fullName}
//               <BadgeCheckIcon
//                 className="inline-block ml-1 text-white"
//                 size={16}
//                 fill="blue"
//               />
//             </span>
//             <p className="">{mentor.title}</p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

function TopMentorCard({ mentor, id }: { mentor: Mentor; id: string }) {
  return (
    <Link href={`/dashboard/mentor/${id}`}>
      <div className="flex gap-3 items-center">
        <Image
          src={mentor.avatar || "/default-avatar.png"}
          alt={mentor.fullName}
          width={50}
          height={50}
          className="rounded-full border-2 border-green-700"
        />

        <div>
          <span>
            {mentor.fullName}
            <BadgeCheckIcon
              className="inline-block ml-1 text-white"
              size={16}
              fill="blue"
            />
          </span>
          <p>{mentor.title}</p>
        </div>
      </div>
    </Link>
  );
}

export { MentorCard, TopMentorCard };

// export default function MentorCard({ mentor }: { mentor: Mentor }) {
//   return (
//     <div className="grow text-black dark:text-white border-3 hover:shadow-2xl p-6 space-y-4 mt-2 flex flex-col gap-4 md:flex-row rounded-2xl">
//       {/* Left Section */}
//       <div>
//         <div className="flex gap-4 overflow-hidden">

//           <div className="rounded-full bg-gray-500 h-full flex justify-center m-auto">
//             <Image
//               src={"/assets/b.jpg"}
//               alt="userimage"
//               width={100}
//               height={100}
//               className={cn(
//                 'rounded-full object-cover bg-gray-400',
//                 {
//                   'border border-green-700 border-4' : mentor.active
//                 }
//               )}
//             />
//           </div>

//           <div>
//             <h3 className="font-semibold">{mentor.name}</h3>
//             <p className="font-semibold text-blue-600">
//               {mentor.title} @ {mentor.company}
//             </p>
//             <p>
//               Companies:{" "}
//               <span className="font-bold text-orange-400">
//                 {mentor.companies.join(", ")}
//               </span>
//             </p>
//             <p>{mentor.experience} years experience</p>
//           </div>
//         </div>

//         <p className="md:hidden mt-3 block">{mentor.bio.slice(0, 50)}...</p>
//         <p className="mt-3 hidden md:block">{mentor.bio.slice(0, 30)}...</p>

//         <div className="mt-2 flex gap-2">
//           <span className="bg-gray-400 p-2 border border-white rounded-2xl">
//             {mentor.skills[0]}
//           </span>
//           <span className="bg-gray-400 p-2 border border-white rounded-2xl">
//             {mentor.skills[1]}
//           </span>

//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="min-w-[200px] ">
//         <div className="flex justify-between bg-gray-300 p-4 rounded-lg gap-2">
//           <div className="bg-white p-2">Rating: {mentor.rating} ⭐</div>
//           <div className="bg-white p-2">Price: ${mentor.price}/hr</div>
//         </div>

//         <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2">
//           View Profile
//         </button>

//         <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2">
//           Connect
//         </button>
//       </div>
//     </div>
//   );
// }
