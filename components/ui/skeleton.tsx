import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

// Loading animation
export const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function MentorCardsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 dark:bg-gray-700 p-6 rounded-xl animate-pulse"
        >
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16 rounded-full bg-gray-400" />
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-400" />
              <div className="h-4 w-28 bg-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export function MentorListSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <MentorCardsSkeleton key={i} />
      ))}
    </>
  );
}


export function CardsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <MentorCardsSkeleton key={i} />
      ))}
    </div>
  );
}

export default function MentorProfileSkeleton() {
  return (
    <div className="bg-white mt-6 p-6 rounded-2xl animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-300 rounded w-5/6" />
    </div>
  );
}


export function LeftSidebarSkeleton(){
  return (
    <div className="relative w-full h-screen md:w-62 p-4 md:p-2 space-y-4">
          {/* Profile Card */}
          <div className="border rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="w-64 h-64 rounded-full bg-gray-500"></div>
    
              <div>
                <p className="uppercase font-semibold text-sm">
                </p>
                <p className="text-sm opacity-70">
                </p>
              </div>
            </div>
          </div>
    
          {/* Navigation */}
          <div className="border rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm">
              <div  className="block text-center p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              </div>
          </div>
    
          {/* Logout */}
          <div
            className="absolute bottom-10 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-red-400 p-3 cursor-pointer text-sm font-medium"
          >
          </div>
        </div>
  )
}




export function MentorCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-gray-200 dark:bg-white/10 animate-pulse space-y-4">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-gray-300 dark:bg-white/20 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-300 dark:bg-white/20 rounded w-1/3"></div>
          <div className="h-3 bg-gray-300 dark:bg-white/20 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-300 dark:bg-white/20 rounded w-full"></div>
      <div className="h-3 bg-gray-300 dark:bg-white/20 rounded w-5/6"></div>
    </div>
  );
}





export { Skeleton }
