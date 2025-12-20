import { fetchTopMentor } from "@/lib/data";
import { BadgeCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { trending } from "@/data/data";

export default async function TopMentor() {
  const topMentor = await fetchTopMentor();

  return (
    <>
      <div className="flex flex-col">
        <div className="border border-2 rounded-lg m-2 p-2 dark:bg-black/50">
          <h2 className="text-xl font-bold m-2">Top Mentors</h2>
          {/* {topMentor.map((m,i)=>(
        <p key={i} className="">{m.fullName}</p>
    ))} */}
          {topMentor.map((m, idx) => (
            <div key={idx} className="flex gap-2 m-2 p-2 rounded-md cursor-pointer hover:bg-blue-100 ">
              <div className="">
                <img
                  src={m.avatar}
                  alt=""
                  height={50}
                  width={50}
                  className="rounded-full border-green-700 border-2 bg-gray-500"
                />
              </div>
              <div className="">
                <span className="">
                  {m.fullName}
                  <BadgeCheck
                    className="inline-block ml-1 text-white"
                    size={16}
                    fill="blue"
                  />
                </span>
                <p className="">{m.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-2 rounded-lg m-2 p-2 dark:bg-black/50">
          <h2 className="text-xl font-bold m-2">
            Top Offerings
            <TrendingUp
              className="inline-block ml-1 text-green-600"
              size={25}
            />
          </h2>
          <div className="grid grid-cols-2">
            {trending.map((trend, i) => (
              <div key={i} className="">
                <button className="border border-gray-700 m-1 py-1 px-3 text-center rounded-2xl text-[12px] cursor-pointer hover:bg-blue-700 hover:text-white">
                  {trend}
                </button>
              </div>
            ))}
          </div>
          <Link href={"/trending"}>
            <p className="text-center">view all</p>
          </Link>
        </div>
      </div>
    </>
  );
}
