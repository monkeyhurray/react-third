import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "pages/Home";
import Detail from "pages/Detail";
import Profile from "pages/Profile";
import Login from "pages/Login";
import Join from "pages/Join";
import { useSelector } from "react-redux";
const Router = () => {
  const isLogin = useSelector((state) => state.changeLoginState.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:id" element={<Detail />} />
          </>
        ) : (
          <>
            <Route path="/" element={isLogin ? <Home /> : <Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
