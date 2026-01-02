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
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

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



export { Skeleton }
