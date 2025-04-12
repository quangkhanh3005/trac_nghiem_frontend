import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";
import UserLayout from "../layouts/UserLayout";
import NotFound from "../components/NotFound";

const TopicQuizListPage = () => {
  const { idTopic } = useParams();
  const [quizs, setQuizs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/quiz/topic/${idTopic}`);
        setQuizs(response.data);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    fetchQuizDetail();
  }, [idTopic]);

  return (
    <UserLayout>
      <div className="p-6">
        {quizs.length === 0 ? (
          <NotFound />
        ) : (
          quizs.map((quiz) => (
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
                       Chủ đề: {quiz.topic.name}
                    </div>
                    <div className="font-medium text-sm sm:text-base">
                       Thời gian: {quiz.time} phút
                    </div>
                    <div className="font-medium text-sm sm:text-base">
                       Số câu: {quiz.totalQuestions}
                    </div>
                    <div className="font-medium text-sm sm:text-base">
                       Người tạo: {quiz.user.username}
                    </div>
                  </div>
                </div>

                {/* Nút chức năng */}
                <div className="mt-4 sm:mt-0 sm:ml-auto flex justify-center items-center">
                  <button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow w-full sm:w-44 text-center"
                  >
                    Xem chi tiết
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

export default TopicQuizListPage;
