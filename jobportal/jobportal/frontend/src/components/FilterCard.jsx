import React, { useState } from 'react';

const FilterCard = () => {
  const [location, setLocation] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSearch = () => {
    // e.g., dispatch a Redux action or navigate to /browse with query params
    // or update a local state that triggers a job fetch
  };

  return (
    <div className="filter-card">
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Budget"
        value={budgetMin}
        onChange={(e) => setBudgetMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Budget"
        value={budgetMax}
        onChange={(e) => setBudgetMax(e.target.value)}
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FilterCard;
