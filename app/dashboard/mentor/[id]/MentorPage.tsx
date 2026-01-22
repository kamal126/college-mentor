
// import { Suspense } from "react";
// import MentorProfileSkeleton from "@/components/ui/skeleton";
// import MentorProfile from "@/components/mentor/mentorProfile";

// export default function MentorPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { id } =  params;

//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
//       <Suspense fallback={<MentorProfileSkeleton />}>
//         {/* <h1 className="text-black">{id}</h1> */}
//         <MentorProfile mentorId={id} />
//       </Suspense>
//     </div>
//   );
// }

export default function MentorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <div>{id}</div>;
}
