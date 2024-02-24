import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getLetters, __editLetters } from "../redux/modules/lettersSlice";

function Profile() {
  const dispatch = useDispatch();
  const [edited, setEdited] = useState(false);
  const [uploadImage, setUploadedImage] = useState(null);

  const [userNickName, setUserNickName] = useState();

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  useEffect(() => {
    dispatch(__getLetters());
  }, [dispatch, edited]);

  const { newLetter, isLoading, error } = useSelector((state) => state.letter);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  const userInfo = newLetter[0];
  console.log(userInfo);

  const onClickEdditButton = () => {
    setEdited(true);
  };

  const onClickEdditCompleteButton = () => {
    setEdited(false);
    dispatch(
      __editLetters({
        ...userInfo,
        nickname: userNickName,
        avatar: uploadImage,
      })
    );
  };
  return (
    <ProfileDiv>
      <DivContent>
        <h1>프로필 관리 &nbsp; </h1>
        {edited ? (
          <>
            <input type="file" onChange={onChangeImage} />
            <input
              value={userNickName}
              onChange={(e) => setUserNickName(e.target.value)}
            />
            <div>유저 아이디:&nbsp;{userInfo.userId}</div>
            <button onClick={onClickEdditCompleteButton}>수정 확인</button>
          </>
        ) : (
          <>
            {" "}
            <AvatarImg src={`${userInfo.avatar}`} />
            <div>닉네임:&nbsp;{newLetter[0].nickname}</div>
            <div>유저 아이디:&nbsp;{userInfo?.userId}</div>
            <EdditButton onClick={onClickEdditButton}>수정</EdditButton>
          </>
        )}
      </DivContent>
    </ProfileDiv>
  );
}

export default Profile;
const ProfileDiv = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const DivContent = styled.form`
  width: 350px;
  height: 200px;
  margin: auto;

  justify-content: center;
  background-color: grey;
`;

const AvatarImg = styled.img`
  float: left;
  margin-right: 30px;
  border-radius: 50%;
  max-width: 80px;
  max-height: 80px;
`;
const EdditButton = styled.button`
  width: 45px;
  height: 25px;
  border-radius: 5px;
`;
