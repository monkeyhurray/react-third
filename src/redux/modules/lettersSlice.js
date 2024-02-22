import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newLetter: [],
  isLoading: false,
  error: null,
};

export const __addLetters = createAsyncThunk(
  "postLetters",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/letters",
        payload
      );

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
export const __editLetters = createAsyncThunk(
  "editLetters",
  async (payload, thunkAPI) => {
    const { id, content } = payload;
    console.log(payload);
    try {
      const { data } = await axios.patch(
        `http://localhost:4000/letters/${id}`,
        payload
      );

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
      console.log(action.payload);
      state.isLoading = false;
      state.error = null;
      state.newLetter = [action.payload, ...state.newLetter];
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

    //editLetters
    builder.addCase(__editLetters.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(__editLetters.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = null;

      state.newLetter = state.newLetter.map((item) =>
        item.id === action.payload.id
          ? { ...item, content: action.payload.content }
          : item
      );
    });

    builder.addCase(__editLetters.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
  },
});

export const {} = lettersSlice.actions;
export default lettersSlice.reducer;
