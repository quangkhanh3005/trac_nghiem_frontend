import React from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";

export default function ResultExam() {
  const navigate = useNavigate();
  const result = JSON.parse(sessionStorage.getItem("result"));
  sessionStorage.removeItem("result");

  if (!result) {
    return (
      <UserLayout>
        <div className="text-center mt-10 text-red-500 text-xl">
          Không có kết quả để hiển thị!
        </div>
      </UserLayout>
    );
  }

  const { score, totalQuestions } = result;
  const percentage = ((score / totalQuestions) * 100).toFixed(0);

  return (
    <UserLayout>
      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Kết quả bài thi
          </h2>

          <div className="text-lg text-gray-700 mb-2">
            <strong>Số câu đúng:</strong> {score} câu
          </div>
          <div className="text-lg text-gray-700 mb-2">
            <strong>Tổng số câu hỏi:</strong> {totalQuestions} câu
          </div>
          <div className="text-lg text-gray-700 mb-6">
            <strong>Điểm phần trăm:</strong> {percentage}%
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition duration-300"
          >
            🔙 Quay lại trang chủ
          </button>
        </div>
      </div>
    </UserLayout>
  );
}
