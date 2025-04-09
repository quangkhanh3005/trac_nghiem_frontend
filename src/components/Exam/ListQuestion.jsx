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
    <div className="bg-white p-4 md:p-6 w-full rounded-lg shadow-lg min-h-screen mx-auto flex flex-col">
      <div className="flex flex-col items-center flex-grow">
        <h3 className="text-lg mt-6 sm:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
          Câu {currentQuestionIndex + 1}: {item.question}
        </h3>

        <div className="mb-6 sm:mb-12 h-52 sm:h-64 flex items-center justify-center w-full">
          {item.img ? (
            <img
              src={`http://localhost:8080${item.img}`}
              className="max-h-full max-w-full rounded-lg shadow-md object-contain"
              alt={`Hình ảnh cho câu hỏi ${currentQuestionIndex + 1}`}
              onError={(e) => {
                e.target.style.display = "none";
                console.error(
                  `Không tải được ảnh: http://localhost:8080${item.img}`
                );
              }}
            />
          ) : null}
        </div>

        <div className="grid gap-4 w-full grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {item.answers.map((answer) => (
            <div
              key={answer.id}
              className="flex  space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className={`border-2 w-full aspect-square rounded-lg flex items-center justify-center relative ${
                  listAnswer[item.id] === answer.id
                    ? "ring-4 ring-blue-500 bg-blue-500"
                    : ""
                }`}
              >
                <button
                  name={`question-${item.id}`}
                  id={`answer-${answer.id}`}
                  onClick={() => handleRadioChange(item.id, answer.id)}
                  className={`w-full h-full flex items-center justify-center text-center px-2 text-ms lg:text-lg font-medium hover:brightness-110 transition-all ${
                    listAnswer[item.id] === answer.id
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {answer.content}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons điều hướng ở dưới cùng */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
        <button
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Câu trước
        </button>

        <span className="text-gray-600 font-medium text-sm sm:text-base">
          {currentQuestionIndex + 1} / {listQuestion.length}
        </span>

        <button
          onClick={onNext}
          disabled={currentQuestionIndex === listQuestion.length - 1}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Câu tiếp
        </button>
      </div>
    </div>
  );
}
