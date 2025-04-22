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
          {topics.map((topic, _index) => (
            <Link key={topic.id} to={`/topic/${topic.id}`}>
              <motion.div
                className={`relative group cursor-pointer transition-all duration-300 
                  p-6 rounded-2xl bg-gradient-to-tr 
                  from-white/30 to-white/10 shadow-xl border 
                  border-white/20 backdrop-blur-md`}
                whileHover={{ scale: 1.07, rotate: 1 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition duration-300 pointer-events-none"></div>

                <div className="flex justify-center mb-3">
                  <i className="fa fa-code text-3xl text-blue-600 drop-shadow-md group-hover:text-purple-700 transition"></i>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white drop-shadow-sm group-hover:text-blue-800 text-center">
                  {topic.name}
                </h3>

                <div className="mt-4 h-1 w-2/3 mx-auto bg-gradient-to-r from-blue-400 via-pink-400 to-purple-600 rounded-full group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </UserLayout>
  );
};

export default Home;
