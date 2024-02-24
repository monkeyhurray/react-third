import React from "react";
import styled from "styled-components";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../redux/modules/authSlice";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedUserInfo = localStorage.getItem("userInfo");

  const onClickLogOutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(setIsLogin(false));
  };
  const { newLetter } = useSelector((state) => state.letter);
  const id = newLetter[0]?.id;

  return (
    <>
      <InfoDiv>
        <div>
          <button onClick={() => navigate("/")}>홈</button>
          {storedUserInfo ? (
            <>
              <button onClick={() => navigate(`/profile/${id}`)}>
                내프로필
              </button>
              <button onClick={() => onClickLogOutHandler()}>로그아웃</button>
            </>
          ) : (
            <p>로그인</p>
          )}
        </div>
      </InfoDiv>
      <Outlet />
    </>
  );
}

export default Layout;

const InfoDiv = styled.div`
  text-align: center;

  background-color: gray;
`;
