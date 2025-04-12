import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";

const EditQuiz = () => {
  const { idQuiz } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    topicName: "",
    time: "",
    idUser: "",
    image: null,
  });

  useEffect(() => {
    axios.get(`${API_URL}/quiz/${idQuiz}`).then((res) => {
      const quiz = res.data;
      // const idUser = localStorage.getItem("idUser"); // Lấy từ localStorage
      setFormFields({
        ...formFields,
        title: quiz.title,
        description: quiz.description,
        topicName: quiz.topicName,
        time: quiz.time,
        idUser:  quiz.idUser,
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

  const idUser = localStorage.getItem("idUser");
  localStorage.setItem("idUser", idUser);

  console.log("idUser từ local:", idUser);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", formFields.title);
    formData.append("description", formFields.description);
    formData.append("topicName", formFields.topicName);
    formData.append("time", parseInt(formFields.time, 10));
    // formData.append("idUser", formFields.idUser);
    formData.append("idUser", idUser);
    if (formFields.image !== null) {
      formData.append("image", formFields.image);
    }

    try {
      await axios.put(`${API_URL}/quiz/update/${idQuiz}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cập nhật thành công!");
      navigate(`/question/id-quiz/${idQuiz}`);
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Tiêu đề"
          value={formFields.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={formFields.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="topicName"
          placeholder="Chủ đề"
          value={formFields.topicName}
          onChange={handleChange}
          className="border p-2 w-full"
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
        <input
          name="time"
          type="number"
          placeholder="Thời gian"
          value={formFields.time}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditQuiz;
