import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const newLetter = {
  id: "",
  nickname: "",
  content: "",
  avatar: "",
  writedTo: "",
  createdAt: "",
  userId: "",
};

const initialState = {
  newLetter,
};

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/letters");
      console.log("response", response.data);

      //tollkit에서 제공하는 API
      //Promise 객체가 resolve(= 네트워크 요청이 성공한 경우) => dispatch해주는 기능을 가진 API
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      //tollkit에서 제공하는 API
      //Promise 객체가 reject(= 네트워크 요청이 실패한 경우) => dispatch해주는 기능을 가진 API
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const lettersSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getLetters.fulfilled, (state, action) => {
      state.newLetter.id = action.payload.id;
      state.newLetter.nickname = action.payload.nickname;
      state.newLetter.writedTo = action.payload.writedTo;
      state.newLetter.avatar = action.payload.avatar;
      state.newLetter.content = action.payload.content;
      state.newLetter.userId = action.payload.userId;
    });
  },
});

export default lettersSlice.createSlice;
