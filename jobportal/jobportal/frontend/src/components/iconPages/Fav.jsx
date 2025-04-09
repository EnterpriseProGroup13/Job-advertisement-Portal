import React from 'react';
import NavIcons from "../shared/NavIcons";

const Favorites = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavIcons />
      <div className="flex items-center justify-center max-w-7xl mx-auto p-6">
        <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-md p-6">
          <h1 className="text-2xl font-bold text-[#003366] mb-4">Favorites</h1>
          <p className="text-gray-700">
            Your favorite jobs will appear here once available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
