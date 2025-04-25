import React, { useEffect, useState } from "react";
import axios from "axios";
import ListQuestion from "./ListQuestion";
import Sidebar from "./Sidebar";
import "./Style/Exam.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Exam() {
  const [listQuestion, setListQuestion] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [listAnswer, setListAnswer] = useState({});
  const [time, setTime] = useState();
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { idQuiz } = useParams();
  const navigate = useNavigate();
  const idUser = sessionStorage.getItem("idUser");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `https://test-be-j2vt.onrender.com/question/id-quiz/${idQuiz}`
        );
        setListQuestion(response.data.questions);
        setTime(response.data.time * 60);
      } catch (error) {
        console.log("Loading câu hỏi thất bại", error);
      }
    };
    fetchList();
  }, [idQuiz]);

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
  useEffect(() => {
    if (isTimeUp) {
      const timeout = setTimeout(() => {
        handleSubmit();
      }, 2000); // 2 giây

      return () => clearTimeout(timeout);
    }
  }, [isTimeUp]);

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
      idUser: idUser,
      answers: answersArray,
    };

    try {
      const response = await axios.post(
        "https://test-be-j2vt.onrender.com/quiz/submit",
        submissionData
      );
      console.log("dữ liệu gửi đi", submissionData);
      console.log("Điểm", response.data);
      sessionStorage.setItem("result", JSON.stringify(response.data));
      toast.success("Nộp bài thành công!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/ResultExam"),
      });
    } catch (error) {
      console.log("Nộp bài thất bại:", error);
      toast.error("Nộp bài thất bại!", {
        position: "top-center",
        autoClose: 2000,
      });
      setIsSubmitted(false);
    }
    setIsTimeUp(false);
  };

  const handleModalSubmit = () => {
    setIsTimeUp(false);
    handleSubmit();
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="bg-gray-100 p-2 md:p-4 flex flex-col md:flex-row gap-4 min-h-screen">
      <div className="w-full md:w-3/4 flex flex-col flex-grow overflow-hidden">
        <div className="flex-grow">
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
      </div>
      <div className="w-full md:w-1/4 md:h-screen md:sticky top-0">
        <Sidebar
          listQuestion={listQuestion}
          answeredQuestions={answeredQuestions}
          onSubmit={handleSubmit}
          time={time}
          onQuestionSelect={handleQuestionSelect}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>

      {isTimeUp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-lg font-semibold mb-4">Hết thời gian!</h3>
            <p className="mb-4">Bài của bạn sẽ tự động gửi sau 2 giây.</p>
            <button
              onClick={() => {
                handleModalSubmit();
              }}
              className="modal-button w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
