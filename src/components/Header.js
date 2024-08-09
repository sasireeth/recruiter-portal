import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex space-x-4">
          <Link to="/applications" className="text-white hover:text-gray-200 font-medium">
            Home
          </Link>
          <Link to="/notifications" className="text-white hover:text-gray-200 font-medium">
            Notifications
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
