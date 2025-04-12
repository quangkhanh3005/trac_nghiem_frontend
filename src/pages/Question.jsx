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

  useEffect(() => {
    if (!idQuiz) return;
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${API_URL}/question/id-quiz/${idQuiz}`);
        setQuestion(res.data);
      } catch (error) {
        console.error("Lỗi question: ", error);
      }
    };
    fetchQuestion();
  }, [idQuiz]);

  const handleDeleteQuiz = async () => {
    try {
      await axios.delete(`${API_URL}/quiz/${idQuiz}`);
      alert("Xóa quiz thành công!");
      navigate("/");
    } catch (err) {
      console.error("Lỗi khi xoá quiz:", err);
    }
  };

  const handleCreateQuestion = () => {
    navigate("/create-question");
  };

  const handleEditQuiz = () => {
    navigate(`/edit-quiz/${idQuiz}`);
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz info */}
        <div className="mt-4 p-4 sm:p-6 bg-gray-100 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          {quiz && (
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:8080/upload/${quiz.image}`}
                alt="quiz"
                className="w-14 h-14 rounded-lg bg-white object-cover"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-700">{quiz.title}</h2>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
            <button
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow"
              onClick={handleEditQuiz}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
              onClick={handleDeleteQuiz}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Grid content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left - List question */}
          <div className="lg:col-span-8 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Danh sách câu hỏi</h3>
            {question.length > 0 ? (
              question.map((q) => (
                <div
                  key={q.id}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition mb-4"
                >
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{q.question}</p>
                    {q.image && (
                      <img
                        src={`http://localhost:8080/upload/${q.img}`}
                        alt="question"
                        className="w-full sm:w-32 h-20 object-cover mt-2 rounded"
                      />
                    )}
                    <h2 className="font-semibold mt-2 mb-1">Câu hỏi là: {q.content}</h2>
                    <div className="text-sm text-gray-700 space-y-1">
                      {Array.isArray(q.answers) &&
                        q.answers.map((ans, index) => (
                          <div key={index}>
                            <span className="font-medium">
                              {String.fromCharCode(65 + index)}.
                            </span>{" "}
                            {ans.content}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex mt-2 sm:mt-0 sm:ml-4 space-x-3">
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => navigate(`/edit-question/${q.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có câu hỏi nào.</p>
            )}
          </div>

          {/* Right - Info + Button */}
          <div className="md:mb-3 lg:col-span-4 bg-gray-100 p-4 sm:p-6 rounded-xl shadow-md flex flex-col justify-between">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Số lượng câu hỏi:</p>
              <p className="text-lg font-semibold text-gray-800">{question.length}</p>
            </div>
            <button
              className=" mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow transition"
              onClick={handleCreateQuestion}
            >
              Tạo câu hỏi
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Question;
