import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);

    const exampleJobs = [
        {
            _id: "1",
            title: "Build a Portfolio Website",
            description: "Need a web developer to build a React portfolio website.",
            location: "London, UK",
            type: "Freelance",
            budget: 300,
            deadline: "2025-04-10",
            rating: 4.7,
            postedBy: {
                username: "JohnDoe123",
                profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
            }
        },
        {
            _id: "2",
            title: "Create a Logo for My Business",
            description: "Looking for a graphic designer to create a modern logo.",
            location: "Manchester, UK",
            type: "One-time",
            budget: 100,
            deadline: "2025-03-20",
            rating: 4.5,
            postedBy: {
                username: "SarahDesigns",
                profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
            }
        },
        {
            _id: "3",
            title: "Develop a Mobile App",
            description: "Seeking a React Native developer for a basic mobile app.",
            location: "Birmingham, UK",
            type: "Part-time",
            budget: 2000,
            deadline: "2025-05-15",
            rating: 4.9,
            postedBy: {
                username: "MikeTech",
                profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
            }
        }
    ];

    // Filters
    const [jobType, setJobType] = useState("");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [deadline, setDeadline] = useState("");
    const [rating, setRating] = useState("");

    // Use either `allJobs` from Redux or exampleJobs if `allJobs` is empty
    const [filterJobs, setFilterJobs] = useState(allJobs.length > 0 ? allJobs : exampleJobs);

    useEffect(() => {
        let filteredJobs = allJobs.length > 0 ? allJobs : exampleJobs;

        // Apply search query filter
        if (searchedQuery) {
            filteredJobs = filteredJobs.filter(job =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
        }

        // Apply filters
        if (jobType) filteredJobs = filteredJobs.filter(job => job.type.toLowerCase() === jobType.toLowerCase());
        if (location) filteredJobs = filteredJobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
        if (budget) filteredJobs = filteredJobs.filter(job => job.budget <= budget);
        if (deadline) filteredJobs = filteredJobs.filter(job => new Date(job.deadline) <= new Date(deadline));
        if (rating) filteredJobs = filteredJobs.filter(job => job.rating >= rating);

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery, jobType, location, budget, deadline, rating]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    {/* Left side - Filters */}
                    <div className='w-1/4'>
                        <FilterCard 
                            setJobType={setJobType} 
                            setLocation={setLocation} 
                            setBudget={setBudget} 
                            setDeadline={setDeadline} 
                            setRating={setRating} 
                        />
                    </div>
                    {/* Right side - Job Listings */}
                    {
                        filterJobs.length <= 0 ? <span>No jobs found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {filterJobs.map(job => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job._id}
                                        >
                                            <Job job={job} buttonColor="bg-red-600" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;
