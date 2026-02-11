import { Suspense } from "react";
import MentorProfileSkeleton from "@/components/ui/skeleton";
import MentorProfile from "@/components/mentor/MentorProfile";


export default async function MentorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = (await params);
  console.log(id);
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <Suspense fallback={<MentorProfileSkeleton />}>
        {/* <h1 className="text-black">{id}</h1> */}
        <MentorProfile mentorId={id} />
      </Suspense>
    </div>
  );
}



