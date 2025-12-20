// import { mentors } from "@/data/data";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import clsx from "clsx";
import { Mentor } from "@/lib/types";


export default function MentorCard({mentor}:{mentor:Mentor}){
  return(
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_300px] bg-gray-200 mt-2 p-5 rounded-xl">
      {/* Left */}
      <div>
        <div className="flex gap-4 items-center">
          <img
            src={'/assets/b.jpg'}
            alt={mentor.fullName}
            // width={64}
            // height={64}
            className={clsx(
              "rounded-full w-16 h-16 border-2 object-top object-cover",
              { "border-green-700": mentor.active }
            )}
          />

          <div>
            <p className="font-bold">{mentor.fullName}</p>
            <p className="font-medium">
              {mentor.title} @{mentor.company}
            </p>
            <p className="text-orange-700">
              {mentor.experience}+ years exp
            </p>
          </div>
        </div>

        <p className="mt-2 font-semibold">
          {mentor.companies.join(", ")}
        </p>

        <p className="mt-2 hidden lg:block">
          {mentor.bio.slice(0, 50)}...
        </p>
        <p className="mt-2 lg:hidden">
          {mentor.bio}
        </p>
      </div>

      {/* Right */}
      <div className="mt-4 lg:mt-0">
        <div className="flex gap-2 flex-wrap">
          {mentor.skills?.slice(0, 2).map((skill) => (
            <span key={skill} className="bg-gray-300 p-1 rounded-xl">
              {skill}
            </span>
          ))}
        </div>

        <p className="bg-white font-medium p-2 mt-2">
          Rating: {mentor.rating} | Price: ${mentor.price}/min
        </p>

        <div className="flex gap-2 mt-2">
          <button className="bg-yellow-700 p-2 rounded-xl text-white">
            View Profile
          </button>
          <button className="bg-yellow-700 p-2 rounded-xl text-white">
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

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
