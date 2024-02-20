import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    trueLoginState: (state, action) => {
      state.isLogin = true;
    },
    falseLoginState: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const { trueLoginState, falseLoginState } = authSlice.actions;
export default authSlice.reducer;
