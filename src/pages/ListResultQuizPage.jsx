import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import UserLayout from "../layouts/UserLayout";

const ListResultQuizPage = () => {
  const { idQuiz } = useParams();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await axios.get(`${API_URL}/result/quiz/${idQuiz}`);
        setResults(response.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách người đã thi:", err);
      }
    };

    fetchQuizResults();
  }, [idQuiz]);


  return (
    <UserLayout>
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Danh Sách Người Đã Làm Quiz
        </h2>

        {results.length === 0 ? (
          <div className="text-center text-gray-500">
            Chưa có ai làm quiz này.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-100 text-blue-800 text-sm uppercase">
                  <th className="py-3 px-4 text-left">STT</th>
                  <th className="py-3 px-4 text-left">Tên người dùng</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Điểm</th>
                  <th className="py-3 px-4 text-left">Thời gian nộp</th>
                  <th className="py-3 px-4 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr
                    key={item.idQuizResult}
                    className="border-t hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{item.userDTO.username}</td>
                    <td className="py-2 px-4">{item.userDTO.email}</td>
                    <td className="py-2 px-4">{item.score}</td>
                    <td className="py-2 px-4">
                      {new Date(item.submittedAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() =>
                          navigate(`/quiz-result/detail/${item.idQuizResult}`)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ListResultQuizPage;
