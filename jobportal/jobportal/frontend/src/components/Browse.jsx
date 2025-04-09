import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Browse = () => {
  const [jobs, setJobs] = useState([]);

  // You could read query params or Redux state for filter conditions
  useEffect(() => {
    // fetch all or filtered jobs
    axios.get('/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Browse Jobs</h1>
      {/* Could show <FilterCard /> here or inline filtering */}
      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          {/* etc. */}
        </div>
      ))}
    </div>
  );
};

export default Browse;
