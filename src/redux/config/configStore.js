import { configureStore } from "@reduxjs/toolkit";
import content from "../modules/contentSlice";
import entireComment from "../modules/entireCommentSlice";
import auth from "../modules/authSlice";
import signUp from "../modules/signUpSlice";
import login from "../modules/loginSlice";
import letter from "../modules/lettersSlice";
const store = configureStore({
  reducer: {
    content,
    entireComment,
    auth,
    signUp,
    login,
    letter,
  },
});

export default store;
