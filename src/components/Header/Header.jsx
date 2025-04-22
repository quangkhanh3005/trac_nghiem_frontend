import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [code, setCode] = useState("");

  const idUser = sessionStorage.getItem("idUser");
  const role = sessionStorage.getItem("role") === "ADMIN";

  const handleOpenDropDown = () => setOpen(!isOpen);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/quiz/find/${code}`);
      if (response.status === 200) {
        const id = response.data;
        navigate(`/quiz/${id}`);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Không tìm thấy!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      console.error("API Error:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="bg-white shadow w-full z-50">
      <nav className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-3 flex-shrink-0 w-1/3 justify-start">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-lg font-semibold">Nhóm 4</span>
          </Link>
        </div>

        {/* Nút Tạo */}
        <div className="relative group flex justify-center items-center w-1/3">
          <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold cursor-pointer transition duration-300 group-hover:bg-blue-700 group-hover:rotate-2 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-400/50 z-30 relative">
            Tạo
          </div>
          {/* Tia sáng trái */}
          <div
            className={`absolute top-1/2 left-1/2 w-40 h-1 bg-yellow-400 rounded-full origin-right z-10 -translate-y-1/2 opacity-0 beam-left`}
          />

          {/* Tia sáng phải */}
          <div
            className={`absolute top-1/2 left-1/2 w-40 h-1 bg-yellow-400 rounded-full origin-left z-10 -translate-y-1/2 opacity-0 beam-right`}
          />
          <Link
            to="/create-topic"
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[-50%] opacity-0 group-hover:translate-x-[-270px] group-hover:opacity-100 transition-all duration-700 ease-out delay-200 bg-green-500 text-white px-4 py-2 rounded-full text-sm shadow-lg z-20"
          >
            Tạo Topic
          </Link>
          <Link
            to="/create-quiz"
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[50%] opacity-0 group-hover:translate-x-[200px] group-hover:opacity-100 transition-all duration-700 ease-out delay-200 bg-purple-600 text-white px-4 py-2 rounded-full text-sm shadow-lg z-20"
          >
            Tạo Quiz
          </Link>
        </div>

        {/* Search + User */}
        <div className="flex items-center space-x-4 w-1/3 justify-end">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center border rounded-full px-3 py-2 w-40 sm:w-52 md:w-64"
          >
            <input
              type="text"
              placeholder="Nhập mã code..."
              className="w-full pr-8 focus:outline-none text-sm"
              maxLength={6}
              minLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit" className="absolute right-3">
              <i className="fa fa-search text-gray-600"></i>
            </button>
          </form>

          <div className="relative">
            <button onClick={handleOpenDropDown} className="flex items-center">
              <i className="fa fa-user-circle text-2xl"></i>
              <i className="fa fa-chevron-down text-sm ml-1"></i>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleClick("/profile")}
                  >
                    Profile
                  </li>
                  {role && (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleClick("/admin")}
                    >
                      Admin
                    </li>
                  )}
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleClick(`/history/${idUser}`)}
                  >
                    History
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleClick("/libraries")}
                  >
                    Libraries
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleClick("/settings");
                    }}
                  >
                    Password
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Header;
