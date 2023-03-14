import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let HomeThunk = createAsyncThunk("home/HomeThunk", async (arg, thunkAPI) => {

  let { rejectWithValue } = thunkAPI
  try {
    let res = await axios.get(`https://backend.atlbha.com/api/index`)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})