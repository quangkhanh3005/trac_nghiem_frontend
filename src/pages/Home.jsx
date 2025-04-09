import React, { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
const Home = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${API_URL}/topic`);
        if (response.status === 200) {
          setTopics(response.data);
        }
      } catch (error) {
        console.error("API Error:", error);
        if (error.response) console.error("Error Data:", error.response.data);
      }
    };
    fetchTopics();
  }, []);
  return (
    <UserLayout>
<div className="p-6">
  <h2 className="text-xl mb-4 font-bold text-center w-full">
    Danh sách Topic
  </h2>
  {topics.length === 0 ? (
    <div>Không có chủ đề nào</div>
  ) : (
    <ul className="space-y-3">
      {topics.map((topic) => (
        <li key={topic.id} className="p-4 bg-gray-100 rounded shadow">
          <Link to={`/topic/${topic.id}`}>
          {topic.name}
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>

    </UserLayout>
  );
};
export default Home;
