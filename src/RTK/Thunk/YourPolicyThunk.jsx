import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let YourPolicyThunk = createAsyncThunk("policy/YourPolicyThunk", async (arg, thunkAPI) => {

  let { rejectWithValue } = thunkAPI
  try {
    let res = await axios.get(`https://backend.atlbha.com/api/page/${arg.id}`)
    return res.data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})