import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const History = () => {
  const [quizResults, setQuizResults] = useState([]);
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const res = await axios.get(`${API_URL}/result/user/${idUser}`);
        setQuizResults(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy lịch sử bài làm:", err);
      }
    };

    fetchQuizResults();
  }, [idUser]);

  const handleViewDetail = (resultId) => {
    navigate(`/quiz-result/detail/${resultId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Lịch Sử Làm Bài
      </h1>

      {quizResults.length === 0 ? (
        <p className="text-gray-600 text-center">Bạn chưa làm bài nào.</p>
      ) : (
        <div className="space-y-6">
          {quizResults.map((result, index) => (
            <div
              key={result.id}
              className="bg-white border border-gray-200 p-5 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {index + 1}. {result.quiz.title}
              </h2>

              <div className="text-sm text-gray-700 mb-1">
                <strong>Thời gian nộp:</strong>{" "}
                {new Date(result.submittedAt).toLocaleString("vi-VN")}
              </div>

              <div className="text-sm text-gray-700 mb-1">
                <strong>Điểm:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  {result.score} / {result.quiz.totalQuestions}
                </span>
              </div>

              <button
                onClick={() => handleViewDetail(result.id)}
                className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
