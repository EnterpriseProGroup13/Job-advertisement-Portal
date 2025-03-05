import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    
    // Adding state for the filters
    const [jobType, setJobType] = useState("");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [deadline, setDeadline] = useState("");
    const [rating, setRating] = useState("");
    
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        let filteredJobs = allJobs;

        // Apply search query filter
        if (searchedQuery) {
            filteredJobs = filteredJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
        }

        // Apply other filters
        if (jobType) {
            filteredJobs = filteredJobs.filter(job => job.type.toLowerCase() === jobType.toLowerCase());
        }
        if (location) {
            filteredJobs = filteredJobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
        }
        if (budget) {
            filteredJobs = filteredJobs.filter(job => job.budget <= budget);
        }
        if (deadline) {
            filteredJobs = filteredJobs.filter(job => new Date(job.deadline) <= new Date(deadline));
        }
        if (rating) {
            filteredJobs = filteredJobs.filter(job => job.rating >= rating);
        }

        setFilterJobs(filteredJobs);

    }, [allJobs, searchedQuery, jobType, location, budget, deadline, rating]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    {/* Left side for filters */}
                    <div className='w-1/4'>
                        <FilterCard 
                            setJobType={setJobType} 
                            setLocation={setLocation} 
                            setBudget={setBudget} 
                            setDeadline={setDeadline} 
                            setRating={setRating} 
                        />
                    </div>
                    {/* Right side for displaying filtered jobs */}
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs;
