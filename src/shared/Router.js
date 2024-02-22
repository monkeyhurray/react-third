import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Detail from "pages/Detail";
import Profile from "pages/Profile";
import Login from "pages/Login";
import Join from "pages/Join";
import Layout from "pages/Layout";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../redux/modules/authSlice";
const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log(data);
    if (data?.accessToken) {
      dispatch(setIsLogin(true));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="detail/:id" element={<Detail />} />
            </Route>
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
