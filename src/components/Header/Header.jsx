import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
const Header = () => {
  const navigate = useNavigate();
  const [isopen, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [code, setCode]= useState("");
  const handleOpenDropDown = () => {
    setOpen(!isopen);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/find/${code}`);
      if (response.status === 200) {
        const id = response.data;
        navigate(`/quiz-detail/${id}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) console.error("Error Data:", error.response.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("idUser");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center space-x-4 ml-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex items-center border rounded-lg px-3 py-2 w-48 h-10">
            {" "}
            {/* Thêm h-10 để cố định chiều cao */}
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


          {/* User dropdown */}
          <div className="relative">
            <button onClick={handleOpenDropDown} className="flex items-center">
              <i className="fa fa-user-circle text-2xl"></i>
              <i className="fa fa-chevron-down text-sm ml-1"></i>
            </button>
            {isopen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/profile">Profile</Link>
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/listQuiz">History</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

         
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="block lg:hidden px-4 pb-3 space-y-2">
          <Link
            to="/create-quiz"
            className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow"
          >
            + Tạo Câu Hỏi
          </Link>
          <Link
            to="/profile"
            className="block text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
          >
            Profile
          </Link>
          <Link
            to="/listQuiz"
            className="block text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
          >
            History
          </Link>
          <Link
            to="/settings"
            className="block text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded"
          >
            Settings
          </Link>
          <div
            className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
