import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TopicQuizListPage from "./pages/TopicQuizListPage";
import QuizDetailPage from "./pages/QuizDetailPage";
import LibrariesPage from "./pages/LibrariesPage";
import ListResultQuizPage from "./pages/ListResultQuizPage";
import QuizResultDetailPage from "./pages/QuizResultDetailPage";
import HistoryPage from "./pages/HistoryPage";
import Exam from "./components/Exam/Exam";
import ResultExam from "./pages/ResultExam";

// Admin Pages
import AdminPage from "./pages/Admin/AdminPage";
import QuizzPageAdmin from "./pages/Admin/QuizzPageAdmin";

// Components
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAdmin from "./components/PrivateRouterAdmin";

// Other pages
import CreateQuiz from "./pages/CreateQuiz";
import CreateQuestion from "./pages/CreateQuestion";
import Question from "./pages/Question";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import EditQuestion from "./pages/EditQuestion";
import EditQuiz from "./pages/EditQuiz";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/exam/:idQuiz" element={<Exam />} />
        <Route path="/ResultExam" element={<ResultExam />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
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
        <Route
          path="/create-quiz"
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-question/:idQuiz"
          element={
            <PrivateRoute>
              <CreateQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/question/id-quiz/:idQuiz"
          element={
            <PrivateRoute>
              <Question />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-question/:id"
          element={
            <PrivateRoute>
              <EditQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-quiz/:idQuiz"
          element={
            <PrivateRoute>
              <EditQuiz />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRouteAdmin>
              <AdminPage />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/quizz"
          element={
            <PrivateRouteAdmin>
              <QuizzPageAdmin />
            </PrivateRouteAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
