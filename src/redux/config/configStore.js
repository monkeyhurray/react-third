import { configureStore } from "@reduxjs/toolkit";
import nickName from "../modules/nickNameSlice";
import content from "../modules/contentSlice";
import entireComment from "../modules/entireCommentSlice";
import changeLoginState from "../modules/authSlice";
import userSlice from "../modules/userSlice";

const store = configureStore({
  reducer: {
    nickName,
    content,
    entireComment,
    changeLoginState,
    userSlice,
  },
});

export default store;
