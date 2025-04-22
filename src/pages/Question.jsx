import React, { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";

const Question = () => {
  const { idQuiz } = useParams();
  const [quiz, setQuiz] = useState({});
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();
  console.log(idQuiz);
  useEffect(() => {
    if (!idQuiz) return;
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`${API_URL}/quiz/${idQuiz}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [idQuiz]);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`${API_URL}/question/id-quiz/${idQuiz}`);
      setQuestion(res.data.questions);
    } catch (error) {
      console.error("Lỗi question: ", error);
    }
  };

  useEffect(() => {
    if (!idQuiz) return;
    fetchQuestion();
  }, [idQuiz]);

  const handleDeleteQuiz = async () => {
    try {
      await axios.delete(`${API_URL}/quiz/delete/${idQuiz}`);
      alert("Xóa quiz thành công!");
      navigate("/");
    } catch (err) {
      console.error("Lỗi khi xoá quiz:", err);
    }
  };

  const handleDeleteQuestion = async (idQuestion) => {
    try {
      await axios.delete(`${API_URL}/question/delete/${idQuestion}`);
      alert("Xóa question thành công");
      fetchQuestion();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateQuestion = () => {
    navigate(`/create-question/${idQuiz}`);
  };

  const handleEditQuiz = () => {
    navigate(`/edit-quiz/${idQuiz}`);
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz info */}
        <div className="mt-4 border p-6 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          {quiz && (
            <div className="items-center space-x-4">
              <img
                src={
                  quiz.image
                    ? `http://localhost:8080/upload/${quiz.image}`
                    : "/logo.png"
                }
                alt={quiz.title}
                className="w-16 h-16 rounded-lg bg-white object-cover shadow-md"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-black">
                  {quiz.title}
                </h2>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
            <button
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-md transition-all"
              onClick={handleEditQuiz}
            >
              Chỉnh sửa
            </button>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all"
              onClick={handleDeleteQuiz}
            >
              Xóa Quiz
            </button>
          </div>
        </div>

        {/* Grid content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left - List question */}
          <div className="lg:col-span-8 bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Danh sách câu hỏi
            </h3>
            {question.length > 0 ? (
              question.map((q) => (
                <div
                  key={q.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all mb-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium text-lg">
                        {q.content}
                      </p>
                      {q.image && (
                        <img
                          src={`http://localhost:8080/upload/${q.img}`}
                          alt="question"
                          className="mt-4 w-full sm:w-36 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="mt-3 text-gray-700 space-y-2">
                        {Array.isArray(q.answers) &&
                          q.answers.map((ans, index) => {
                            return (
                              <div
                                key={index}
                                className={`${
                                  ans.correct
                                    ? "bg-green-100 border-l-4 border-green-500"
                                    : ""
                                } p-2 rounded-md`}
                              >
                                <span className="font-medium">
                                  {String.fromCharCode(65 + index)}.{" "}
                                </span>
                                {ans.content}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="flex sm:ml-4 space-x-3">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => handleDeleteQuestion(q.id)}
                      >
                        Xóa
                      </button>
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => navigate(`/edit-question/${q.id}`)}
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có câu hỏi nào.</p>
            )}
          </div>
          {/* Right - Info + Button */}
          <div className="md:mb-3 lg:col-span-4 bg-gray-50 p-6 rounded-xl shadow-md">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Số lượng câu hỏi:</p>
              <p className="text-lg font-semibold text-gray-800">
                {question.length}
              </p>
            </div>
            <button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md transition-all"
              onClick={handleCreateQuestion}
            >
              Tạo câu hỏi mới
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Question;
