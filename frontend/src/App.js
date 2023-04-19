import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./container/Home";

const App = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
};

export default App;
