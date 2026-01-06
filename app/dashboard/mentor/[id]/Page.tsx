import MentorProfile from "@/components/mentor/mentorProfile";
import { Suspense } from "react";
import MentorProfileSkeleton from "@/components/ui/skeleton";

export default async function MentorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Suspense fallback={<MentorProfileSkeleton />}>
      {/* <h1 className="text-black">{id}</h1> */}
        <MentorProfile mentorId={id} />
      </Suspense>
    </div>
  );
}
