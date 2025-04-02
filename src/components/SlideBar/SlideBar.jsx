import React from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b  text-black transition-all duration-300 ease-in-out">
      <nav className="mt-6">
        <ul className="space-y-3">
          {/* Logo */}
          <li className="flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-3"> {/* Thêm flex và space-x-3 để căn chỉnh */}
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold">Nhóm 4</span> {/* Thêm font-semibold để chữ nổi bật */}
            </Link>
          </li>

          {/* Menu Items */}
          <li>
            <Link
              to="/profile"
              className="flex items-center p-4 mx-2 rounded-lg  hover:shadow-lg transition-all duration-200"
            >
              <i className="fa fa-user text-xl" />
              <span className="ml-4 font-sans text-lg">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center p-4 mx-2 rounded-lg  hover:shadow-lg transition-all duration-200"
            >
              <i className="fa fa-cogs text-xl" />
              <span className="ml-4 font-sans text-lg">Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className="flex items-center p-4 mx-2 rounded-lg  hover:shadow-lg transition-all duration-200"
            >
              <i className="fa fa-envelope text-xl" />
              <span className="ml-4 font-sans text-lg">Messages</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;