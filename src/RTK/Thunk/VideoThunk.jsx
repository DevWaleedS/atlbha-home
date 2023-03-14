import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Video from "../../assets/Videos/video.mp4";
export let VideoThunk = createAsyncThunk(
    "video-reducer/VideoThunk",
    async (arg, ThunkAPI) => {
        let { rejectWithValue } = ThunkAPI;
        try {
            // let res = await axios.get(``);
            let res = await Video;
            return res;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
