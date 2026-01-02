import MentorProfile from "@/components/mentor/mentorProfile";
import { Suspense } from "react";
import type { Metadata } from "next";
import MentorProfileSkeleton from "@/components/ui/skeleton";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;

  // Ideally yahan API call hoti hai
  // const mentor = await getMentorById(id);

  return {
    title: `Mentor Profile – ${id}`,
    description: `View details and expertise of mentor ${id}`,
  };
}

export default async function MentorPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Suspense fallback={<MentorProfileSkeleton />}>
      {/* <h1 className="text-black">{id}</h1> */}
        <MentorProfile mentorId={{id}} />
      </Suspense>
    </div>
  );
}


