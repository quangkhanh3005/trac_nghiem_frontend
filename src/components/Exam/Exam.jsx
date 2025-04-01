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
  const [time, setTime] = useState(6); // Thời gian ban đầu là 6 giây
  const [isTimeUp, setIsTimeUp] = useState(false); // Trạng thái để hiển thị modal
  const idQuiz = sessionStorage.getItem("idQuiz");
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
  }, []);

  // Quản lý đếm ngược thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Dừng đếm ngược khi time về 0
          handleTimeUp(); // Gọi hàm xử lý khi hết giờ
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp timer khi unmount
  }, []); // Chỉ chạy một lần khi mount

  // Xử lý khi hết giờ
  const handleTimeUp = () => {
    if (!isTimeUp) {
      setIsTimeUp(true); // Hiển thị modal
      const autoSubmitTimer = setTimeout(() => {
        setIsTimeUp(false); // Tắt modal sau 2 giây
        handleSubmit(); // Gửi bài
      }, 2000);
      return () => clearTimeout(autoSubmitTimer); // Dọn dẹp (không cần thiết lắm vì chỉ chạy một lần)
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
    const submissionData = {
      idQuiz: idQuiz || 1,
      answers: listAnswer,
    };
    console.log("Dữ liệu gửi đi:", submissionData);

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

      {isTimeUp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-lg font-semibold mb-4">Hết thời gian!</h3>
            <p className="mb-4">Bài của bạn sẽ tự động gửi sau 2 giây.</p>
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
