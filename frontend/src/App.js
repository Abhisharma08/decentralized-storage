import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";

import LandingPage from "./pages/LandingPage";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/home" element={<Main />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const Footer = () => {
  return (
    <p className="text-center" style={FooterStyle}>
      Designed & coded by{" "}
      <a
        href="https://tech-geeks.tech"
        target="_blank"
        rel="noopener noreferrer"
      >
        Abhimanyu Sharma
      </a>
    </p>
  );
};

const FooterStyle = {
  background: "#222",
  fontSize: ".8rem",
  color: "#fff",
  position: "absolute",
  bottom: 0,
  padding: "1rem",
  margin: 0,
  width: "100%",
  opacity: ".5",
};
