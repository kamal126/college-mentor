import { Suspense } from "react";
import type { Metadata } from "next";
import MentorProfileSkeleton from "@/components/ui/skeleton";
import MentorProfile from "./MentorProfile"


/* ============================= */
/*    Dynamic Metadata (SEO)     */
/* ============================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Mentor ${id} | AI College Mentor`,
    description: `View detailed profile and expertise of mentor ${id}.`,
  };
}

/* ============================= */
/*    Page Component             */
/* ============================= */

export default async function MentorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <Suspense fallback={<MentorProfileSkeleton />}>
        <MentorProfile mentorId={id} />
      </Suspense>
    </div>
  );
}
