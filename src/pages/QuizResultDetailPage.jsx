
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import UserLayout from "../layouts/UserLayout";

const QuizResultDetailPage = () => {
  const { idQuizResult } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/result/detail/${idQuizResult}`);
        setResult(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết:", err);
      }
    };

    fetchDetail();
  }, [idQuizResult]);

  if (!result) return <div className="p-4">Không Có Dữ Liệu</div>;
  const answerLabel =(index)=>{
    if(index===0){
        return "A";
    }
    else if(index===1){
        return "B";
    }
    else if(index===2){
        return "C";
    }
    else{
        return "D";
    }
  }
  return (
    <UserLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Chi Tiết Bài Làm 
        </h2>
        <p className="text-xl font-normal">Tên Người Làm: {result.user.username}</p>
        <p className="text-xl font-normal">Tên Bài Quiz: {result.quizTitle}</p>
        <p className="text-xl font-normal">
          Điểm: <span>{result.score}</span> /{" "}
          {result.totalQuestions}
        </p>
        <p className="text-xl font-normal">
          Ngày Nộp:&nbsp;
          {new Date(result.submitted_at).toLocaleString("vi-VN")}
        </p>

        <hr className="my-4" />

        <div className="space-y-4">
          {result.userResults.map((result, idQuestion) => (
            <div key={result.id} className="border p-3 rounded bg-gray-50">
              <p className="font-semibold">
                Câu {idQuestion + 1}: {result.question.content}
              </p>
              {result.question.img && (
                <img
                  src={result.question.img}
                  alt=""
                  className="w-48 mt-2 rounded"
                />
              )}
              <ul>
                {result.question.answers.map((a,idAnswer) => (
                  <li
                    key={a.id}
                    className={`${
                      a.id === result.selectedAnswerId
                        ? result.correct
                          ? "text-green-600"
                          : "text-red-600"
                        : ""
                    }`}
                  > <span>{answerLabel(idAnswer)}.</span>
                    <span>&nbsp;{a.content}</span>
                  </li>
                ))}
              </ul>
              <p>
                Đáp án đã chọn:&nbsp;
                <strong>
                  {result.selectedAnswerText || "Không chọn đáp án"}
                </strong>
              </p>
              <p>
                Kết quả:&nbsp;
                <span
                  className={result.correct ? "text-green-600" : "text-red-600"}
                >
                  {result.correct ? "Đúng" : "Sai"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default QuizResultDetailPage;
