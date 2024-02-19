import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import 레드벨벳 from "assets/images/레드벨벳.jpg";
import wendy from "assets/images/wendy.png";
import styled from "styled-components";
import uuid from "react-uuid";
import { plusComment } from "../redux/modules/entireComment";
import { createNickName } from "../redux/modules/nickName";
import { createContent } from "../redux/modules/content";

const redVelvet = [
  { id: 1, value: "Wendy", name: "웬디" },
  { id: 2, value: "Seulgi", name: "슬기" },
  { id: 3, value: "Joy", name: "조이" },
  { id: 4, value: "Yeri", name: "예리" },
  { id: 5, value: "Irene", name: "아이린" },
];

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedMember, setSelectedMember] = useState("Wendy");
  const [getLetterMember, setGetLetterMeber] = useState("Wendy");

  const entireComment = useSelector((state) => state.entireComment.data);
  const nickName = useSelector((state) => state.nickName.name);
  const content = useSelector((state) => state.content.comment);

  //날짜추가
  let today = new Date();
  const getDateString = (today) => {
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = `${year}${month}${day}`;
    return dateString;
  };

  //모달을 위한 버튼
  const handleButtonClick = (memberValue) => {
    setSelectedMember(memberValue);
  };

  //새로 추가할 이름과 내용
  const writeNickName = (nickName) =>
    dispatch(createNickName(nickName.target.value));

  const writeContent = (content) =>
    dispatch(createContent(content.target.value));

  const handleContent = (e) => {
    e.preventDefault();
    dispatch(
      plusComment({ nickName, content, id: uuid(), value: getLetterMember })
    );

    dispatch(createNickName(""));
    dispatch(createContent(""));
  };

  const handleSelectedMeber = (member) => {
    setGetLetterMeber(member.target.value);
  };

  //페이지 이동 및 정보 전달
  const handleCommentClick = (id) => navigate(`/detail/${id}`);

  const filterdComments = entireComment.filter(
    (comment) =>
      comment.writedTo === selectedMember || comment.value === selectedMember
  );

  return (
    <>
      <BackGroundImg alt="img">
        <Title>레드벨벳</Title>
        <ButtonBox>
          {redVelvet.map((member) => {
            return (
              <RedVelvetBtn
                active={selectedMember === member.value}
                onClick={() => {
                  handleButtonClick(member.value);
                }}
                key={member.name}
              >
                {member.name}
              </RedVelvetBtn>
            );
          })}
        </ButtonBox>
      </BackGroundImg>

      <Main>
        <FormBody onSubmit={handleContent}>
          <NickNameDiv>
            닉네임:{" "}
            <NickNameInput
              type="text"
              value={nickName}
              onChange={writeNickName}
              maxLength="20"
              placeholder="최대 20글자까지 작성할 수 있습니다."
            />
          </NickNameDiv>
          <ContentDiv>
            내용:{" "}
            <ContentArea
              value={content}
              onChange={writeContent}
              maxLength="100"
              placeholder="최대 100자 까지만 작성할 수 있습니다."
            />
          </ContentDiv>
          누구에게 보내실건가요?{" "}
          <select onChange={handleSelectedMeber} value={getLetterMember}>
            {redVelvet.map((member) => {
              return (
                <SelectMember value={member.value} key={member.id}>
                  {member.name}
                </SelectMember>
              );
            })}
          </select>
          <FormUploadInput type="submit" value={"팬레터 등록"} />
        </FormBody>

        {filterdComments.map((item) => {
          return (
            <CommentDiv
              key={item.id}
              onClick={() => handleCommentClick(item.id)}
            >
              <AvatarImg src={item.avatar ? item.avatar : wendy} />
              <CommentP>{item.nickName}</CommentP>
              <CommentP>{item.content}</CommentP>
              <CommentP>{getDateString(today)}</CommentP>
              <CommentP>{item.writedTo ? item.writedTo : item.value}</CommentP>
            </CommentDiv>
          );
        })}
      </Main>
    </>
  );
}

export default Home;

const BackGroundImg = styled.div`
  background-image: url(${레드벨벳});
  text-align: center;
  width: 100%;
  height: 478px;
`;

const Title = styled.div`
  color: yellow;
  font-size: 3rem;
  font-weight: bold;
  margin: 200px auto 90px;
  display: inline-block;
`;

const ButtonBox = styled.div`
  border-radius: 6px;
  padding: 10px;
  background-color: rgb(79, 85, 81);
  margin: auto;
  width: 700px;
  height: 70px;
`;

const Main = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const FormBody = styled.form`
  background-color: gray;
  width: 700px;
  height: 200px;
  padding: 20px;
  margin: 50px auto 50px auto;
`;

const NickNameDiv = styled.div``;
const NickNameInput = styled.input`
  margin-bottom: 10px;
  width: 500px;
`;
const ContentDiv = styled.div`
  align-items: center;
`;

const SelectMember = styled.option``;

const ContentArea = styled.textarea`
  margin-bottom: 10px;
  width: 500px;
  height: 140px;
`;

const FormUploadInput = styled.input`
  margin-left: 10px;
  text-align: right;
`;

const AvatarImg = styled.img`
  float: left;
  border-radius: 50%;
  max-width: 80px;
  max-height: 80px;
`;
const CommentP = styled.p`
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const RedVelvetBtn = styled.button`
  width: 90px;
  height: 35px;
  margin: 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  color: ${(props) => (props.active ? "black" : "white")};
  background-color: ${(props) => (props.active ? "yellow" : "black")};
`;
const CommentDiv = styled.div`
  background-color: black;
  width: 700px;
  height: 130px;
  margin: 5px auto;
  padding: 30px;
  border-radius: 7px;
  border-style: solid;
  border-width: 3px;
  border-color: red;
  display: "block";
`;
