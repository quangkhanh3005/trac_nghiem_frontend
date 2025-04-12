import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ListQuizPage from "./pages/ListQuizPage";
import CreateQuiz from "./pages/CreateQuiz";
import Question from "./pages/Question";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import CreateQuestion from "./pages/CreateQuestion";
import EditQuiz from "./pages/EditQuiz";
import EditQuestion from "./pages/EditQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topic/:idTopic" element={<ListQuizPage/>}/>
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/question/id-quiz/:idQuiz" element={<Question />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-question/:idQuestion" element={<EditQuestion />} />
        <Route path="/edit-quiz/:idQuiz" element={<EditQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
