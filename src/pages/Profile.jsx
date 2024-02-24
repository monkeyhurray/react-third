import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getLetters, __editLetters } from "../redux/modules/lettersSlice";

function Profile() {
  const dispatch = useDispatch();
  const [edited, setEdited] = useState(false);
  const [uploadImage, setUploadedImage] = useState(null);

  useEffect(() => {
    dispatch(__getLetters());
  }, [dispatch, edited]);

  const onClickEdditButton = () => {
    setEdited(true);
    dispatch(
      __editLetters({ ...userInfo, nickname: userNickName, avatar: avatarImg })
    );
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const { newLetter } = useSelector((state) => state.letter);

  const userInfo = newLetter[0];

  const [userNickName, setUserNickName] = useState(userInfo?.nickname);
  const [avatarImg, setAvatarImg] = useState(userInfo?.avatar);

  console.log(userInfo);
  console.log(userInfo?.avatar);
  console.log(userNickName);

  console.log();

  return (
    <ProfileDiv>
      <DivContent>
        <h1>프로필 관리</h1>
        {edited ? (
          <>
            <input type="file" onChange={onChangeImage} />
            <input
              value={userNickName}
              onChange={(e) => setUserNickName(e.target.value)}
            />
          </>
        ) : (
          <>
            {" "}
            <AvatarImg src={`${avatarImg}`} />
            <div>닉네임:&nbsp;{userNickName}</div>
          </>
        )}
        <div>유저 아이디:&nbsp;{userInfo?.userId}</div>
        <button onClick={onClickEdditButton}>수정</button>
      </DivContent>
    </ProfileDiv>
  );
}

export default Profile;
const ProfileDiv = styled.div`
  margin-top: 20px;
`;

const AvatarImg = styled.img`
  float: left;
  border-radius: 50%;
  max-width: 80px;
  max-height: 80px;
`;
const DivContent = styled.form`
  width: 500px;
  margin: auto;
  display: flex;

  justify-content: center;

  background-color: grey;
`;
