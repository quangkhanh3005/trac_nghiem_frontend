import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserLayout from "../layouts/UserLayout";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserLayout>
      <div className="flex justify-center items-center min-h-screen bg-black overflow-hidden relative">
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 opacity-40 blur-2xl"></div>

        {/* Profile Card */}
        <motion.div
          className="relative z-10 p-8 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-700 w-80 text-white text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 10 }}
          ></motion.div>

          <h2 className="mt-4 text-2xl font-bold">{user.name || "chiphongjr"}</h2>
          <p className="text-gray-400">{user.role || "fullstack devops hehe"}</p>

          <motion.button
            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            Edit
          </motion.button>
        </motion.div>
      </div>
    </UserLayout>
  );
};

export default Profile;
