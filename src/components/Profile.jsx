import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, DollarSign } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.profile?.firstName} {user?.profile?.lastName}</h1>
                            <p>{user?.profile?.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen />
                    </Button>
                </div>

                {/* User Info Section */}
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber || 'Phone number not provided'}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <span className="font-semibold">Location: </span>
                        <span>{user?.profile?.location || 'Location not set'}</span>
                    </div>
                </div>

                {/* Freelancer-specific Info: Hourly Rate */}
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <DollarSign />
                        <span>{user?.profile?.hourlyRate ? `$${user.profile.hourlyRate} per hour` : 'Hourly rate not set'}</span>
                    </div>
                </div>

                {/* Freelancer Skills */}
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length > 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>No skills added</span>
                        }
                    </div>
                </div>

                {/* Portfolio or Resume */}
                <div className='my-5'>
                    <h1>Portfolio/Resume</h1>
                    {
                        user?.profile?.portfolioLink ? 
                            <a target='blank' href={user?.profile?.portfolioLink} className='text-blue-500 w-full hover:underline cursor-pointer'>
                                {user?.profile?.portfolioOriginalName || 'View Portfolio'}
                            </a> 
                        : <span>No portfolio available</span>
                    }
                </div>
            </div>

            {/* Freelancers' Applied Jobs */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Profile Update Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
