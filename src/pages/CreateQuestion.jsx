import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../config";

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const idUser=localStorage.getItem("idUser");
  localStorage.setItem("idUser",idUser)

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
  
    if (!questionText || correctIndex === null || answers.some((ans) => ans.trim() === "")) {
      alert("Vui lòng điền đầy đủ thông tin và chọn đáp án đúng.");
      return;
    }
  
    const formData = new FormData();
    formData.append("question", questionText);
    formData.append("idQuiz", idUser);
    if (image) formData.append("image", image);
  
    answers.forEach((ans, index) => {
      formData.append(`answers[${index}].content`, ans);
      formData.append(`answers[${index}].isCorrect`, correctIndex === index);
    });
  
    try {
      await axios.post(`${API_URL}/question/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Tạo câu hỏi thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo câu hỏi:", error);
      alert("Tạo câu hỏi thất bại!");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Tạo câu hỏi mới</h2>

        {/* Câu hỏi */}
        <div>
          <label className="block mb-2 font-semibold">Nội dung câu hỏi</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Nhập câu hỏi..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Ảnh */}
        <div>
          <label className="block mb-2 font-semibold">Hình ảnh minh họa (nếu có)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full max-h-64 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Đáp án */}
        <div>
          <label className="block mb-2 font-semibold">Đáp án</label>
          <div className="grid grid-cols-2 gap-4">
            {answers.map((ans, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={ans}
                  onChange={(e) => handleAnswerChange(e.target.value, index)}
                  placeholder={`Đáp án ${index + 1}`}
                  className="w-full p-3 border rounded-lg pr-10"
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
          <p className="text-sm text-gray-500 mt-2">Chọn 1 đáp án đúng bằng cách tick vào ô tròn bên phải.</p>
        </div>

        {/* Nút submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition"
          >
            Tạo câu hỏi
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
