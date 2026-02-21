// app/dashboard/layout.tsx
import LeftSidebar from "@/components/LeftSidebar";
import TopMentor from "@/components/mentor/TopMentor";
// import { fetchTopMentor } from "@/lib/data"; // server-safe
import Providers from "@/components/Provider";
import { ReactNode, Suspense } from "react";
import { LeftSidebarSkeleton } from "@/components/ui/skeleton";

export default async function Layout({ children }: {children:ReactNode}) {
  // const mentors = await fetchTopMentor(); // server-side fetch

  return (
    <Providers>
      <div className="flex h-screen bg-blue-50 dark:bg-black/10">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col w-64 border-r overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <Suspense fallback={<LeftSidebarSkeleton />}>
            <LeftSidebar />
          </Suspense>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          {children}
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:flex  overflow-hidden lg:flex-col w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <TopMentor/>
        </div>
      </div>
    </Providers>
  );
}
