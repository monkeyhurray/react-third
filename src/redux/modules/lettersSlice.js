import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

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
  newLetter: [],
  isLoading: false,
  error: null,
};

export const __addLetters = createAsyncThunk(
  "postLetters",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post("http://localhost:4000/letters", {
        ...payload,
      });

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
    //addLetters
    builder.addCase(__addLetters.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(__addLetters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.newLetter = action.payload;
    });

    builder.addCase(__addLetters.rejected, (state, action) => {
      state.isLoading = true;

      state.error = action.payload;
    });
    //getLetters

    builder.addCase(__getLetters.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(__getLetters.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.error = null;
      state.newLetter = action.payload;
    });

    builder.addCase(__getLetters.rejected, (state, action) => {
      state.isLoading = true;

      state.error = action.payload;
    });
  },
});

export const {} = lettersSlice.actions;
export default lettersSlice.reducer;
