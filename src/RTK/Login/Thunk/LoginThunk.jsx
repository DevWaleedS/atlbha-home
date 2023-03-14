import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let LoginThunk = createAsyncThunk(
    "stores/StoresThunk",
    async (arg, ThunkAPI) => {
        let { rejectWithValue } = ThunkAPI;
        try {
            let res = await axios.post('https://backend.atlbha.com/api/loginapi', {
                user_name: arg?.userName,
                password: arg?.pass,
            })
            return res.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
