// components/mentor/MentorProfile.tsx

import { fetchMentorById } from "@/lib/data";
import { lusitana } from "../font";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";


interface MentorProfileProps {
  mentorId: string;
  id: string;
}

export default async function MentorProfile({
  mentorId,
  id
}: MentorProfileProps) {

  const mentor = await fetchMentorById(mentorId);

  if (!mentor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Mentor Not Found
        </h2>
        <p className="text-gray-500">
          The mentor you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
      </div>
    );
  }

  const joinedDate = mentor.createdAt
    ? new Date(mentor.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date unknown";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 🔹 Name */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent py-6">
        {mentor.fullName ?? "Unnamed Mentor"}
      </h1>

      <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 my-8 text-white overflow-hidden">
        {/* 🔹 Avatar + Join Date */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
          <div className="relative shrink-0">
            <div className="bg-gray-200 border-4 border-white rounded-full overflow-hidden w-40 h-40 shadow-xl ring-4 ring-white/30">
              <Image
                src={mentor.avatar || "/placeholder-avatar.png"}
                alt={`${mentor.fullName ?? "Mentor"} profile picture`}
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          <div className="text-center md:text-left space-y-2">
            <p
              className={clsx(
                lusitana.className,
                "text-yellow-300 text-xl"
              )}
            >
              Joined {joinedDate}
            </p>

            <Link href={`/dashboard/mentor/${id}/chat`}>
              <button className="bg-yellow-700 p-2 rounded-xl text-white cursor-pointer">
                Connect Me
              </button>
            </Link>

            {/* {mentor.location && (
              <p className="text-lg opacity-90">📍 {mentor.location}</p>
            )} */}
          </div>
        </div>

        {/* 🔹 Bio + Current Role */}
        <div className="text-center space-y-6">
          {mentor.bio ? (
            <q
              className={clsx(
                lusitana.className,
                "text-lg leading-relaxed max-w-2xl mx-auto opacity-95 block"
              )}
            >
              {mentor.bio}
            </q>
          ) : (
            <p className="italic text-white/70">No bio provided yet.</p>
          )}

          <p className="text-2xl md:text-3xl font-bold">
            {mentor.title ?? "No title provided"}{" "}
            {mentor.company && (
              <span className="text-yellow-300">
                @ {mentor.company}
              </span>
            )}
          </p>
        </div>

        <Separator className="my-10 bg-white/30" />

        {/* 🔹 Previous Companies */}
        {mentor.companies && mentor.companies.length > 0 && (
          <section className="mb-10">
            <h2 className="text-center text-2xl font-bold mb-6">
              Previous Companies
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {mentor.companies.map((company: string) => (
                <span
                  key={company}
                  className="bg-yellow-400 text-black font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  {company}
                </span>
              ))}
            </div>
          </section>
        )}

        <Separator className="my-10 bg-white/30" />

        {/* 🔹 Skills */}
        {mentor.skills && mentor.skills.length > 0 && (
          <section>
            <h2 className="text-center text-2xl font-bold mb-6">
              Expertise
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {mentor.skills.map((skill: string) => (
                <span
                  key={skill}
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
