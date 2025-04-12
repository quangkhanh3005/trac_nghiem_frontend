import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserLayout from "../layouts/UserLayout";

const Setting = () => {
  const [setting, setSetting] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Mật khẩu mới không trùng khớp");
      return;
    }

    if (!validatePassword(setting.newPassword)) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự, bao gồm chữ cái và số.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/auth/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.Status) {
        navigate("/dashboard/employee");
      } else {
        setError(response.data.Error || "Đã xảy ra lỗi, vui lòng thử lại.");
      }
    } catch (err) {
      if (err.response && err.response.data.Error) {
        setError(err.response.data.Error);
      } else {
        setError("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    }
  };

  return (
    <UserLayout>
    <div className="flex justify-center my-3">
      <div className="p-7 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Thay Đổi Mật Khẩu
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border-l-4 border-red-500 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="inputOldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Mật Khẩu Cũ
            </label>
            <input
              type="password"
              id="inputOldPassword"
              placeholder="Nhập mật khẩu cũ"
              value={setting.oldPassword}
              onChange={(e) =>
                setSetting({ ...setting, oldPassword: e.target.value })
              }
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="inputNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Mật Khẩu Mới
            </label>
            <input
              type="password"
              id="inputNewPassword"
              placeholder="Nhập mật khẩu mới"
              value={setting.newPassword}
              onChange={(e) =>
                setSetting({ ...setting, newPassword: e.target.value })
              }
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="inputConfirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Xác Nhận Mật Khẩu Mới
            </label>
            <input
              type="password"
              id="inputConfirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              value={setting.confirmPassword}
              onChange={(e) =>
                setSetting({ ...setting, confirmPassword: e.target.value })
              }
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Đổi Mật Khẩu
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
  );
};

export default Setting;
