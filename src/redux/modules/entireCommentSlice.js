import jsonData from "assets/jsons/data.json";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: jsonData,
};

const entireCommentSlice = createSlice({
  name: "entireComment",
  initialState,
  reducers: {
    plusComment: (state, action) => {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    },
    removeComment: (state, action) => {
      return {
        ...state,
        data: state.data.filter((comment) => comment.id !== action.payload.id),
      };
    },
    editComment: (state, action) => {
      return {
        ...state,
        data: [...action.payload],
      };
    },
  },
});

export const { plusComment, removeComment, editComment } =
  entireCommentSlice.actions;
export default entireCommentSlice.reducer;
