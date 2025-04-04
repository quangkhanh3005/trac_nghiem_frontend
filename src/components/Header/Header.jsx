import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        const id=response.data;
        navigate(`/quiz-detail/${id}`);
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) console.error("Error Data:", error.response.data);
    }
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
              placeholder="Nhập mã số code..."
              className="w-full pr-5 focus:outline-none text-base"
              maxLength={6}
              minLength={6}
              value={code}
              onChange={(e)=>setCode(e.target.value)}
            />
            <button className="absolute right-3" onSubmit={handleSearch}>
              <i className="fa fa-search text-black"></i>
            </button>
          </div>

          {/* Icon user và dropdown */}
          <div className="relative flex items-center h-10">
            {" "}
            {/* Thêm h-10 để căn chỉnh với ô tìm kiếm */}
            <button onClick={handleOpenDropDown} className="flex items-center">
              <i className="fa fa-user-circle" style={{ fontSize: "32px" }}></i>
              <i
                className="fa fa-angle-down px-2"
                style={{ fontSize: "20px" }}
              ></i>
            </button>
            {isopen && (
              <div className="absolute right-1 mt-2 w-40 bg-white border rounded-lg shadow-lg top-full">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    Settings
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
    </header>
  );
};

export default Header;
