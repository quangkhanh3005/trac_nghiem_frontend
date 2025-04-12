import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";

export default function QuizzPageAdmin() {
  const [quizz, setQuizz] = useState([]);

  useEffect(() => {
    const fetchAllQuizz = async () => {
      try {
        const response = await axios.get(`${API_URL}/quiz/getAll`);
        setQuizz(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchAllQuizz();
  }, []);

  return (
    <UserLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Danh sách Quizz</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Tiêu đề</th>
                <th className="px-4 py-2 border">Chủ đề</th>
                <th className="px-4 py-2 border">Người tạo</th>
                <th className="px-4 py-2 border">Thời gian</th>
                <th className="px-4 py-2 border">Tổng câu hỏi</th>
                <th className="px-4 py-2 border">Ảnh</th>
                <th className="px-4 py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {quizz.map((quiz, index) => (
                <tr key={quiz.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{quiz.title}</td>
                  <td className="px-4 py-2 border">{quiz.topic?.name}</td>
                  <td className="px-4 py-2 border">{quiz.user?.username}</td>
                  <td className="px-4 py-2 border">{quiz.time} phút</td>
                  <td className="px-4 py-2 border">{quiz.totalQuestions}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={`http://localhost:8080/upload/${quiz.image}`}
                      alt="quiz"
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
              {quizz.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Không có quiz nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
}
