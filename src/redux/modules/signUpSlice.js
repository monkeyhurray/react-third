import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  password: "",
  nickname: "",
};

const userSlice = createSlice({
  name: "signUp",
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
  },
});

export const { signUpReduce } = userSlice.actions;
export default userSlice.reducer;
