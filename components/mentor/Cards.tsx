import React from "react";
import { fetchFilteredMentors } from "@/lib/data";
import MentorCard from "../MentorCard";

export default async function Cards({query, page}:{query:string; page:number}) {
    const mentors = await fetchFilteredMentors(query, page);
  return (
    <div className="">
      {mentors.map((mentor)=>(
        <MentorCard key={mentor._id} mentor={mentor}/>
      ))}
    </div>
  )
}