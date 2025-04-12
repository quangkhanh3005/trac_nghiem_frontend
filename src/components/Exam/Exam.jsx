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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { idQuiz } = useParams();
  const navigate = useNavigate();

  // Lấy danh sách câu hỏi từ backend
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
  }, [idQuiz]);

  const handleTimeUp = () => {
    if (!isTimeUp && !isSubmitted) {
      setIsTimeUp(true);
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
    if (isSubmitted) return;

    setIsSubmitted(true);
    const answersArray = listQuestion.map((question) => ({
      idQuestion: question.id,
      idAnswerSelected: listAnswer[question.id] || null,
    }));

    const submissionData = {
      idQuiz: idQuiz || 1,
      idUser: 1,
      answers: answersArray,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/quiz/submit",
        submissionData,
        {
          params: { idUser: 1 },
        }
      );
      console.log("Nộp bài thành công:", response.data);
      toast.success("Nộp bài thành công!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/"), // Chuyển hướng sau khi toast đóng
      });
    } catch (error) {
      console.log("Nộp bài thất bại:", error);
      toast.error("Nộp bài thất bại!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    setIsTimeUp(false); // Đảm bảo modal tắt sau khi gửi
  };

  // Xử lý khi nhấn OK trên modal
  const handleModalSubmit = () => {
    setIsTimeUp(false); // Tắt modal ngay khi nhấn OK
    handleSubmit(); // Gửi bài ngay lập tức
  };

  return (
    <div className="bg-gray-200 p-8 grid grid-cols-12 gap-4">
      <div className="col-span-9 h-screen overflow-y-auto no-scrollbar">
        <ListQuestion
          listQuestion={listQuestion}
          onAnswerSelect={handleAnswerSelect}
          listAnswer={listAnswer}
        />
      </div>
      <div className="col-span-3 sticky top-0 h-screen">
        <Sidebar
          listQuestion={listQuestion}
          answeredQuestions={answeredQuestions}
          onSubmit={handleSubmit}
          time={time}
        />
      </div>
    </div>
  );
}