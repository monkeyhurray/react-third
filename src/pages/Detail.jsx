import { React, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import wendy from "assets/images/wendy.png";
import { removeComment, editComment } from "../redux/modules/entireComment";

function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [edited, setEdited] = useState(false);
  const entireComment = useSelector((state) => {
    return state.entireComment.data;
  });

  const { id } = useParams();

  const selectedData = entireComment.find((item) => item.id === id);
  const [updateComment, setUpdateComment] = useState(selectedData.content);

  const removeHandler = (id) => {
    dispatch(removeComment({ id }));
    navigate("/");
  };

  const editButton = () => {
    setEdited(true);
  };

  const updateBtn = () => {
    const nextCommentList = entireComment.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: updateComment };
      }

      return comment;
    });

    dispatch(editComment(nextCommentList));
    console.log(dispatch(editComment(nextCommentList)));
    setEdited(false);
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
              value={updateComment}
              onChange={(e) => setUpdateComment(e.target.value)}
            ></ContentTextArea>
          ) : (
            <ContentDiv>{updateComment}</ContentDiv>
          )}

          <Confirmdiv>
            {edited ? (
              <Confirmbtn onClick={updateBtn}>수정 완료</Confirmbtn>
            ) : (
              <Confirmbtn onClick={editButton}>수정</Confirmbtn>
            )}

            <Confirmbtn onClick={() => removeHandler(selectedData.id)}>
              삭제
            </Confirmbtn>
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
