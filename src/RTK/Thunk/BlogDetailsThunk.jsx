import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let BlogDetailsThunk = createAsyncThunk(
  "blogDetails/BlogDetailsThunk",
  async (arg, thunkAPI) => {
    let { rejectWithValue } = thunkAPI
    try {
      let res = await axios.get(`https://backend.atlbha.com/api/show_post/${arg.id}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);
