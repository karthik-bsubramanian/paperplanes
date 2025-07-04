import { useState } from "react";
import { SearchIcon } from "lucide-react"; // lucide icons

export function Search({setSearchQuery}:{setSearchQuery: (data: string)=>void}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center mt-9 space-x-2 mr-10">
      <div
        className={`!transition-all h-10 flex items-center duration-300 ease-in-out ${open ? "w-48 opacity-100" : "w-0 opacity-0"} 
        overflow-hidden border border-gray-300 rounded-full px-3 py-1 bg-white`}
      >
        <input
          type="text"
          placeholder="Search"
          onChange={e=>setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      <button
        title="search icon"
        onClick={() => setOpen(!open)}
        className="w-12 h-12 cursor-pointer flex items-center justify-center border border-gray-300 rounded-full  text-white hover:bg-green bg-teal-800 transition"
      >
        <SearchIcon size={16} />
      </button>
    </div>
  );
}
