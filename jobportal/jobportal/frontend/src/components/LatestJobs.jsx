// LatestJobs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Latest Jobs</h2>
      <LatestJobCards jobs={jobs} />
    </div>
  );
};

export default LatestJobs;
