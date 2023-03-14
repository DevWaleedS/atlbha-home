import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StoresInfo } from "../../assets/Data/Data";

export let StoresThunk = createAsyncThunk(
    "stores/StoresThunk",
    async (arg, ThunkAPI) => {
        let { rejectWithValue } = ThunkAPI;
        try {
            // let res = await axios.get(``);
            let res = await StoresInfo;
            return res;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
