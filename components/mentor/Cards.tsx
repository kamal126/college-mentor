import React from "react";
import { fetchFilteredMentors } from "@/lib/data";
import {MentorCard} from "../MentorCard";

export default async function Cards({
  query, page
}:{
  query:string;
  page:number
}) {
    const mentors = await fetchFilteredMentors(query, page);

    if(!mentors.length){
      return <p className="text-center mt-6">No mentors found</p>;
    }

  return (
    <div className="space-y-2">
      {mentors.map((mentor)=>(
        <MentorCard 
        id={mentor._id.toString()} 
        key={mentor._id.toString()} 
        mentor={mentor} />
      ))}
    </div>
  )
}