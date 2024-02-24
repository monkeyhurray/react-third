import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setIsLogin } from "../redux/modules/authSlice";
import {
  __editLetters,
  __getLetters,
  __deleteLetters,
} from "../redux/modules/lettersSlice";
import wendy from "assets/images/wendy.png";

function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [edited, setEdited] = useState(false);

  const { id } = useParams();
  const [contentVlaue, setContentValue] = useState();

  const { newLetter, isLoading, error } = useSelector((state) => state.letter);

  useEffect(() => {
    dispatch(__getLetters());
  }, [dispatch]);
  if (isLoading !== false) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  const selectedData = newLetter.find((item) => item.id === id);

  console.log(selectedData);

  const editButton = () => {
    setEdited(true);
  };

  const deleteBtn = (e) => {
    e.preventDefault();
    dispatch(__deleteLetters({ id }));
    navigate("/");
  };

  const updateBtn = (e) => {
    e.preventDefault();
    dispatch(__editLetters({ ...selectedData, id, content: contentVlaue }));
    setEdited(false);
  };

  const onChangeEidtHandler = (e) => {
    e.preventDefault();
    setContentValue(e.target.value);
  };
  return (
    <>
      <ToHomeBtn onClick={() => navigate("/")}>{"홈으로"}</ToHomeBtn>
      <FanLetter>
        <div key={selectedData.id}>
          <UpperDiv>
            <AvatarImg
              src={selectedData.avatar ? selectedData.avatar : wendy}
            />
            <SpanNameInfo> &nbsp;{selectedData.nickName}&nbsp;</SpanNameInfo>
            <SpanTimeInfo>Date: {selectedData.createdAt}</SpanTimeInfo>
          </UpperDiv>
          <ToDiv>
            To&nbsp;:&nbsp;
            {selectedData.writedTo || "wendy"}
          </ToDiv>

          {edited ? (
            <ContentTextArea
              value={contentVlaue}
              onChange={onChangeEidtHandler}
            >
              {selectedData.content}
            </ContentTextArea>
          ) : (
            <ContentDiv>{selectedData.content}</ContentDiv>
          )}

          <Confirmdiv>
            {edited ? (
              <Confirmbtn onClick={updateBtn}>수정 완료</Confirmbtn>
            ) : (
              <Confirmbtn onClick={editButton}>수정</Confirmbtn>
            )}

            <Confirmbtn onClick={deleteBtn}>삭제</Confirmbtn>
          </Confirmdiv>
        </div>
      </FanLetter>
    </>
  );
}

export default Detail;

const ToHomeBtn = styled.button`
  width: 100px;
  height: 60px;
  margin: 90px auto 0px 100px;
  font-size: 1.5em;
  background-color: black;
  color: white;
`;
const FanLetter = styled.div`
  background-color: grey;
  width: 900px;
  height: 500px;
  margin: 80px auto 0px auto;
`;
const AvatarImg = styled.img`
  float: left;
  max-width: 80px;
  max-height: 80px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 50%;
`;
const SpanNameInfo = styled.span`
  color: white;
  font-size: 1.5em;
`;
const SpanTimeInfo = styled.span`
  float: right;
  color: white;
  font-size: 1em;
`;
const UpperDiv = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ContentDiv = styled.div`
  margin: 20px 15px 0px 15px;
  padding: 10px;
  color: white;
  font-size: 2em;
  background-color: black;
  border-radius: 8px;
`;

const ContentTextArea = styled.textarea`
  margin: 20px 15px 0px 15px;
  padding: 10px;
  width: 850px;
  height: 200px;
  color: white;
  font-size: 2em;
  background-color: black;
  border-radius: 8px;
`;

const ToDiv = styled.div`
  margin-top: 10px;
  margin-left: 17px;
  color: white;
`;
const Confirmdiv = styled.div`
  float: right;
  width: 300px;
`;
const Confirmbtn = styled.button`
  width: 120px;
  height: 60px;
  margin-top: 20px;
  margin-right: 30px;
  float: right;
  font-size: 1.5em;
  background-color: black;
  color: white;
`;
