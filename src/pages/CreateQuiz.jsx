import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    topicName: "",
    time: "",
    image: "",
    idUser: idUser || 0,
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/topic")
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chủ đề:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(formFields).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value);
      }
    });

    if (formFields.image) {
      formData.append("image", formFields.image);
    }

    axios
      .post("http://localhost:8080/quiz/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("Form submitted:", result);
        const newQuizId = result.data;
        navigate(`/question/id-quiz/${newQuizId}`);
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      });
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen relative bg-gradient-to-r from-blue-600 via-pink-200 to-fuchsia-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-star-background"></div>
      <div className="absolute inset-0 opacity-30 blur-sm"></div>

      <motion.div
        className="bg-white p-8 rounded-3xl shadow-lg w-[400px] transform hover:scale-105 transition-all duration-300 relative z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Tạo Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="text-sm text-gray-500 text-center">
            Nhập tiêu đề
          </label>
          <input
            name="title"
            placeholder="Tiêu đề"
            onChange={handleChange}
            value={formFields.title}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />

          <label className="text-sm text-gray-500 text-center">
            Nhập mô tả
          </label>
          <textarea
            name="description"
            placeholder="Mô tả"
            onChange={handleChange}
            value={formFields.description}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />

          <label className="text-sm text-gray-500 text-center">
            Chọn chủ đề
          </label>
          <select
            name="topicName"
            onChange={handleChange}
            value={formFields.topicName}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            <option value="" disabled>
              -- Chọn chủ đề --
            </option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-500 text-center">
            Nhập thời gian
          </label>
          <input
            name="time"
            type="number"
            placeholder="Thời gian (phút)"
            onChange={handleChange}
            value={formFields.time}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />

          <label className="text-sm text-gray-500 text-center">Chọn ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-md text-sm bg-white transition-all"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-tl from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition duration-300"
          >
            Tạo
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateQuiz;
