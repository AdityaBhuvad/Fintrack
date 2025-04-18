import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home/:username" element={<Home />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile/:user" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
