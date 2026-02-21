"use client";

import { useState, useTransition } from "react";
import { SearchIcon, X } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState(
    searchParams?.get("query")?.toString() || ""
  );

  const [isPending, startTransition] = useTransition();

  const updateURL = (term: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  // Debounce for performance
  const handleSearch = useDebouncedCallback((term: string) => {
    updateURL(term);
  }, 400);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
    setValue(term);
    handleSearch(term);
  }

  function clearSearch() {
    setValue("");
    updateURL("");
  }

  return (
    <div className="w-full max-w-lg">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <div className="relative group">
        {/* Input */}
        <input
          id="search"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm py-3 pl-12 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 outline-none focus:border-black focus:ring-4 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-white dark:focus:ring-white/20"
        />

        {/* Search Icon */}
        <SearchIcon
          className=" pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-black dark:text-gray-500 dark:group-focus-within:text-white
          "
        />

        {/* Clear Button */}
        {value && (
          <button
            onClick={clearSearch}
            type="button"
            className=" absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition dark:hover:bg-gray-700 dark:text-gray-500 dark:hover:text-white
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Loading Indicator */}
        {isPending && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent dark:border-gray-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
