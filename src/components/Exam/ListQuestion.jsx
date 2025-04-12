import React from "react";

export default function ListQuestion({
  listQuestion,
  onAnswerSelect,
  listAnswer,
  currentQuestionIndex,
  onPrev,
  onNext,
}) {
  if (
    !Array.isArray(listQuestion) ||
    listQuestion.length === 0 ||
    !listQuestion[currentQuestionIndex]
  ) {
    return (
      <div className="bg-white p-6 w-full rounded-lg shadow-lg min-h-screen mx-auto text-center text-red-500 font-semibold">
        Không có câu hỏi nào để hiển thị.
      </div>
    );
  }

  const item = listQuestion[currentQuestionIndex];

  const handleRadioChange = (questionId, answerId) => {
    if (!questionId || !answerId) {
      console.error("questionId hoặc answerId không hợp lệ:", {
        questionId,
        answerId,
      });
      return;
    }
    onAnswerSelect(questionId, answerId);
  };

  return (
    <div className="bg-white p-4 sm:p-6 w-full rounded-lg shadow-lg min-h-screen mx-auto flex flex-col">
      <div className="flex flex-col flex-grow">
        <h3
          className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center"
          style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)" }}
        >
          Câu {currentQuestionIndex + 1}: {item.content}
        </h3>

        {item.img && item.img !== "" && (
          <div className="mb-4 sm:mb-6 flex justify-center">
            <img
              src={`http://localhost:8080/upload/${item.img}`}
              className="max-h-48 sm:max-h-64 w-auto rounded-lg shadow-md object-contain"
              alt={`Hình ảnh cho câu hỏi ${currentQuestionIndex + 1}`}
              onError={(e) => {
                e.target.style.display = "none";
                console.error(
                  `Không tải được ảnh: http://localhost:8080${item.image}`
                );
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full mt-auto">
          {item.answers.map((answer) => (
            <div
              key={answer.id}
              className="flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className={`border-2 w-full rounded-lg flex items-center justify-center relative ${
                  listAnswer[item.id] === answer.id
                    ? "ring-4 ring-blue-500 bg-blue-500"
                    : ""
                }`}
                style={{ aspectRatio: "1 / 1.2" }} // Tăng chiều cao so với aspect-square
              >
                <button
                  name={`question-${item.id}`}
                  id={`answer-${answer.id}`}
                  onClick={() => handleRadioChange(item.id, answer.id)}
                  className={`w-full h-full flex items-center justify-center font-medium text-center px-2 hover:brightness-110 transition-all ${
                    listAnswer[item.id] === answer.id
                      ? "text-white"
                      : "text-black"
                  }`}
                  style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)" }}
                >
                  {answer.content}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 sm:mt-6">
        <button
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
          className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
        >
          Câu trước
        </button>
        <span
          className="text-gray-600 font-medium"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
        >
          {currentQuestionIndex + 1} / {listQuestion.length}
        </span>
        <button
          onClick={onNext}
          disabled={currentQuestionIndex === listQuestion.length - 1}
          className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
        >
          Câu tiếp
        </button>
      </div>
    </div>
  );
}
