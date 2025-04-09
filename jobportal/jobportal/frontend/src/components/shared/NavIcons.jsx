import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bell, Settings, User2 } from 'lucide-react';

const NavIcons = () => {
  return (
    <div className="flex items-center gap-6 text-[#003366]">
      {/* Favorites Icon: Link to favorites page */}
      <Link to="/favorites">
        <Heart
          className="h-6 w-6 cursor-pointer hover:text-[#002244]"
          title="Favorites"
        />
      </Link>

      {/* Notifications Icon: Link to notifications page */}
      <Link to="/notifications">
        <Bell
          className="h-6 w-6 cursor-pointer hover:text-[#002244]"
          title="Notifications"
        />
      </Link>


      {/* Profile Icon: Link to profile page */}
      <Link to="/profile">
        <User2
          className="h-6 w-6 cursor-pointer hover:text-[#002244]"
          title="Profile"
        />
      </Link>
    </div>
  );
};

export default NavIcons;
