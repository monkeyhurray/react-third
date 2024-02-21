import { configureStore } from "@reduxjs/toolkit";
import entireComment from "../modules/entireCommentSlice";
import auth from "../modules/authSlice";
import signUp from "../modules/signUpSlice";
import login from "../modules/loginSlice";
import letter from "../modules/lettersSlice";
const store = configureStore({
  reducer: {
    entireComment,
    auth,
    signUp,
    login,
    letter,
  },
});

export default store;
