import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DataPackage } from "../../assets/Data/Data";

export let PackageThunk = createAsyncThunk(
    "package/PackageThunk",
    async (arg, ThunkAPI) => {
        let { rejectWithValue } = ThunkAPI;
        try {
            // let res = await axios.get(``);
            let res = await DataPackage;
            return res;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);