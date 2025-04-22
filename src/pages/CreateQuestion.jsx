import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";

const CreateQuestion = () => {
  const { idQuiz } = useParams();

  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleAnswerChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !questionText ||
      correctIndex === null ||
      answers.some((ans) => ans.trim() === "")
    ) {
      alert("Vui lòng điền đầy đủ thông tin và chọn đáp án đúng.");
      return;
    }

    const formData = new FormData();
    formData.append("question", questionText);
    formData.append("idQuiz", idQuiz);

    if (image) formData.append("image", image);

    answers.forEach((ans, index) => {
      formData.append(`answers[${index}].content`, ans);
      formData.append(
        `answers[${index}].correct`,
        correctIndex === index ? "true" : "false"
      );
    });

    try {
      await axios.post(`${API_URL}/question/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Tạo câu hỏi thành công!");
      navigate(`/question/id-quiz/${idQuiz}`);
    } catch (error) {
      console.error("Lỗi khi tạo câu hỏi:", error);
      alert("Tạo câu hỏi thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600">
          Tạo Câu Hỏi Mới
        </h2>

        {/* Câu hỏi */}
        <div>
          <label className="block mb-2 text-lg font-medium">Nội dung câu hỏi</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Nhập câu hỏi..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Ảnh */}
        <div>
          <label className="block mb-2 text-lg font-medium">
            Hình ảnh minh họa (nếu có)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded-lg w-full bg-gray-50"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full max-h-64 object-cover rounded-lg border-2 border-gray-300"
            />
          )}
        </div>

        {/* Đáp án */}
        <div>
          <label className="block mb-2 text-lg font-medium">Đáp án</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {answers.map((ans, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={ans}
                  onChange={(e) => handleAnswerChange(e.target.value, index)}
                  placeholder={`Đáp án ${index + 1}`}
                  className="w-full p-4 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <input
                  type="radio"
                  name="correct"
                  checked={correctIndex === index}
                  onChange={() => setCorrectIndex(index)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                  title="Đáp án đúng"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Chọn 1 đáp án đúng bằng cách tick vào ô tròn bên phải.
          </p>
        </div>

        {/* Nút submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition duration-200"
          >
            Tạo câu hỏi
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
