import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "pages/Home";
import Detail from "pages/Detail";
import jsonData from "assets/jsons/data.json";

const Router = () => {
  const [entireComment, setEntireComment] = useState(jsonData);
  const [nickName, setNickName] = useState("");
  const [content, setContent] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
