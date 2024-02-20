import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const nickNameSlice = createSlice({
  name: "nickName",
  initialState,
  reducers: {
    createNickName: (state, action) => {
      return { name: action.payload };
    },
  },
});

export const { createNickName } = nickNameSlice.actions;
export default nickNameSlice.reducer;
