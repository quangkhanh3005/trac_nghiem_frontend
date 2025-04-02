import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ExamPage from "./pages/ExamPage ";
import ListQuizPage from "./pages/ListQuizPage";
import Test from "./pages/Test";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<ExamPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topic/:idTopic" element={<ListQuizPage/>}/>
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
