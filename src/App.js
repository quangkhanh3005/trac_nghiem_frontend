import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ExamPage from "./pages/ExamPage ";

import Test from "./pages/Test";
import TopicQuizListPage from "./pages/TopicQuizListPage";
import QuizDetailPage from "./pages/QuizDetailPage";
import PrivateRoute from "./components/PrivateRoute";
import LibrariesPage from "./pages/LibrariesPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topic/:idTopic" element={<PrivateRoute><TopicQuizListPage/></PrivateRoute>}/>
        <Route path="/test" element={<Test />} />
        <Route path="/quiz/:idQuiz" element={<PrivateRoute><QuizDetailPage/></PrivateRoute>}/>
        <Route path="/exam/:idQuiz" element={<PrivateRoute><ExamPage/></PrivateRoute>}/>
        <Route path="/libraries" element={<PrivateRoute><LibrariesPage/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
