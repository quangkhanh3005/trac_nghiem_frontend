import React from "react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b text-black transition-all duration-300 ease-in-out">
      <nav className="mt-6">
        <ul className="space-y-3">
          {/* Logo */}
          <li className="flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              <span className="text-lg font-semibold">Nhóm 4</span>
            </Link>
          </li>

          {/* Menu Items */}
          <li>
            <Link
              to="/admin/quizz"
              className={`flex items-center p-4 mx-2 rounded-lg transition-all duration-200 ${
                currentPath === "/admin/quizz"
                  ? "bg-gray-200 shadow-inner"
                  : "hover:shadow-lg"
              }`}
            >
              <i className="fa fa-user text-xl" />
              <span className="ml-4 font-sans text-lg">Quizz</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={`flex items-center p-4 mx-2 rounded-lg transition-all duration-200 ${
                currentPath === "/admin"
                  ? "bg-gray-200 shadow-inner"
                  : "hover:shadow-lg"
              }`}
            >
              <i className="fa fa-cogs text-xl" />
              <span className="ml-4 font-sans text-lg">Topic</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
