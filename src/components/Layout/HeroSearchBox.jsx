import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

const Section = () => {
  const [searchType, setSearchType] = useState("Talent");

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[90%] lg:w-[80%] -mt-[57px] p-2 md:h-24 rounded-2xl flex flex-col md:flex-row items-center gap-3 shadow-lg bg-white">
          <div className="w-full md:w-[60%] flex justify-center md:block">
            <Link
              to={{
                pathname: searchType === "Talent" ? "/view-all/freelancer" : "/projects",
              }}
            >
              <div className="flex flex-row items-center gap-3 p-4 md:border-r-2 border-r-[#1C3865] cursor-text">
                <IoMdSearch className="w-5 h-5 text-[#797979]" />
                <p className="text-xs lg:text-base text-gray-500">
                  {searchType === "Talent"
                    ? "Search for the best freelancers in one place."
                    : "Finding the best freelance jobs according your skills "}
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full md:w-[40%] flex justify-center items-center gap-3">
            <div>
              <select className="w-28 h-12 bg-gray-100 text-[#797979] text-sm font-normal rounded-lg block p-2.5" onClick={handleSearchTypeChange}>
                <option value="Talent">Talent</option>
                <option value="Jobs">Jobs</option>
              </select>
            </div>
            <div className="">
              <Link
                to={{
                  pathname: searchType === "Talent" ? "/view-all/freelancer" : "/projects",
                }}
              >
                <button className="w-28 h-12 rounded font-semibold text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]">Search</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
