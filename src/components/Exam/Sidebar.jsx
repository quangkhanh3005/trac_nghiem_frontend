import React, { useState } from "react";

export default function Sidebar({
  listQuestion,
  answeredQuestions,
  onSubmit,
  time,
  onQuestionSelect,
  currentQuestionIndex,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTime = (seconds) => {
    const hour = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hour}:${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const handleSubmitClick = () => {
    setIsModalOpen(true); // Hiển thị modal khi bấm nộp bài
  };

  const handleConfirmSubmit = () => {
    setIsModalOpen(false); // Đóng modal
    onSubmit(); // Gọi hàm nộp bài từ props
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Đóng modal khi hủy
  };

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded shadow self-start">
      {/* Thời gian */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm md:text-base">Thời gian còn lại:</p>
        <h3 className="text-xl md:text-2xl font-bold">{formatTime(time)}</h3>
      </div>

      {/* Nút nộp bài */}
      <button
        className="w-full mt-2 md:mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={handleSubmitClick}
      >
        NỘP BÀI
      </button>

      {/* Modal xác nhận */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg text-center font-semibold mb-4">
              Bạn có chắc chắn muốn nộp bài?
            </h3>
            <div className="flex justify-between gap-4">
              <button
                className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Hủy
              </button>
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleConfirmSubmit}
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chú thích */}
      <div className="mt-6">
        <h4 className="font-semibold text-base md:text-lg mb-2">Chú thích</h4>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center">
            <div className="h-8 w-8 mr-3 bg-blue-500 rounded border"></div>
            <span className="text-sm md:text-base">: Câu đã chọn</span>
          </li>
          <li className="flex items-center">
            <div className="h-8 w-8 mr-3 bg-yellow-500 rounded border"></div>
            <span className="text-sm md:text-base">: Câu đang chọn</span>
          </li>
          <li className="flex items-center">
            <div className="h-8 w-8 mr-3 bg-white border border-gray-500 rounded"></div>
            <span className="text-sm md:text-base">: Câu chưa chọn</span>
          </li>
        </ul>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="mt-6">
        <h4 className="font-semibold text-base md:text-lg mb-2">
          Danh sách câu hỏi
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {listQuestion.map((item, index) => (
            <button
              key={index}
              className={`w-10 h-10 border rounded text-sm font-medium text-center ${
                answeredQuestions[item.id]
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } ${index === currentQuestionIndex ? "bg-yellow-500" : ""}`}
              onClick={() => onQuestionSelect(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
