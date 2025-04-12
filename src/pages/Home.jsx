import React, { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import axios from "axios";
import { API_URL } from "../config";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${API_URL}/topic`);
        if (response.status === 200) {
          setTopics(response.data);
        }
      } catch (error) {
        console.error("API Error:", error);
        if (error.response) console.error("Error Data:", error.response.data);
      }
    };
    fetchTopics();
  }, []);

  return (
    <UserLayout>
      <motion.div
  className="flex flex-col items-center justify-center min-h-screen relative bg-gradient-to-r from-blue-600 via-pink-200 to-fuchsia-400 px-4 py-12"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <div className="absolute inset-0 bg-star-background"></div>

  <div className="z-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
    {topics.map((topic) => (
      <motion.div
        key={topic.id}
        className=" bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-bold text-gray-800">{topic.name}</h3>
      </motion.div>
    ))}
  </div>

  <motion.button
    className="mt-4 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-xl z-10 relative overflow-hidden"
    whileHover={{
      scale: 1.1,
      x: [0, -50, 50, -50, 40, 0],
      rotate: [0, 50, -50, 50, -50, 0],
      backgroundPosition: "left center",
      backgroundSize: "200%",
    }}
    transition={{ duration: 0.5 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-blue-400 hover:to-pink-400 opacity-40"></div>
    <Link
      to="/create-quiz"
      className="font-bold text-4xl hover:text-white transition-colors duration-300 relative z-10"
    >
      Tạo Câu Hỏi
    </Link>
  </motion.button>
</motion.div>

    </UserLayout>
  );
};

export default Home;
