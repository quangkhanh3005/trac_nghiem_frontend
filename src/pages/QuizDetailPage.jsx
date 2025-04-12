import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import UserLayout from "../layouts/UserLayout";
import NotFound from "../components/NotFound";

const QuizDetailPage = () => {
  const { idQuiz } = useParams();
  const [quiz, setQuiz] = useState(null);
  const navigate =useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${API_URL}/quiz/${idQuiz}`);
        setQuiz(response.data);
      } catch (error) {
        console.error(
          "Lỗi khi lấy dữ liệu quiz:",
          error.response?.data || error.message
        );
      }
    };

    fetchQuiz();
  }, [idQuiz]);

  if (!quiz) {
    return (
      <UserLayout>
        <NotFound></NotFound>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex flex-col items-center">
              <img
                className="w-48 h-48 object-cover rounded-xl shadow-md"
                src={
                  quiz.image ? `${API_URL}/upload/${quiz.image}` : "/logo.png"
                }
                alt={quiz.title}
              />
              <h2 className="text-2xl font-bold text-purple-800 mt-4">
                {quiz.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm sm:text-base">
              <span className="bg-purple-100 text-purple-800 font-medium px-4 py-2 rounded-full shadow-sm">
                Thời gian: {quiz.time} phút
              </span>
              <span className="bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-full shadow-sm">
                Mã quiz: {quiz.code}
              </span>
              <span className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded-full shadow-sm">
                Chủ đề: {quiz.topic.name}
              </span>
              <span className="bg-yellow-100 text-yellow-800 font-medium px-4 py-2 rounded-full shadow-sm">
                Số câu hỏi: {quiz.totalQuestions}
              </span>
            </div>

            <div className="pt-6">
              <button onClick={()=>navigate(`/exam/${idQuiz}`)} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
                Bắt Đầu Quiz
              </button>
            </div>
          </div>

          {quiz.description && (
            <div className="bg-white rounded-2xl shadow p-6 text-gray-700 text-base">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📖 Mô tả
              </h3>
              <p>{quiz.description}</p>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default QuizDetailPage;
