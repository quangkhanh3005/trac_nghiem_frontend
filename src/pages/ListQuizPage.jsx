import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import UserLayout from "../layouts/UserLayout";

const ListQuizPage = () => {
  const { idTopic } = useParams();
  const [quizs, setQuizs] = useState([]);

  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/quiz/topic/${idTopic}`);
        setQuizs(response.data); // Cập nhật danh sách quiz
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    fetchQuizDetail();
  }, [idTopic]); // Chỉ re-fetch khi `idTopic` thay đổi

  return (
    <UserLayout>
      <div className="p-6">
        {quizs.length === 0 ? (
          <p className="text-gray-500">Không có dữ liệu</p>
        ) : (
          quizs.map((quiz) => (
            <div
              key={quiz.id}
              className="shadow-md bg-white rounded-md overflow-hidden p-6 mb-4"
            >
              <div className="flex space-x-4 items-center">
                <img
                  className="w-56 h-auto object-cover rounded-xl"
                  src={`${API_URL}/upload/${quiz.image}`}
                  alt={quiz.title}
                />
                <div className="flex flex-col space-y-2 justify-center w-3/4">
                  <h2 className="text-xl font-bold">{quiz.title}</h2>
                  <ul className="flex space-x-3">
                    <li className="font-semibold px-3 py-1 w-72">
                      Chủ Đề: {quiz.topic.name}
                    </li>
                    <li className="font-semibold px-3 py-1 w-72">
                      Thời Gian: {quiz.time} phút
                    </li>
                  </ul>
                  <ul className="flex space-x-3">
                    <li className="font-semibold px-3 py-1 w-72">
                      Số Câu: {quiz.totalQuestions}
                    </li>
                    <li className="font-semibold px-3 py-1 w-72">
                      Người Tạo: {quiz.user.username}
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center">
                  <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow w-44">
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

export default ListQuizPage;