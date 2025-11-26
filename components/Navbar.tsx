import React from "react";
import Link from "next/link";

function heading() {
  return (
    <div className="bg-black max-w-4xl mx-auto relative">
      <div className="bg-gray-500 fixed md:min-w-4xl border rounded-2xl items-center  mx-auto h-10  flex flex-row gap-5 justify-center border">
        <div className="">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="">
          <Link href={"/account"}>Account</Link>
        </div>
        <div>
          <Link href={"/Mentor"}>AIMentor</Link>
        </div>
      </div>
    </div>
  );
}

export default heading;
