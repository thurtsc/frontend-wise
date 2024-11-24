import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="conta/*" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
