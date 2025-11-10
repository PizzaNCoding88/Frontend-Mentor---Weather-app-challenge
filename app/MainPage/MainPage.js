import React from "react";
import SearchBox from "../components/SearchBox";
import { ChevronDown } from "lucide-react";
import { Settings } from "lucide-react";
import { Sun } from "lucide-react";

const MainPage = () => {
  return (
    <div className="mx-8 font-bricolage pt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun color="orange" size={25} />
          <h2 className="">Weather Now</h2>
        </div>
        <div className="bg-grey px-3 py-1 flex items-center gap-1">
          <Settings color="white" size={14} strokeWidth={2} />
          <p className="text-sm">Units</p>
          <ChevronDown color="white" size={14} strokeWidth={3} />
        </div>
      </div>
      <div className="text-center py-12">
        <h1 className="text-5xl font-semibold">
          How&apos;s the sky looking today?
        </h1>
      </div>
      <div>
        <SearchBox />
      </div>
    </div>
  );
};

export default MainPage;
