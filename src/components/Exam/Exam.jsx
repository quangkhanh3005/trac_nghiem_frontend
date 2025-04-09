import React, { useEffect, useState } from "react";
import axios from "axios";
import ListQuestion from "./ListQuestion";
import Sidebar from "./Sidebar";
import "./Style/Exam.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Exam() {
  const [listQuestion, setListQuestion] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [listAnswer, setListAnswer] = useState({});
  const [time, setTime] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const idQuiz = sessionStorage.getItem("idQuiz");
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/question/id-quiz/1`
        );
        setListQuestion(response.data);
      } catch (error) {
        console.log("Loading câu hỏi thất bại", error);
      }
    };
    fetchList();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimeUp = () => {
    if (!isTimeUp) {
      setIsTimeUp(true);
      // Không gọi handleSubmit trực tiếp ở đây nữa
    }
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));
    setListAnswer((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = async () => {
    const answersArray = listQuestion.map((question) => ({
      idQuestion: question.id,
      idAnswerSelected: listAnswer[question.id] || null,
    }));

    const submissionData = {
      idQuiz: idQuiz || 1,
      idUser: 1,
      answers: answersArray,
    };

    console.log("Dữ liệu gửi đi:", submissionData);

    try {
      const response = await axios.post(
        "http://localhost:8080/quiz/submit",
        submissionData
      );
      console.log("Nộp bài thành công:", response.data);
      toast.success("Nộp bài thành công!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
    } catch (error) {
      console.log("Nộp bài thất bại:", error);
      toast.error("Nộp bài thất bại!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    setIsTimeUp(false); // Đặt lại trạng thái sau khi nộp
  };

  const handleModalSubmit = () => {
    setIsTimeUp(false);
    handleSubmit(); // Gọi nộp bài khi bấm OK
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="bg-gray-200 p-4 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-4">
      {/* List Question */}
      <div className="md:col-span-9 h-auto md:h-screen overflow-y-auto no-scrollbar">
        <ListQuestion
          listQuestion={listQuestion}
          onAnswerSelect={handleAnswerSelect}
          listAnswer={listAnswer}
          currentQuestionIndex={currentQuestionIndex}
          onPrev={() =>
            setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
          }
          onNext={() =>
            setCurrentQuestionIndex((prev) =>
              Math.min(prev + 1, listQuestion.length - 1)
            )
          }
        />
      </div>

      {/* Sidebar */}
      <div className="md:col-span-3 md:sticky md:top-0 h-auto md:h-screen">
        <Sidebar
          listQuestion={listQuestion}
          answeredQuestions={answeredQuestions}
          onSubmit={handleSubmit}
          time={time}
          onQuestionSelect={handleQuestionSelect}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>

      {/* Modal khi hết thời gian */}
      {isTimeUp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-lg font-semibold mb-4">Hết thời gian!</h3>
            <p className="mb-4">Nhấn OK để nộp bài ngay lập tức.</p>
            <button onClick={handleModalSubmit} className="modal-button">
              OK
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
