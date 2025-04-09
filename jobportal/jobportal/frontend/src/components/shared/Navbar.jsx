import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, ArrowLeft } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { FaBars } from "react-icons/fa";
import NavIcons from "./NavIcons"; // Import the NavIcons component

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
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
          {/* Close Button (Blue Arrow) */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="mb-8 flex items-center gap-2 px-4 py-2 bg-white text-[#003366] rounded-lg hover:bg-[#E0F0FF] transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          {/* Navigation Links */}
          <ul className="flex flex-col gap-6 text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-[#E0F0FF]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-[#E0F0FF]">
                Job Listing
              </Link>
            </li>
            <li>
              <Link to="/browse" className="hover:text-[#E0F0FF]">
                Browse
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/profile" className="hover:text-[#E0F0FF]">
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Navbar (Main Content) */}
      <div className="w-full flex items-center justify-between px-6 py-4 bg-[#E0F0FF] shadow-md">
        {/* Menu Button */}
        {!isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-white border border-[#003366] text-[#003366] px-4 py-2 rounded-lg hover:bg-[#E0F0FF] text-3xl transition-all duration-200"
          >
            <FaBars />
          </button>
        )}

        {/* Post a Job Button */}
        <div className="flex items-center gap-6 ml-6">
          <Link to="/post-job">
            <button className="bg-[#003366] text-white px-6 py-2 rounded-lg hover:bg-[#002244]">
              Post a Job
            </button>
          </Link>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center relative">
          <h1 className="text-3xl font-bold text-[#003366] relative left-10">
            Job<span className="text-[#800080]">Portal</span>
          </h1>
        </div>

        {/* Icons Section using NavIcons */}
        <NavIcons />

        {/* User Controls */}
        {!user ? (
          <div className="flex items-center gap-2 ml-6">
            <Link to="/login">
              <button className="bg-white border border-[#003366] text-[#003366] px-4 py-2 rounded-lg hover:bg-[#E0F0FF]">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-[#002244]">
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 text-[#003366] hover:text-[#002244]"
          >
            <LogOut /> Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
