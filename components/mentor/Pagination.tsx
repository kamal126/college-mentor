"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ hasNextPage }: { hasNextPage: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        disabled={page <= 1}
        onClick={() => router.push(`?page=${page - 1}`)}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2 font-medium">
        Page {page}
      </span>

      <button
        disabled={!hasNextPage}
        onClick={() => router.push(`?page=${page + 1}`)}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
