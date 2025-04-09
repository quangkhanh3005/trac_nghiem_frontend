import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import TopicQuizListPage from "./pages/TopicQuizListPage";
import QuizDetailPage from "./pages/QuizDetailPage";
import PrivateRoute from "./components/PrivateRoute";
import LibrariesPage from "./pages/LibrariesPage";
import ListResultQuizPage from "./pages/ListResultQuizPage";
import QuizResultDetailPage from "./pages/QuizResultDetailPage";
import HistoryPage from "./pages/HistoryPage";
import Exam from "./components/Exam/Exam";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/topic/:idTopic"
          element={
            <PrivateRoute>
              <TopicQuizListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:idQuiz"
          element={
            <PrivateRoute>
              <QuizDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/libraries"
          element={
            <PrivateRoute>
              <LibrariesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz-result/:idQuiz"
          element={
            <PrivateRoute>
              <ListResultQuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz-result/detail/:idQuizResult"
          element={
            <PrivateRoute>
              <QuizResultDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/history/:idUser"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route path="/exam/:idQuiz" element={<Exam />} />
      </Routes>
    </Router>
  );
}

export default App;
