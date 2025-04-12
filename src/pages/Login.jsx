import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginDTO = { email: email, password: password };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginDTO, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg h-auto min-h-[450px]">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Đăng Nhập
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Nhập email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Đăng Nhập
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Chưa có tài khoản?{" "}
          <Link to={"/register"} className="text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
