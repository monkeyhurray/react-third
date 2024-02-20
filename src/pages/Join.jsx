import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { signUpReduce } from "../redux/modules/userSlice";

function Join() {
  const navigate = useNavigate();
  const { id, password, nickname } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const onSubmitJoinHandler = async () => {
    try {
      const joinRequest = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: id,
          password: password,
          nickname: nickname,
        }
      );
      console.log("로그인 데이터", joinRequest);

      const { message, success } = joinRequest.data;
      alert(message, success);

      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
      console.log("가입 오류", error);
    }
  };

  return (
    <LoginForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitJoinHandler();
      }}
    >
      <input
        type="text"
        placeholder="아이디는 4~10글자"
        value={id || ""}
        onChange={(e) => {
          dispatch(signUpReduce({ id: e.target.value }));
        }}
      />

      <input
        type="text"
        placeholder="비밀번호는 4~15글자"
        value={password || ""}
        onChange={(e) => {
          dispatch(signUpReduce({ password: e.target.value }));
        }}
      />
      <input
        type="text"
        placeholder="이름 작성 란"
        value={nickname || ""}
        onChange={(e) => {
          dispatch(signUpReduce({ nickname: e.target.value }));
        }}
      />
      <button type="submit">회원가입 버튼</button>
      <button onClick={() => navigate("/login")}>로그인 버튼</button>
    </LoginForm>
  );
}

export default Join;
const LoginForm = styled.form`
  align-items: center;
  display: flex;
  border-radius: 6px;
  background-color: gray;
  width: 700px;
  height: 200px;
  padding: 20px;
  margin: 50px auto 50px auto;
`;
