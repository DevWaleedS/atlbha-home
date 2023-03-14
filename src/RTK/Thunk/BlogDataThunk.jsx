import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let BlogDataThunk = createAsyncThunk("blog/BlogDataThunk", async (arg, thunkAPI) => {

  let { rejectWithValue } = thunkAPI
  try {
    let res = await axios.get(`https://backend.atlbha.com/api/posts`)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})