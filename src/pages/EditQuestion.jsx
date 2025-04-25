import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

const EditQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    { id: null, content: "", correct: false },
    { id: null, content: "", correct: false },
    { id: null, content: "", correct: false },
    { id: null, content: "", correct: false },
  ]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { id, idQuiz } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${API_URL}/question/${id}`);
        const data = res.data;

        setQuestionText(data.content || "");
        if (Array.isArray(data.answers)) {
          setAnswers(data.answers);
          setCorrectIndex(data.answers.findIndex((ans) => ans.correct));
        }

        if (data.img) {
          setImagePreview(`http://localhost:8080/upload/${data.img}`);
        }
      } catch (error) {
        console.error("Lỗi khi tải câu hỏi:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleAnswerChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index].content = value;
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index) => {
    setCorrectIndex(index);
    const updatedAnswers = answers.map((ans, i) => ({
      ...ans,
      correct: i === index,
    }));
    setAnswers(updatedAnswers);
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
      answers.some((ans) => ans.content.trim() === "")
    ) {
      alert("Vui lòng điền đầy đủ thông tin và chọn đáp án đúng.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", questionText);
      if (image) formData.append("image", image);

      answers.forEach((ans, index) => {
        if (ans.id !== null) {
          formData.append(`answers[${index}].id`, ans.id);
        }
        formData.append(`answers[${index}].content`, ans.content);
        // formData.append(`answers[${index}].correct`, ans.correct.toString());
        formData.append(
          `answers[${index}].correct`,
          correctIndex === index ? "true" : "false"
        );
      });

      await axios.put(`${API_URL}/question/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Cập nhật câu hỏi thành công!");
      navigate(`/question/id-quiz/${idQuiz}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật câu hỏi:", error);
      alert("Có lỗi xảy ra khi cập nhật.");
    }
  };

  return (
    <UserLayout>
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
            <input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block mb-2 font-semibold">
              Hình ảnh minh họa
            </label>
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
                    value={ans.content}
                    onChange={(e) => handleAnswerChange(e.target.value, index)}
                    className="w-full p-3 border rounded-lg pr-10"
                  />
                  <input
                    type="radio"
                    name="correct"
                    checked={correctIndex === index}
                    onChange={() => handleCorrectChange(index)}
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
    </UserLayout>
  );
};

export default EditQuestion;
