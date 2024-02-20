import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  password: "",
  nickname: "",
  loginId: "",
  loginPassword: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpReduce: (state, action) => {
      if (action.payload.id) {
        state.id = action.payload.id;
      }
      if (action.payload.password) {
        state.password = action.payload.password;
      }
      if (action.payload.nickname) {
        state.nickname = action.payload.nickname;
      }
    },

    loginReduce: (state, action) => {
      if (action.payload.loginId) {
        state.loginId = action.payload.loginId;
      }
      if (action.payload.loginPassword) {
        state.loginPassword = action.payload.loginPassword;
      }
    },
  },
});

export const { signUpReduce, loginReduce } = userSlice.actions;
export default userSlice.reducer;
