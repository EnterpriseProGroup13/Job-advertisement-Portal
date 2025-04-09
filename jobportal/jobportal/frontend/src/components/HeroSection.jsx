import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, SlidersHorizontal } from "lucide-react"; // Added filter icon
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [rating, setRating] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Toggle filter visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    const searchFilters = { query, jobType, location, budget, deadline, rating };
    dispatch(setSearchedQuery(searchFilters));
    navigate("/browse");
  };

  return (
    <div className="relative text-center">
      <div className="flex flex-col gap-5 my-10">
        {/* Tagline */}
        <span className="mx-auto px-4 py-2 rounded-full bg-[#E0F0FF] text-[#003366] font-medium">
          Apply for Jobs or Post Job Openings—All in One Place!
        </span>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold italic text-[#003366] mt-6">
          Elevate Your Career and Network <br /> with Experts!
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center items-center mt-10 relative w-full">
          <div className="relative flex w-full max-w-[90%] lg:max-w-[70%] bg-[#E0F0FF] rounded-lg shadow-lg">
            {/* Advanced Search Button */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="py-5 px-6 bg-[#F0F8FF] border-l border-[#003366] rounded-l-lg flex items-center gap-2 hover:bg-[#D0E4FF] transition-all"
            >
              <SlidersHorizontal className="h-6 w-6 text-[#003366]" />
            </Button>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Find Your Next Job Opportunity..."
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-5 px-6 text-xl italic bg-transparent focus:outline-none placeholder-[#003366] text-[#003366]"
            />

            {/* Search Button */}
            <Button
              onClick={searchJobHandler}
              className="py-5 px-6 bg-[#003366] text-white border-l border-[#003366] rounded-r-lg hover:bg-[#002244] transition-all"
            >
              <Search className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters (Below Search Bar) */}
        {showFilters && (
          <div className="mt-4 bg-white shadow-lg rounded-lg p-6 w-[90%] lg:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 border border-[#003366]">
            {/* Job Type */}
            <select
              onChange={(e) => setJobType(e.target.value)}
              className="py-3 px-4 rounded-lg border bg-white shadow-md text-[#003366] focus:ring-2 focus:ring-[#003366]"
            >
              <option value="">Job Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>

            {/* Location */}
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              className="py-3 px-4 rounded-lg border bg-white shadow-md text-[#003366] focus:ring-2 focus:ring-[#003366]"
            />

            {/* Budget Range */}
            <input
              type="number"
              placeholder="Max Budget (£)"
              onChange={(e) => setBudget(e.target.value)}
              className="py-3 px-4 rounded-lg border bg-white shadow-md text-[#003366] focus:ring-2 focus:ring-[#003366]"
            />

            {/* Deadline */}
            <input
              type="date"
              onChange={(e) => setDeadline(e.target.value)}
              className="py-3 px-4 rounded-lg border bg-white shadow-md text-[#003366] focus:ring-2 focus:ring-[#003366]"
            />

            {/* Rating */}
            <select
              onChange={(e) => setRating(e.target.value)}
              className="py-3 px-4 rounded-lg border bg-white shadow-md text-[#003366] focus:ring-2 focus:ring-[#003366]"
            >
              <option value="">Rating</option>
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
