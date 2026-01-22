import SearchBar from "@/components/SearchBar";
import Cards from "@/components/mentor/Cards";
import { lusitana } from "@/components/font";
import { Suspense } from "react";
import { MentorCardsSkeleton } from "@/components/ui/skeleton";
import { fetchFilteredMentorsCount } from "@/lib/data";
import Pagination from "@/components/mentor/Pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.query ?? "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const total = await fetchFilteredMentorsCount(query);
  const hasNextPage = currentPage*10<total; // assuming 10 per page
  
  return (
    <main>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl text-center`}>
            Mentors
          </h1>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <SearchBar placeholder="Search mentors..." />
        </div>

        <Suspense
          key={query + currentPage}
          fallback={<MentorCardsSkeleton />}
        >
          <Cards query={query} page={currentPage} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          {/* Pagination later */}
          <Pagination hasNextPage={hasNextPage}/>
        </div>
      </div>
    </main>
  );
}
