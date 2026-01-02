// components/mentor/mentorProfile.tsx

import { fetchMentorById } from "@/lib/data"; // removed unused import
import { lusitana } from "../font";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import clsx from "clsx";

type MentorProfileProps = {
  mentorId: { id: string };
};

export default async function MentorProfile({ mentorId }: MentorProfileProps) {
  const mentor = await fetchMentorById(mentorId.id);

  if (!mentor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Mentor Not Found</h2>
        <p className="text-gray-500">The mentor you&aposre looking for doesn&apost exist or has been removed.</p>
      </div>
    );
  }

  // Safely format date with fallback
  const joinedDate = mentor.createdAt
    ? new Date(mentor.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date unknown";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Name with gradient */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent py-6">
        {mentor.fullName}
      </h1>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 my-8 text-white overflow-hidden">
        {/* Avatar + Join Date Row */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
          <div className="relative flex-shrink-0">
            <div className="bg-gray-200 border-4 border-white rounded-full overflow-hidden w-40 h-40 shadow-xl ring-4 ring-white/30">
              <Image
                src={mentor.avatar || "/placeholder-avatar.png"}
                alt={`${mentor.fullName}'s profile picture`}
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority // Since it's above the fold
                unoptimized={!!mentor.avatar?.startsWith("http")} // Only if external URL
              />
            </div>
          </div>

          <div className="text-center md:text-left space-y-2">
            <p className={clsx(lusitana.className, "text-yellow-300 text-xl")}>
              Joined {joinedDate}
            </p>
            {/* {mentor.location && (
              <p className="text-lg opacity-90">📍 {mentor.location}</p>
            )} */}
          </div>
        </div>

        {/* Bio & Current Role */}
        <div className="text-center space-y-6">
          {mentor.bio ? (
            <p className={clsx(lusitana.className, "text-lg leading-relaxed max-w-2xl mx-auto opacity-95")}>
              {mentor.bio}`&quot`
            </p>
          ) : (
            <p className="italic text-white/70">No bio provided yet.</p>
          )}

          <p className="text-2xl md:text-3xl font-bold">
            {mentor.title} <span className="text-yellow-300">@ {mentor.company}</span>
          </p>
        </div>

        <Separator className="my-10 bg-white/30" />

        {/* Previous Companies */}
        {mentor.companies?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-center text-2xl font-bold mb-6">Previous Companies</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {mentor.companies.map((company, i) => (
                <span
                  key={i}
                  className="bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  {company}
                </span>
              ))}
            </div>
          </section>
        )}

        <Separator className="my-10 bg-white/30" />

        {/* Skills / Expertise */}
        {mentor.skills?.length > 0 && (
          <section>
            <h2 className="text-center text-2xl font-bold mb-6">Expertise</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {mentor.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-xl font-medium hover:bg-white/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}