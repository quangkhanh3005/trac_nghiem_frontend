import React from "react";
import { Link, useLocation } from "react-router-dom";

const SlideBar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`fixed mt-16 left-0  h-full w-64 bg-gradient-to-b from-gray-900 to-gray-700 text-white transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <nav className="mt-6">
        <ul className="space-y-3">
          {/* Logo */}
          <li className="flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="h-8 sm:h-10 w-auto" />
              <span className="text-lg font-semibold">Nhóm 4</span>
            </Link>
          </li>

          {/* Menu Items */}
          <li>
            <Link
              to="/admin/quizz"
              className={`flex items-center p-4 mx-2 rounded-lg transition-all duration-200 ${
                currentPath === "/admin/quizz"
                  ? "bg-gray-200 text-gray-900 shadow-inner"
                  : "hover:bg-gray-600 hover:shadow-lg"
              }`}
              onClick={closeSidebar}
            >
              <i className="fa fa-user text-lg sm:text-xl" />
              <span className="ml-4 font-sans text-base">Quizz</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={`flex items-center p-4 mx-2 rounded-lg transition-all duration-200 ${
                currentPath === "/admin"
                  ? "bg-gray-200 text-gray-900 shadow-inner"
                  : "hover:bg-gray-600 hover:shadow-lg"
              }`}
              onClick={closeSidebar}
            >
              <i className="fa fa-cogs text-lg sm:text-xl" />
              <span className="ml-4 font-sans text-base">Topic</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SlideBar;
