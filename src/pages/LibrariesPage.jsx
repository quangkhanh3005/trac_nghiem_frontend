import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import UserLayout from "../layouts/UserLayout";

const LibrariesPage = () => {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");

  useEffect(() => {
    const fetchMyQuizzes = async () => {
      try {
        const response = await axios.get(`${API_URL}/quiz/user`, {
          params: { idUser: idUser },
        });
        setQuizList(response.data);
      } catch (err) {
        console.error("Error loading quizzes:", err);
      }
    };

    fetchMyQuizzes();
  }, [idUser]);

  return (
    <UserLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Danh Sách Quiz Bạn Đã Tạo</h2>
        {quizList.length === 0 ? (
          <div>Bạn chưa có quiz nào.</div>
        ) : (
          quizList.map((quiz) => (
            <div
              key={quiz.id}
              className="shadow-md bg-white rounded-md overflow-hidden p-4 sm:p-6 mb-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                {/* Ảnh */}
                <img
                  className="w-full sm:w-40 h-40 object-cover rounded-xl mb-4 sm:mb-0"
                  src={
                    quiz.image ? `${API_URL}/upload/${quiz.image}` : "/logo.png"
                  }
                  alt={quiz.title}
                />

                {/* Nội dung */}
                <div className="flex flex-col space-y-2 justify-center flex-grow">
                  <h2 className="text-lg sm:text-xl font-bold">{quiz.title}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    <div className="font-medium text-sm sm:text-base">
                      Chủ Đề: {quiz.topic.name}
                    </div>
                    <div className="font-medium text-sm sm:text-base">
                      Thời Gian: {quiz.time} phút
                    </div>
                    <div className="font-medium text-sm sm:text-base">
                      Số Câu: {quiz.totalQuestions}
                    </div>
                    <div className="font-medium text-sm sm:text-base">
                      Người Tạo: {quiz.user.username}
                    </div>
                  </div>
                </div>

                {/* Nút chức năng */}
                <div className="mt-4 sm:mt-0 flex flex-col space-y-2 sm:ml-auto sm:items-end w-full sm:w-44">
                  <button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
                  >
                    Xem Chi Tiết
                  </button>
                  <button
                    onClick={() => navigate(`/quiz/edit/${quiz.id}`)}
                    className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full"
                  >
                    Chỉnh Sửa
                  </button>
                  <button
                    onClick={() => navigate(`/quiz-result/${quiz.id}`)}
                    className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition w-full"
                  >
                    Người Đã Thi
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </UserLayout>
  );
};

export default LibrariesPage;
