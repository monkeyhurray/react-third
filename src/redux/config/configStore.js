import { configureStore } from "@reduxjs/toolkit";

import auth from "../modules/authSlice";
import signUp from "../modules/signUpSlice";
import login from "../modules/loginSlice";
import letter from "../modules/lettersSlice";
const store = configureStore({
  reducer: {
    auth,
    signUp,
    login,
    letter,
  },
});

export default store;
