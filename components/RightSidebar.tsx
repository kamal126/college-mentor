import React from 'react'
import Link from 'next/link'
import { authors, trending } from '@/data/data'
import { BadgeCheck, TrendingUp } from 'lucide-react'

export default async function RightSidebar() {
  return (
    <div>
        <div className="border-2 rounded-lg m-2 p-2 dark:bg-black/50">
          <h2 className="text-xl font-bold m-2">Top Mentors</h2>
          {authors.map((author, idx) => (
            <div key={idx} className="flex gap-2 m-4">
              <div className="">
                <img
                  src={author.img}
                  alt=""
                  height={50}
                  width={50}
                  className="rounded-full border-green-700 border-2 bg-gray-500"
                />
              </div>
              <div className="">
                <span className="">
                  {author.name}
                  <BadgeCheck
                    className="inline-block ml-1 text-white"
                    size={16}
                    fill="blue"
                  />
                </span>
                <p className="">{author.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <TopMentorsClient/> */}

        {/* top offering */}
        <div className="border-2 rounded-lg m-2 p-2 dark:bg-black/50">
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
                <button className="border border-gray-700 m-1 p-1 rounded-2xl text-[12px]">
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
  )
}
