import { Suspense } from "react";
import MentorProfileSkeleton from "@/components/ui/skeleton";
import MentorProfile from "./MentorProfile"

export default async function Mentor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <Suspense fallback={<MentorProfileSkeleton />}>
        <MentorProfile mentorId={id} id={id} />
      </Suspense>
    </div>
  );
}
