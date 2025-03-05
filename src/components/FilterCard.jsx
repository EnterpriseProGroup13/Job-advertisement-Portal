import React from 'react';

const FilterCard = ({ setJobType, setLocation, setBudget, setDeadline, setRating }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg p-5'>
            <h3 className='font-semibold text-lg mb-4'>Filters</h3>

            {/* Job Type Filter */}
            <select 
                onChange={(e) => setJobType(e.target.value)} 
                className='w-full p-3 mb-4 rounded-md border'
            >
                <option value="">Select Job Type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
            </select>

            {/* Location Filter */}
            <input 
                type="text" 
                placeholder="Location" 
                onChange={(e) => setLocation(e.target.value)}
                className='w-full p-3 mb-4 rounded-md border'
            />

            {/* Budget Filter */}
            <input 
                type="number" 
                placeholder="Max Budget ($)" 
                onChange={(e) => setBudget(e.target.value)}
                className='w-full p-3 mb-4 rounded-md border'
            />

            {/* Deadline Filter */}
            <input 
                type="date" 
                onChange={(e) => setDeadline(e.target.value)}
                className='w-full p-3 mb-4 rounded-md border'
            />

            {/* Rating Filter */}
            <select 
                onChange={(e) => setRating(e.target.value)} 
                className='w-full p-3 mb-4 rounded-md border'
            >
                <option value="">Select Rating</option>
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
            </select>
        </div>
    );
};

export default FilterCard;
