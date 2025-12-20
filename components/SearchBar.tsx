"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


// import { useDebouncedCallback } from "use-debounce"; // wait for time next event or complete text

// export default function SearchBar({ query, setQuery, onSearch}: SearchBarProps) {
export default function SearchBar({placeholder}: {placeholder: string}) {

  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // const handleSearch = useDebouncedCallback((term)=>{
  //    // function defination paste here handleSearch 
  // }, 300);

  function handleSearch(term:string){
    console.log("Searching... ", term);
    const params = new URLSearchParams(searchparams?.toString());
    params.set('page', '1');
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchparams?.get("query")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
    </div>
  );
}
