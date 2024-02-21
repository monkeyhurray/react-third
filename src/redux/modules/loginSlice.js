import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginId: "",
  loginPassword: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
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

export const { loginReduce } = loginSlice.actions;
export default loginSlice.reducer;
