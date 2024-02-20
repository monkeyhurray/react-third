import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    createContent: (state, action) => {
      return { comment: action.payload };
    },
  },
});

export const { createContent } = contentSlice.actions;
export default contentSlice.reducer;
