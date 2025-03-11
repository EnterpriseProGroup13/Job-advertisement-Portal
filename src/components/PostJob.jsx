import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
      
    // Define jobTypes and experienceLevels arrays
        const jobTypes = ["Full-Time", "Part-Time", "Internship", "Contract"];
        const experienceLevels = ["Entry-Level", "Mid-Level", "Senior-Level", "Intern"];

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex justify-center items-start w-full my-10">
                <form onSubmit={submitHandler} className="w-full max-w-4xl p-6 bg-white border border-gray-200 shadow-xl rounded-md">
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label>Description</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                rows="4"
                                className="my-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <Label>Requirements</Label>
                            <textarea
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                rows="4"
                                className="my-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <Label>Averange Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Job Type Dropdown */}
                        <div>
                            <Label>Job Type</Label>
                            <Select onValueChange={(value) => selectChangeHandler(value, "jobType")}>
                                <SelectTrigger className="w-full p-3 border rounded-md bg-white text-blue-700 focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-blue-700">
                                    <SelectGroup>
                                        {jobTypes.map((type, index) => (
                                            <SelectItem key={index} value={type} className="hover:bg-blue-500 hover:text-white">
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Experience Level Dropdown */}
                        <div>
                            <Label>Experience Level</Label>
                            <Select onValueChange={(value) => selectChangeHandler(value, "experience")}>
                                <SelectTrigger className="w-full p-3 border rounded-md bg-white text-blue-700 focus:ring-2 focus:ring-blue-700">
                                    <SelectValue placeholder="Select Experience Level" />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-blue-700">
                                    <SelectGroup>
                                        {experienceLevels.map((level, index) => (
                                            <SelectItem key={index} value={level} className="hover:bg-blue-700 hover:text-white">
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* No of Positions */}
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            {loading ? (
                                <Button className="w-full p-4 bg-blue-500 text-white" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full p-4 bg-blue-500 text-white">
                                    Post New Job
                                </Button>
                            )}
                        </div>

                        {/* No companies message */}
                        {companies.length === 0 && (
                            <p className="text-xs text-red-600 font-bold text-center my-3">
                                *Please register first, before posting a job
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
