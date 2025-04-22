import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserLayout from "../layouts/UserLayout";
import axios from "axios";
import { API_URL } from "../config";

const Profile = () => {
  const idUser = sessionStorage.getItem("idUser");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const usertrung = sessionStorage.getItem("username");
  const emailtrung = sessionStorage.getItem("email");

  useEffect(() => {
    setUserName(usertrung);
    setEmail(emailtrung);
  }, []);

  const handleUpdate = async () => {
    console.log(email);
    console.log(username);
    try {
      await axios.put(`http://localhost:8080/user/information/${idUser}`, {
        email: email,
        username: username,
      });
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("email", email);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      alert("Cập nhật thất bại.");
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-center items-center min-h-screen bg-black overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 opacity-40 blur-2xl"></div>

        {/* Profile Card */}
        <motion.div
          className="relative z-10 p-8 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-700 w-96 text-white text-center space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 10 }}
          ></motion.div>

          <h2 className="text-2xl font-bold">Cập nhật thông tin</h2>

          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Tên người dùng"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            // value={formData.email}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
          />

          <motion.button
            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            onClick={handleUpdate}
          >
            Lưu thay đổi
          </motion.button>
        </motion.div>
      </div>
    </UserLayout>
  );
};

export default Profile;
