import { mentors } from "@/data/data";
import SearchBar from "@/components/SearchBar";
import Cards from "@/components/mentor/Cards";
import { lusitana } from "@/components/font";
import MentorCard from "@/components/MentorCard";
import { toast } from "sonner";
import { Suspense } from "react";
import { MentorCardSkeleton } from "@/components/ui/skeleton";

export default async function Page(props:{
  searchParams?:Promise<{
    query?:string;
    page?:string;
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-center`}>Mentors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchBar placeholder="Search invoices..." />
      </div>
       {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <Suspense key={query + currentPage} fallback={<MentorCardSkeleton/>}>
        <Cards query={query} page={currentPage}/>
        </Suspense>
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
    </main>
  )
}




    // <main>
    //   {/* <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} /> */}

    //   {/* <div className="mt-4 px-4"> */}
    //     {/* {filteredMentors.length > 0 ? (
    //       filteredMentors.map((mentor, i) => (
    //         <MentorCard key={i} mentor={mentor} />
    //       ))
    //     ) : (
    //       <p>No mentors found.</p>
    //     )} */}
    //     {/* <MentorList/> */}
    //   {/* </div> */}
    // </main>
  // );
// }


// export default function Page() {

//     const [query, setQuery] = useState<string>("");

//     const handleSearch = () => {
//       if (!query.trim()) {
//         alert("Please enter a search term.");
//         return;
//       }

//       console.log("Searching for:", query);
//       // TODO: call API or navigate to results page
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter") {
//         handleSearch();
//       }
//     };

//     const filteredMentors = mentors.filter((mentor) =>
//       mentor.name.toLowerCase().includes(query.toLowerCase())
//     );

//   return (
//     <main>
//       <div className="max-w-xl mx-auto sticky top-0 bg-gray-300 rounded-full px-4 py-2 flex items-center gap-3">
//           <input
//             type="text"
//             placeholder="Search mentors..."
//             maxLength={200}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             className="flex-1 bg-transparent outline-none px-2"
//           />
//           <button
//             onClick={handleSearch}
//             className="px-5 py-2 rounded-full border border-gray-600 hover:bg-gray-400 transition"
//           >
//             Search
//           </button>
//         </div>

//         <div className="ml-3 m-2 w-full">
//           <div className="">
//             {filteredMentors.length > 0 ? (
//               filteredMentors.map((m, idx) => (
//                 <div
//                   key={idx}
//                   className="text-black dark:text-white border-3 hover:shadow-2xl p-6 space-y-4 mt-2 flex flex-col gap-4 md:flex-row rounded-2xl"
//                 >
//                   <div className="">
//                     <div className="flex gap-4">
//                       <div className="">
//                         <img
//                           src="https://www.geeksforgeeks.org/connect/_next/image?url=https%3A%2F%2Fmedia.geeksforgeeks.org%2Fauth%2Fprofile%2Fawaxza35wh9rn0zonena&w=96&q=75"
//                           alt=""
//                           height={100}
//                           width={100}
//                           className="rounded-full border border-green-700 border-4 bg-gray-500"
//                         />
//                       </div>
//                       <div className="">
//                         <h3 className="">{m.name}</h3>
//                         <p className="">
//                           {m.title} @ {m.company}
//                         </p>
//                         <p className="">
//                           Companies:{" "}
//                           <span>
//                             {m.companies.map((company) => company).join(", ")}
//                           </span>
//                         </p>
//                         <p className="">{m.experience} years experience</p>
//                       </div>
//                     </div>

//                     <div className="">
//                       <div className="">
//                         <p className="">
//                           I am a content creator , I create content around
//                           education, career and Tech
//                         </p>
//                         <span className="bg-gray-400 p-1 border border-white rounded-2xl mx-1">
//                           Career Guidance
//                         </span>
//                         <span className="bg-gray-400 p-1 border border-white rounded-2xl mx-1">
//                           Career Guidance
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="">
//                     <div className="flex justify-between bg-gray-300 p-4">
//                       <div className="">Rating : 4.5 ⭐</div>
//                       <div className="">Price : $10/hr</div>
//                     </div>
//                     <div className="">
//                       <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2">
//                         View Profile
//                       </button>
//                       <button className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2">
//                         Connect
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No mentors found.</p>
//             )}
//           </div>
//         </div>
//     </main>
//   )
// }
