import React from "react";
import { TopMentorCard } from "../mentor/TopMentorCard";
import { fetchTopMentor } from "@/lib/data";

interface Mentor {
  _id: string;
  fullName: string;
  avatar?: string;
  title?: string;
}

export default async function TopMentor() {
  const mentors: Mentor[] = await fetchTopMentor();

  return (
    <div className="flex flex-col">
      <div className="border-2 rounded-lg m-2 p-2 dark:bg-black/50">
        <h2 className="text-xl font-bold m-2">Top Mentors</h2>
        {mentors.map((mentor) => (
          <TopMentorCard key={mentor._id} mentor={mentor} id={mentor._id} />
        ))}
      </div>
    </div>
  );
}