import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const [isopen, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const idUser = sessionStorage.getItem("idUser");
  const role = sessionStorage.getItem("role") == "ADMIN" ? true : false;
  const handleOpenDropDown = () => {
    setOpen(!isopen);
  };
  const hanhdleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

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

  return (
    <header className="bg-white shadow">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center space-x-4 ml-auto">
          {/* Ô tìm kiếm */}
          <form
            onSubmit={handleSearch}
            className="relative flex items-center border rounded-lg px-3 py-2 w-48 h-10"
          >
            <input
              type="text"
              placeholder="Nhập mã số code..."
              className="w-full pr-5 focus:outline-none text-base"
              maxLength={6}
              minLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit" className="absolute right-3">
              <i className="fa fa-search text-black"></i>
            </button>
          </form>

          {/* Icon user và dropdown */}
          <div className="relative flex items-center h-10">
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
                  {role ? (
                    <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                      Admin
                    </li>
                  ) : null}
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
                  <li
                    className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                    onClick={() => {
                      hanhdleLogout();
                    }}
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
