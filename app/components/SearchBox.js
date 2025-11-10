"use client";
import React from "react";
import { useState } from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  return (
    // <form className="flex">
    //   <Search />
    //   <input
    //     type="text"
    //     value={query}
    //     placeholder="Search for a place..."
    //   ></input>
    // </form>

    // <form className="flex">
    //   <Search size={20} />
    //   <input type="text" value={query} placeholder="Search for a city..." />
    // </form>
    <div className="flex flex-col gap-4 font-dmsans">
      <form
        className="flex items-center bg-grey  rounded-md 
                 px-3 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-blue-500"
      >
        <Search className="text-gray-400 ml-1" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          className="flex-1 bg-transparent outline-none pl-2 text-gray-400 placeholder:text-gray-400"
        />
      </form>
      <button className="bg-purple rounded-md px-3 py-2 w-full">Search</button>
    </div>
  );
};

export default SearchBox;
