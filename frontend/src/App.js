import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./container/Home";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path='/*' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
