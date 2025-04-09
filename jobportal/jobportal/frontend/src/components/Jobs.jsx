// Jobs.jsx
import React from 'react';
import Job from './Job';

const Jobs = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job) => (
        <Job key={job._id} job={job} />
      ))}
    </div>
  );
};

export default Jobs;
