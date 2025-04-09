import React from "react";
import { useNavigate } from "react-router-dom";


const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (

      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white shadow-xl rounded-xl p-10 text-center space-y-4">
          <p className="text-lg text-gray-700">Không Có Dữ Liệu!</p>
          <button
            onClick={handleGoHome}
            className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold "
          >
            Trở về Trang chủ
          </button>
        </div>
      </div>

  );
};

export default NotFound;