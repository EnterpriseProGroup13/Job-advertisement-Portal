import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, ArrowLeft, Heart, Bell, Settings, User2 } from 'lucide-react'; // Icons
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { FaBars } from 'react-icons/fa'; // Hamburger menu icon

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Default to closed menu

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex">
            {/* Sidebar Menu */}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-64 h-full bg-[#003366] text-white shadow-lg z-50 p-5 flex flex-col">
                    {/* Close Button */}
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="mb-8 flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-6 h-6 " /> 
                    </button>
                    
                    {/* Navigation Links */}
                    <ul className="flex flex-col gap-6 text-lg font-medium">
                        <li><Link to="/" className="hover:text-gray-600">Home</Link></li>
                        <li><Link to="/jobs" className="hover:text-gray-600">Job Listing</Link></li>
                        <li><Link to="/browse" className="hover:text-gray-600">Browse</Link></li>
                        {/* Added Profile Link */}
                        {user && <li><Link to="/profile" className="hover:text-gray-600">Profile</Link></li>}
                    </ul>
                </div>
            )}

            {/* Navbar (Main Content) */}
            <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
                {/* Menu Button (When Closed) */}
                {!isMenuOpen && (
                    <button onClick={() => setIsMenuOpen(true)} className="text-white text-3xl">
                        <FaBars />
                    </button>
                )}

                {/* Post a Job Button */}
                <div className="flex items-center gap-6 ml-6">
                    <Link to="/PostJob">
                        <button className="bg-[#6A38C2] text-white px-6 py-2 rounded-lg hover:bg-[#5b30a6]">
                            Post a Job
                        </button>
                    </Link>
                </div>

                {/* Logo */}
                <div className="flex-1 flex justify-center relative">
                    <h1 className='text-3xl font-bold text-[#6A38C2] relative left-10'>
                        Job<span className='text-[#F83002]'>Portal</span>
                    </h1>
                </div>

                {/* Icons: Favorites, Notifications, Settings, Profile */}
                <div className="flex items-center gap-6 text-[#6A38C2] ml-16">
                    <Heart className="h-6 w-6 cursor-pointer hover:text-[#F83002]" title="Favorites" />
                    <Bell className="h-6 w-6 cursor-pointer hover:text-[#F83002]" title="Notifications" />
                    <Settings className="h-6 w-6 cursor-pointer hover:text-[#F83002]" title="Settings" />
                    
                    {/* Profile Icon: Link to Profile Page */}
                    <Link to="/profile">
                        <User2 className="h-6 w-6 cursor-pointer hover:text-[#F83002]" title="Profile" />
                    </Link>
                </div>

                {/* User Controls */}
                {!user ? (
                    <div className='flex items-center gap-2 ml-6'>
                        <Link to="/login">
                            <button className="bg-white border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-[#6A38C2] text-white px-4 py-2 rounded-lg hover:bg-[#5b30a6]">
                                Signup
                            </button>
                        </Link>
                    </div>
                ) : (
                    <button onClick={logoutHandler} className="flex items-center gap-2 text-black hover:text-gray-600">
                        <LogOut /> Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
