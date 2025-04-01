import React from "react";

export default function Sidebar({
  listQuestion,
  answeredQuestions,
  onSubmit,
  time,
}) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="w-full bg-white p-6 rounded shadow self-start">
      <p className="text-gray-600">Thời gian còn lại:</p>
      <h3 className="text-2xl font-bold">{formatTime(time)}</h3>

      <button
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={onSubmit}
      >
        NỘP BÀI
      </button>

      <h4 className="font-semibold mt-6">Danh sách câu hỏi</h4>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {listQuestion.map((item, index) => (
          <button
            key={index}
            className={`w-10 h-10 border rounded text-center text-gray-700 ${
              answeredQuestions[item.id] ? "bg-green-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
