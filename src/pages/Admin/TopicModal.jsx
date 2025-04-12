import React from "react";

export default function TopicModal({
  isOpen,
  onClose,
  onSubmit,
  topicName,
  setTopicName,
  editingTopic,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">
          {editingTopic ? "Sửa Topic" : "Thêm Topic"}
        </h2>
        <input
          type="text"
          placeholder="Nhập tên topic..."
          className="w-full border px-3 py-2 rounded mb-4"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Huỷ
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingTopic ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}
