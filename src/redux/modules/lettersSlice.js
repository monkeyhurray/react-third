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

export const __addLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("http://localhost:4000/letters");
      console.log("response", data);
      console.log("payload", payload);

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:4000/letters");

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);

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
      console.log(action);
      console.log(action.meta.arg);
      state.newLetter.id = action.payload.id;
      state.newLetter.nickname = action.payload.nickname;
      state.newLetter.writedTo = action.payload.writedTo;
      state.newLetter.avatar = action.payload.avatar;

      if (action.meta.arg.content) {
        state.newLetter.content = action.meta.arg.content;
      }

      state.newLetter.userId = action.payload.userId;
    });
  },
});

export const {} = lettersSlice.actions;
export default lettersSlice.reducer;
