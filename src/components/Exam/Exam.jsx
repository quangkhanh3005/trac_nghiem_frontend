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
  const [time, setTime] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { idQuiz } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/question/id-quiz/${idQuiz}`
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
        submissionData
      );
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
    </div>
  );
}
