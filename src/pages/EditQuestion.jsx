import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import { useParams } from "react-router-dom";

const EditQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${API_URL}/question/${id}`);
        const q = res.data;

        setQuestionText(q.content || "");
        setAnswers(
          Array.isArray(q.answers)
            ? q.answers.map((ans) => ans.content)
            : ["", "", "", ""]
        );
        setCorrectIndex(q.answers?.findIndex((ans) => ans.correct) ?? null);
        if (q.image) {
          setImagePreview(`http://localhost:8080/upload/${q.image}`);
        }
      } catch (error) {
        console.error("Lỗi khi tải câu hỏi:", error);
      }
    };

    fetchQuestion();
  }, [id]);

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

    try {
      const formData = new FormData();
      formData.append("question", questionText);
      formData.append("correctIndex", correctIndex);
      if (image) formData.append("image", image);

      answers.forEach((ans, index) => {
        formData.append(`answers[${index}][content]`, ans);
        formData.append(`answers[${index}][correct]`, index === correctIndex);
      });

      await axios.put(`${API_URL}/question/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Cập nhật câu hỏi thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật câu hỏi:", error);
      alert("Có lỗi xảy ra khi cập nhật.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">
          Chỉnh sửa câu hỏi
        </h2>

        {/* Câu hỏi */}
        <div>
          <label className="block mb-2 font-semibold">Nội dung câu hỏi</label>
          <section
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Hình ảnh */}
        <div>
          <label className="block mb-2 font-semibold">Hình ảnh minh họa</label>
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
          <p className="text-sm text-gray-500 mt-2">
            Chọn lại đáp án đúng nếu cần.
          </p>
        </div>

        {/* Nút lưu */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold transition"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestion;
