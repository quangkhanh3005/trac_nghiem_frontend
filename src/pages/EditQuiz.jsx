import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";
import UserLayout from "../layouts/UserLayout.jsx";

const EditQuiz = () => {
  const { idQuiz } = useParams();

  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    topicName: "",
    time: "",
    idUser: parseInt(sessionStorage.getItem("idUser")),
    image: null,
  });

  useEffect(() => {
    axios.get(`${API_URL}/quiz/${idQuiz}`).then((res) => {
      const quiz = res.data;
      setFormFields({
        title: quiz.title,
        description: quiz.description,
        topicName: quiz.topic.name,
        time: quiz.time,
        idUser: quiz.user.id,
        image: null,
      });
    });
  }, [idQuiz]);

  useEffect(() => {
    axios
      .get(`${API_URL}/topic`)
      .then((res) => {
        setTopics(res.data);
      })
      .catch((err) => console.error("Lỗi khi load topics:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormFields((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formFields.title);
    formData.append("description", formFields.description);
    formData.append("topicName", formFields.topicName);
    formData.append("time", parseInt(formFields.time, 10));
    formData.append("idUser", formFields.idUser);
    if (formFields.image) {
      formData.append("image", formFields.image);
    }

    try {
      await axios.put(`${API_URL}/quiz/update/${idQuiz}`, formData);
      alert("Cập nhật thành công!");
      navigate(`/question/id-quiz/${idQuiz}`);
    } catch (err) {
      console.error("Lỗi cập nhật:", err.response?.data || err.message);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Chỉnh sửa Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={formFields.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập tiêu đề quiz..."
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              name="description"
              value={formFields.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mô tả chi tiết..."
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Chủ đề</label>
            <select
              name="topicName"
              value={formFields.topicName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">-- Chọn chủ đề --</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.name}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Thời gian (phút)</label>
            <input
              type="number"
              name="time"
              value={formFields.time}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Thời gian làm quiz..."
              required
              min={1}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Ảnh đại diện (tuỳ chọn)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow"
            >
              Cập nhật Quiz
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default EditQuiz;
