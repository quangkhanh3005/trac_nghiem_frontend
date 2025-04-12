import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();
  const [isopen, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [code, setCode]= useState("");

  const [code, setCode] = useState("");
  const idUser = sessionStorage.getItem("idUser");

  const handleOpenDropDown = () => {
    setOpen(!isopen);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/quiz/find/${code}`);
      if (response.status === 200) {
        const id=response.data;
        navigate(`/quiz-detail/${id}`);
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
          <form className="relative flex items-center border rounded-lg px-3 py-2 w-48 h-10">
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
            <button className="absolute right-3" onSubmit={handleSearch}>
              <i className="fa fa-search text-black"></i>
            </button>
          </form>


          {/* Icon user và dropdown */}
          <div className="relative flex items-center h-10">
            {" "}
            {/* Thêm h-10 để căn chỉnh với ô tìm kiếm */}
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
                  <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    Settings
                  </li>

                  <Link to={`/history/${idUser}`}>
                    <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                      History
                    </li>
                  </Link>
                  <Link to={"/libraries"}>
                    <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                      Libraries
                    </li>
                  </Link>

                  <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

         
        </div>
      </nav>
    </header>
  );
};

export default Header;
