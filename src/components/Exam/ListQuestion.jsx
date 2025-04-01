import React from "react";

export default function ListQuestion({
  listQuestion,
  onAnswerSelect,
  listAnswer,
}) {
  // Kiểm tra dữ liệu đầu vào
  if (!Array.isArray(listQuestion) || listQuestion.length === 0) {
    return (
      <div className="bg-white p-4 w-full rounded-lg min-h-screen mx-auto text-center text-red-500">
        Không có câu hỏi nào để hiển thị.
      </div>
    );
  }

  const handleRadioChange = (questionId, answerId) => {
    // Kiểm tra xem questionId và answerId có hợp lệ không
    if (!questionId || !answerId) {
      console.error("questionId hoặc answerId không hợp lệ:", {
        questionId,
        answerId,
      });
      return;
    }
    onAnswerSelect(questionId, answerId); // Gửi cả questionId và answerId lên Exam
  };

  return (
    <div className="bg-white p-4 w-full rounded-lg min-h-screen mx-auto">
      {listQuestion.map((item, index) => {
        // Kiểm tra xem item có các thuộc tính cần thiết không
        if (!item.id || !item.question || !Array.isArray(item.answers)) {
          console.warn(`Câu hỏi tại index ${index} không hợp lệ:`, item);
          return (
            <div key={index} className="mb-6 border-b pb-4 text-red-500">
              Câu hỏi không hợp lệ
            </div>
          );
        }

        return (
          <div key={item.id} className="mb-6 border-b pb-4">
            <div className="grid grid-cols-2 h-auto">
              <div className="flex-col mb-6">
                <h3 className="text-lg font-bold mb-2">
                  {index + 1}. {item.question}
                </h3>
                <ul className="space-y-2">
                  {item.answers.map((answer) => {
                    // Kiểm tra thuộc tính của answer
                    if (!answer.id || !answer.content) {
                      console.warn(
                        `Đáp án không hợp lệ trong câu hỏi ${item.id}:`,
                        answer
                      );
                      return (
                        <li
                          key={answer.id || `invalid-${index}`}
                          className="text-red-500"
                        >
                          Đáp án không hợp lệ
                        </li>
                      );
                    }

                    return (
                      <li
                        key={answer.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`question-${item.id}`}
                          id={`answer-${answer.id}`}
                          className="cursor-pointer"
                          checked={listAnswer[item.id] === answer.id} // Đánh dấu đáp án đã chọn
                          onChange={() => handleRadioChange(item.id, answer.id)}
                        />
                        <label
                          htmlFor={`answer-${answer.id}`}
                          className="cursor-pointer"
                        >
                          {answer.content}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {item.img && item.img !== "" && (
                <img
                  src={`http://localhost:8080${item.img}`}
                  className="h-auto w-1/2 justify-self-end object-contain"
                  alt={`Hình ảnh cho câu hỏi ${index + 1}`}
                  onError={(e) => {
                    e.target.style.display = "none"; // Ẩn ảnh nếu lỗi
                    console.error(
                      `Không tải được ảnh: http://localhost:8080${item.img}`
                    );
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
