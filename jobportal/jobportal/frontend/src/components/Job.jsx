// Job.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Job = ({ job }) => {
  return (
    <div className="job-item">
      <h2>{job.title}</h2>
      <p>{job.description.substring(0, 100)}...</p>
      <Link to={`/jobs/${job._id}`}>View</Link>
    </div>
  );
};

export default Job;
