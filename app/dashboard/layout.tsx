import { ReactNode } from "react"
import LeftSidebar from "@/components/LeftSidebar"
// import RightSidebar from "@/components/RightSidebar"
import { Toaster } from "@/components/ui/sonner";
// import { motion as mt } from "framer-motion";
import TopMentor from "@/components/dashboard/TopMentor"; // right side bar


export default async function layout({children}: { children: ReactNode}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <Toaster className="absolute top-1 left-50"/>
        <div className="w-full flex-none md:w-64">
            <LeftSidebar/>
        </div>
        <div
        // initial={{opacity:0, y:10}}
        // animate={{opacity:1, y:0}}
        // transition={{type:'spring'}}
         className="grow p-6 md:overflow-y-auto md:p-16 bg-blue-50">
            {children}
        </div>

        <div className="hidden w-full lg:block lg:w-90">
            {/* <RightSidebar/> */}
            <TopMentor/>
        </div>
    </div>
  )
}
