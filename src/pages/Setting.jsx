import React, { useState } from "react";
import axios from "axios";
import UserLayout from "../layouts/UserLayout";
import { API_URL } from "../config";

const Setting = () => {
  const [setting, setSetting] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const idUser = parseInt(sessionStorage.getItem("idUser"));
  // const idUser=sessionStorage.getItem("idUser");

  const [error, setError] = useState(null);

  const validatePassword = (password) => {
    // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // return passwordPattern.test(password);

    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Mật khẩu mới không trùng khớp");
      return;
    }

    if (!validatePassword(setting.newPassword)) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự");
      return;
    }

    try {
      const payload = {
        ...setting,
        idUser: idUser,
      };
      console.log("Payload gửi đi:", payload);

      await axios.put(`${API_URL}/user/changePassword`, payload);
      console.log("Payload gửi đi:", payload);
      alert("Đổi mật khẩu thành công!");
      setError(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-center my-3 items-center h-full">
        <div className="p-7 bg-white rounded-lg shadow-xl w-full max-w-md ">
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
