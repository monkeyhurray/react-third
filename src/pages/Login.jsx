import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { trueLoginState } from "../redux/modules/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginReduce } from "../redux/modules/userSlice";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const id = useSelector((state) => state.userSlice.loginId);
  const password = useSelector((state) => state.userSlice.loginPassword);

  const onClickLoginButton = async () => {
    try {
      const joinRequest = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id: id,
          password: password,
        }
      );
      console.log("로그인 데이터", joinRequest);

      const { success } = joinRequest.data;
      alert(success);
      localStorage.setItem("userInfo", JSON.stringify({ id }));

      dispatch(trueLoginState());
      navigate("/");
    } catch (error) {
      alert("로그인이 되지 않았습니다.");
      console.log("로그인 오류", error);
    }
  };

  return (
    <LoginDiv>
      <input
        type="text"
        placeholder="아이디는 4~10글자"
        value={id}
        onChange={(e) => dispatch(loginReduce({ loginId: e.target.value }))}
      />

      <input
        type="text"
        placeholder="비밀번호는 4~15글자"
        value={password}
        onChange={(e) =>
          dispatch(loginReduce({ loginPassword: e.target.value }))
        }
      />
      <button onClick={() => onClickLoginButton()}>로그인 버튼</button>
      <button onClick={() => navigate("/join")}>회원가입 버튼</button>
    </LoginDiv>
  );
}

export default Login;

const LoginDiv = styled.div`
  align-items: center;
  display: flex;
  border-radius: 6px;
  background-color: gray;
  width: 700px;
  height: 200px;
  padding: 20px;
  margin: 50px auto 50px auto;
`;
