import Link from "next/link";
import React from "react";

interface Mentor {
  _id: string;
  fullName: string;
  avatar?: string;
  title?: string;
}

interface TopMentorCardProps {
  mentor: Mentor;
  id: string;
}

export const TopMentorCard: React.FC<TopMentorCardProps> = ({ mentor }) => {
  return (
    <Link href={`/dashboard/mentor/${mentor._id}`}>
    <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 p-2 rounded-md">
      <img
        src={mentor.avatar || "/default-avatar.png"}
        alt={mentor.fullName}
        className="w-10 h-10 rounded-full border border-green-700"
      />
      <div className="flex flex-col">
        <span className="font-semibold">{mentor.fullName}</span>
        {mentor.title && <span className="text-sm text-gray-500">{mentor.title}</span>}
      </div>
    </div>
    </Link>
  );
};