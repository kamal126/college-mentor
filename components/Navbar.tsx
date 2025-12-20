import React from "react";
import Link from "next/link";
import { HouseIcon } from "lucide-react";
import { Users } from "lucide-react";

function heading() {
  return (
    <div className="bg-black max-w-4xl mx-auto relative">
      <div className="bg-gray-500 fixed md:min-w-4xl rounded-2xl items-center  mx-auto h-10  flex flex-row gap-5 justify-center border">
        <div className="">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="">
          <Link href={"/home"}>Account</Link>
        </div>
        <div>
          <Link href={"/Mentor"}>AIMentor</Link>
        </div>
      </div>
    </div>
  );
}

export default heading;
