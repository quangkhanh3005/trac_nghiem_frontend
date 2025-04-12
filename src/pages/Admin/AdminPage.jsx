import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { API_URL } from "../../config";
import axios from "axios";
import TopicModal from "./TopicModal";

export default function AdminPage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [topicName, setTopicName] = useState("");

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/topic`);
      if (response.status === 200) {
        setTopics(response.data);
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch topics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleDelete = async (idTopic) => {
    try {
      const response = await axios.delete(`${API_URL}/topic/${idTopic}`);
      if (response.status === 200) {
        setTopics(topics.filter((topic) => topic.id !== idTopic));
        alert("Xóa thành công");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      if (error.response?.status === 400) {
        alert("Không thể xóa vì đang có quiz.");
      } else {
        alert("Lỗi khi xóa");
      }
    }
  };

  const openAddModal = () => {
    setEditingTopic(null);
    setTopicName("");
    setIsModalOpen(true);
  };

  const openEditModal = (topic) => {
    setEditingTopic(topic);
    setTopicName(topic.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTopic(null);
    setTopicName("");
  };

  const handleSubmitTopic = async () => {
    if (topicName.trim() === "") {
      alert("Tên topic không được để trống.");
      return;
    }

    try {
      if (editingTopic) {
        const response = await axios.put(
          `${API_URL}/topic/${editingTopic.id}?name=${encodeURIComponent(
            topicName
          )}`
        );
        if (response.status === 200) {
          alert("Sửa thành công!");
          const updatedTopics = topics.map((t) =>
            t.id === editingTopic.id ? { ...t, name: topicName } : t
          );
          setTopics(updatedTopics);
        }
      } else {
        const response = await axios.post(
          `${API_URL}/topic?name=${encodeURIComponent(topicName)}`
        );
        if (response.status === 200) {
          alert("Thêm thành công!");
          fetchTopics();
        }
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Đã có lỗi xảy ra.");
    } finally {
      closeModal();
    }
  };

  return (
    <UserLayout>
      <div className="p-6">
        <h2 className="text-xl mb-4 font-bold text-center w-full">
          Danh sách Topic
        </h2>

        <div className="flex justify-end mb-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-xl"
            onClick={openAddModal}
          >
            + Thêm Topic
          </button>
        </div>

        {isLoading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {!isLoading && !error && topics.length === 0 ? (
          <div className="text-center">Không có chủ đề nào</div>
        ) : (
          <ul className="space-y-3">
            {topics.map((topic) => (
              <li
                key={topic.id}
                className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <div>{topic.name}</div>
                <div className="flex flex-row gap-4">
                  <button
                    className="bg-yellow-300 px-6 py-2 rounded-xl"
                    onClick={() => openEditModal(topic)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded-xl"
                    onClick={() => handleDelete(topic.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <TopicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitTopic}
        topicName={topicName}
        setTopicName={setTopicName}
        editingTopic={editingTopic}
      />
    </UserLayout>
  );
}
